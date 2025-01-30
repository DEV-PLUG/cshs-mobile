import { useEffect, useRef, useState } from "react";
import useSWR, { SWRConfig } from 'swr';
import { View, Text, Alert, Platform } from "react-native";

import 'react-native-gesture-handler';

import * as Font from "expo-font";

import { StatusBar } from "expo-status-bar";
import { loginFetcher } from "../libs/fetcher";

// import analytics from "@react-native-firebase/analytics";
import * as SplashScreen from 'expo-splash-screen';
import getAccessToken from "../libs/getAccessToken";
import { BASE_URL } from "../libs/swr";
import * as Notifications from 'expo-notifications';
import structure from "../styles/structure";
import Start from "./start";
import * as Device from 'expo-device';
import Constants from 'expo-constants';

import { useSelector, useDispatch, Provider } from "react-redux";
import { RootState } from "@/libs/reduces/reduces";
import { store } from "@/libs/reduces/store";
import Loading from "@/components/loading";
// import DeviceInfo from 'react-native-device-info';
// import * as ScreenOrientation from 'expo-screen-orientation';

const reduxStore = store;

// import { analytics } from "./libs/firebaseConfig";
// import { setUserId, setUserProperties } from "firebase/analytics";

import { setCustomText } from "react-native-global-props";
import InAppNotification from "@/components/notification";
import WebView from "react-native-webview";
import { notification } from "@/libs/reduces/app";
import { deleteItem, getValueFor } from "@/libs/SecureStore";

const customTextProps = {
  style: {
    fontFamily: "Pretendard-Medium",
  },
};
setCustomText(customTextProps);

SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

function AppComponent() {
  async function setNotificationToken() {
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        dispatch(notification({type: "warning", text: "알림 권한을 허용하면 학교 소식을 가장 빠르게 접할 수 있습니다"}));
      }
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
      if (!projectId) {
        dispatch(notification({type: "error", text: "프로젝트 ID를 찾을 수 없습니다(오류)"}));
      }
      try {
        const pushTokenString = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;
  
        const accessToken = await getValueFor('accessToken');
        await fetch(BASE_URL + '/api/user/notification', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Cookie": `MobileAuthorization=${accessToken}`
          },
          body: JSON.stringify({
            token: pushTokenString
          })
        }).then((response) => response.json())
        .then((response) => {
          if(response.success === true) {
          } else {
            dispatch(notification({type: "error", text: "알림 설정에 실패했습니다"}));
          }
        });
      } catch (e: unknown) {
        dispatch(notification({type: "error", text: `${e}`}));
      }
    } else {
      dispatch(notification({type: "error", text: "실물 기기에서 테스트해주세요"}));
    }
  }

  SplashScreen.preventAutoHideAsync();

  const [isReady, setIsReady] = useState(false);
  const [isLogined, setIsLogined] = useState<null | boolean>(null);
  const [webReady, setWebReady] = useState(true);

  const getIsLogined = useSelector((state:RootState) => state.app.isLogined);
  useEffect(() => {
    async function checkLogined() {
      if(isLogined !== null) {
        if(getIsLogined === true) {
          const accessToken = await getAccessToken();
          if(accessToken === undefined) return;

          setToken(accessToken);
        }
        setIsLogined(getIsLogined);
      }
    }
    checkLogined();
  }, [getIsLogined]);
  useEffect(() => {
    if(isLogined !== null && isReady === true && isLogined === false) setTimeout(() => {
      SplashScreen.hideAsync();
    }, 100);
    if(isLogined !== null && isReady === true && isLogined === true && webReady === true) setTimeout(() => {
      SplashScreen.hideAsync();

      setNotificationToken();
    }, 1000);
  }, [isLogined, isReady, webReady]);

  const isLoading = useSelector((state:RootState) => state.app.isLoading);
  const [token, setToken] = useState<string | null>(null);
  const dispatch = useDispatch();

  const { data, error } = useSWR("/api/user", loginFetcher);
  useEffect(() => {
    // console.log(data, error)
    const roadUserInfo = async () => {
      // 로그인 디버깅용 코드
      // deleteItem("accessToken");
      // dispatch(setLoading(true));

      if(data.success !== true) {
        setIsLogined(false);
      } else {
        const accessToken = await getAccessToken();
        if(accessToken === undefined) return;

        setToken(accessToken);
        setIsLogined(true);
      }
    }
    const roadErrorPage = async () => {
      await SplashScreen.hideAsync();
      // 에러 페이지 띄우기
      Alert.alert('데이터 로드 실패');
    }
    if(data !== undefined) roadUserInfo();
    if(error !== undefined) roadErrorPage();
  }, [data, error]);

  const [fontsLoaded] = Font.useFonts({
    "Pretendard-Light": require("../assets/fonts/Pretendard-Light.otf"),
    "Pretendard-Bold": require("../assets/fonts/Pretendard-Bold.otf"),
    "Pretendard-Medium": require("../assets/fonts/Pretendard-Medium.otf")
  });

  useEffect(() => {
    if(fontsLoaded) {
      setIsReady(true);

      // if(DeviceInfo.isTablet()) {
      //   ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
      // }
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  }, []);

  let webviewRef = useRef<WebView | null>(null);
  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      { isReady === true && <View style={structure.container}>
        { isLogined !== null && <View style={structure.container}>
          { isLogined === false ? <Start/> : <WebView     
          ref={webviewRef}
          onContentProcessDidTerminate={() => {
            webviewRef.current?.reload();
          }} 
          onLoad={() => setWebReady(true)} javaScriptEnabled
          injectedJavaScriptBeforeContentLoaded={`
            XMLHttpRequest.prototype.open = (function(open) {
              return function(method,url,async) {
                open.apply(this,arguments);
                this.setRequestHeader('MobileAuthorization', "${token}");
              };
            })(XMLHttpRequest.prototype.open);
            var originalFetch = window.fetch;
            window.fetch = function (input, init) {
                if (!init) {
                    init = {};
                }
                if (!init.headers) {
                    init.headers = new Headers();
                }
                if (init.headers instanceof Headers) {
                    init.headers.append('MobileAuthorization', '${token}');
                } else if (init.headers instanceof Array) {
                    init.headers.push(['MobileAuthorization', '${token}']);
                } else {
                    init.headers['MobileAuthorization'] = '${token}';
                }
                return originalFetch(input, init);
            };
            const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);
          `}
          injectedJavaScriptBeforeContentLoadedForMainFrameOnly={false}
          injectedJavaScriptForMainFrameOnly={false} source={{ uri: BASE_URL + '/d/home', headers: { 'MobileAuthorization': token } }} /> }
        </View> }
      </View> }
      <InAppNotification/>
      <StatusBar style='dark' />
      { isLoading === true && <Loading/> }
    </View>
  )
}

export default function App() {
  return (
    <Provider store={reduxStore}>
      <SWRConfig value={{fetcher: (url:string) => fetch(BASE_URL + url).then((response) => response.json())}}>
        <AppComponent/>
      </SWRConfig>
    </Provider>
  )
}