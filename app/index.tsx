import { useEffect, useState } from "react";
import useSWR, { SWRConfig } from 'swr';
import { View, Text, Alert } from "react-native";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';

import * as Font from "expo-font";

import { StatusBar } from "expo-status-bar";
import * as Linking from 'expo-linking';
import { loginFetcher } from "../libs/fetcher";

// import analytics from "@react-native-firebase/analytics";
import * as SplashScreen from 'expo-splash-screen';
import { deleteItem } from "../libs/SecureStore";
import getAccessToken from "../libs/getAccessToken";
import { BASE_URL } from "../libs/swr";
import { colors } from "../styles/colors";
import structure from "../styles/structure";
import Start from "./start";

import { useSelector, useDispatch, Provider } from "react-redux";
import { RootState } from "@/libs/reduces/reduces";
import { store } from "@/libs/reduces/store";
import { login, logout, setLoading } from "@/libs/reduces/app";
import Loading from "@/components/loading";

const reduxStore = store;

// import { analytics } from "./libs/firebaseConfig";
// import { setUserId, setUserProperties } from "firebase/analytics";

import { setCustomText } from "react-native-global-props";

const customTextProps = {
  style: {
    fontFamily: "Pretendard-Medium",
  },
};
setCustomText(customTextProps);

SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator<any>();

function AppComponent() {
  const [isReady, setIsReady] = useState(false);
  const [isLogined, setIsLogined] = useState<null | boolean>(null);

  const getIsLogined = useSelector((state:RootState) => state.app.isLogined);
  useEffect(() => {
    if(isLogined !== null) setIsLogined(getIsLogined);
  }, [getIsLogined]);
  useEffect(() => {
    if(isLogined !== null && isReady === true) setTimeout(() => {
      SplashScreen.hideAsync();
    }, 100);
  }, [isLogined, isReady]);
  const isLoading = useSelector((state:RootState) => state.app.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if(isLogined !== null && isReady === true) setTimeout(() => {
      SplashScreen.hideAsync();
    }, 100);
  }, [isLogined, isReady]);

  const { data, error } = useSWR("/user_information", loginFetcher);
  useEffect(() => {
    console.log(data, error)
    const roadUserInfo = async () => {
      // 로그인 디버깅용 코드
      // deleteItem("accessToken");
      // dispatch(setLoading(true));

      if(data.success !== true || data.data.length === 0) {
        await deleteItem("accessToken");

        setIsLogined(false);
      } else {
        const accessToken = await getAccessToken();
        if(accessToken === undefined) return;

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
    if(fontsLoaded) setIsReady(true);
  }, [fontsLoaded]);

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      { isReady === true && <View style={structure.container}>
        { isLogined !== null && <View style={structure.container}>
          { isLogined === false ? <Start/> : <View><Text>test</Text></View> }
        </View> }
      </View> }
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