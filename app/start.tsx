import { View, SafeAreaView, KeyboardAvoidingView, Text, Image, Keyboard, StyleSheet, ScrollView, Pressable, Animated, Dimensions, Platform, Easing, TextInput } from "react-native";
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';

import structure from "../styles/structure";
import Header from "@/components/header";
import { navigationOptions } from "@/libs/navigation";
import { Button, LightButton, TextButton } from "@/components/btn";
import { useEffect, useRef, useState } from "react";
import detectKeyboard from "@/libs/detectKeyboard";
import { BASE_URL } from "@/libs/swr";
import { useDispatch } from "react-redux";
import { login, notification, setLoading } from "@/libs/reduces/app";
import { saveItem, getValueFor } from "@/libs/SecureStore";
import ButtonGradient from "@/components/btnGradient";
import { colors } from "@/styles/colors";
import * as WebBrowser from 'expo-web-browser';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

const deviceWidth = Dimensions.get('window').width;

const Stack = createStackNavigator<StartStackParamList>();

type StartStackParamList = {
  Start1: undefined;
  Signup: undefined;
  Notification: undefined;
  Verify: undefined;
  Success: undefined;
};

export default function Start() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Start1">
          <Stack.Screen name="Start1" component={Start1} options={navigationOptions} />
          <Stack.Screen name="Signup" component={Signup} options={navigationOptions} />
          <Stack.Screen name="Notification" component={Notification} options={navigationOptions} />
          <Stack.Screen name="Verify" component={Verify} options={navigationOptions} />
          <Stack.Screen name="Success" component={Success} options={navigationOptions} />
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  )
}

export function Start1({ navigation }:StackScreenProps<StartStackParamList, "Start1">) {
  return (
    <SafeAreaView style={structure.safeViewContainer}>
      <View style={structure.container}>
        <View style={structure.headerBox}>
          <Header arrow={false} navigation={navigation} />
        </View>
        <View style={{ width: deviceWidth > 1000 ? 500 : '100%', flex: 1, marginHorizontal: 'auto' }}>
          <View style={structure.contentContainer}>
            <View style={structure.imageContentBox}>
              <View style={structure.titleBox}>
                <Text style={structure.title}>Ground와 함께하는{'\n'}편리한 학교생활!</Text>
              </View>
              <View style={structure.descriptionBox}>
                <Text style={structure.description}>Ground의 모든 기능을{'\n'}모바일 앱으로 이용해보세요.</Text>
              </View>
              <View style={structure.imageBox}>
                <Image style={structure.image} source={require("../assets/images/logo_trans.png")}/>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{ width: deviceWidth > 1000 ? 500 : '100%', marginHorizontal: 'auto' }}>
        <View style={structure.btnBox}>
          <ButtonGradient/>
          <Button btnText='시작하기' fn={() => navigation.navigate("Signup")} />
        </View>
      </View>
    </SafeAreaView>
  )
}

export function Signup({ navigation }:StackScreenProps<StartStackParamList, "Signup">) {
  return (
    <SafeAreaView style={structure.safeViewContainer}>
      <View style={structure.container}>
        <View style={structure.headerBox}>
          <Header navigation={navigation} />
        </View>
        <View style={{ width: deviceWidth > 1000 ? 500 : '100%', flex: 1, marginHorizontal: 'auto' }}>
          <View style={structure.contentContainer}>
            <View style={structure.imageContentBox}>
              <View style={structure.titleBox}>
                <Text style={structure.title}>학교 구글 계정으로{'\n'}로그인하세요</Text>
              </View>
              <View style={structure.descriptionBox}>
                <Text style={structure.description}>아래 단계를 따라 로그인을 완료하세요.{'\n'}개인 계정을 선택하지 않도록 유의하세요.</Text>
                <View style={{ marginTop: 40 }}>
                  <View style={{ alignItems: 'baseline', flexDirection: 'row' }}>
                    <View style={{ borderRadius: '100%', backgroundColor: colors.baseColor, width: 35, height: 35, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontWeight: 'bold', color: 'white' }}>1</Text>
                    </View>
                    <Text style={{ fontWeight: 'bold', color: colors.darkGray, fontSize: 17, marginLeft: 10, width: deviceWidth - 140 }}>아래 '다음' 버튼을 클릭하면 새로운 인터넷 창이 열립니다</Text>
                  </View>
                  <View style={{ width: 1, height: 25, backgroundColor: colors.Gray, marginLeft: 16.5, marginVertical: 10 }}></View>
                  <View style={{ alignItems: 'baseline', flexDirection: 'row' }}>
                    <View style={{ borderRadius: '100%', backgroundColor: colors.baseColor, width: 35, height: 35, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontWeight: 'bold', color: 'white' }}>2</Text>
                    </View>
                    <Text style={{ fontWeight: 'bold', color: colors.darkGray, fontSize: 17, marginLeft: 10, width: deviceWidth - 140 }}>해당 창에서 개인 계정이 아닌 학교 구글 계정으로 로그인하세요</Text>
                  </View>
                  <View style={{ width: 1, height: 25, backgroundColor: colors.Gray, marginLeft: 16.5, marginVertical: 10 }}></View>
                  <View style={{ alignItems: 'baseline', flexDirection: 'row' }}>
                    <View style={{ borderRadius: '100%', backgroundColor: colors.baseColor, width: 35, height: 35, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontWeight: 'bold', color: 'white' }}>3</Text>
                    </View>
                    <Text style={{ fontWeight: 'bold', color: colors.darkGray, fontSize: 17, marginLeft: 10, width: deviceWidth - 140 }}>해당 창에 표시되는 6자리 숫자를 기억하세요</Text>
                  </View>
                  <View style={{ width: 1, height: 25, backgroundColor: colors.Gray, marginLeft: 16.5, marginVertical: 10 }}></View>
                  <View style={{ alignItems: 'baseline', flexDirection: 'row' }}>
                    <View style={{ borderRadius: '100%', backgroundColor: colors.baseColor, width: 35, height: 35, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontWeight: 'bold', color: 'white' }}>4</Text>
                    </View>
                    <Text style={{ fontWeight: 'bold', color: colors.darkGray, fontSize: 17, marginLeft: 10, width: deviceWidth - 140 }}>코드를 화면에 입력하세요</Text>
                  </View>
                </View>
              </View>
              <View style={structure.imageBox}>
                {/* <Image style={structure.image} source={require("../assets/images/icon.png")}/> */}
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{ width: deviceWidth > 1000 ? 500 : '100%', marginHorizontal: 'auto' }}>
        <View style={structure.btnBox}>
          <ButtonGradient/>
          <Button btnText='다음' fn={() => {
            navigation.navigate("Verify");
          }} />
        </View>
      </View>
    </SafeAreaView>
  )
}

export function Verify({ navigation }:StackScreenProps<StartStackParamList, "Verify">) {
  const inputRef = useRef<TextInput | null>(null);

  useEffect(() => {
    WebBrowser.openBrowserAsync(BASE_URL + "/mobile/login");

    // 실물 기기 디버깅용
    // dispatch(notification({type: "success", text: "로그인이 완료되었습니다"}));
    // navigation.navigate("Notification");
  }, [inputRef]);

  const dispatch = useDispatch();

  async function requestToken() {
    await fetch(BASE_URL + "/api/user/mobile/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        code
      })
    })
    .then((response) => response.json())
    .then(async (response) => {
      if(response.success === true) {
        await saveItem("accessToken", response.token + '');
        dispatch(notification({type: "success", text: "로그인이 완료되었습니다"}));
        navigation.navigate("Notification");
      } else {
        dispatch(notification({type: "error", text: "코드가 일치하지 않거나 만료되었어요"}));
        setCode('');
      }
    });
  }

  const [code, setCode] = useState('');
  useEffect(() => {
    if(code.length >= 6) {
      inputRef.current?.blur();
      requestToken();
    }
  }, [code]);

  return (
    <SafeAreaView style={structure.safeViewContainer}>
      <View style={structure.container}>
        <View style={structure.headerBox}>
          <Header navigation={navigation} />
        </View>
        <View style={{ width: deviceWidth > 1000 ? 500 : '100%', flex: 1, marginHorizontal: 'auto' }}>
          <View style={structure.contentContainer}>
            <View style={structure.imageContentBox}>
              <View style={structure.titleBox}>
                <Text style={structure.title}>기억한 코드를{'\n'}입력하세요</Text>
              </View>
              <View style={structure.descriptionBox}>
                <Text style={structure.description}>코드를 타인에게 공유하지 마세요.{'\n'}5분 내로 코드를 입력해야 합니다.</Text>
                <View style={{ marginTop: 40 }}>
                  <Pressable onPress={() => inputRef.current?.focus()} style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={{ marginRight: '1%', width: '16%', height: 70, borderRadius: 15, backgroundColor: colors.light, alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{code[0]}</Text>
                    </View>
                    <View style={{ marginRight: '1%', width: '16%', height: 70, borderRadius: 15, backgroundColor: colors.light, alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{code[1]}</Text>
                    </View>
                    <View style={{ marginRight: '1%', width: '16%', height: 70, borderRadius: 15, backgroundColor: colors.light, alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{code[2]}</Text>
                    </View>
                    <View style={{ marginRight: '1%', width: '16%', height: 70, borderRadius: 15, backgroundColor: colors.light, alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{code[3]}</Text>
                    </View>
                    <View style={{ marginRight: '1%', width: '16%', height: 70, borderRadius: 15, backgroundColor: colors.light, alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{code[4]}</Text>
                    </View>
                    <View style={{ marginRight: '1%', width: '16%', height: 70, borderRadius: 15, backgroundColor: colors.light, alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{code[5]}</Text>
                    </View>
                  </Pressable>
                </View>
              </View>
              <View style={{ marginTop: 10, flexDirection: 'row' }}>
                <TextButton btnText='코드를 잊으셨나요?' fn={() => {
                  WebBrowser.openBrowserAsync(BASE_URL + "/mobile/login");
                }} />
              </View>
              <View style={{ opacity: 0, width: 0, height: 0, overflow: 'hidden' }}>
                <TextInput value={code} onChangeText={(text:string) => {
                  if(code.length < 6) setCode(text.replaceAll(/[^a-zA-Z0-9]/gi, '').toUpperCase());
                }} ref={inputRef} />
              </View>
            </View>
          </View>
        </View>
      </View>
      {/* <View style={structure.btnBox}>
        <ButtonGradient/>
        <Button btnText='다음' fn={() => {
          inputRef.current?.focus();
        }} />
      </View> */}
    </SafeAreaView>
  )
}

export function Notification({ navigation }:StackScreenProps<StartStackParamList, "Notification">) {
  const dispatch = useDispatch();
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
        navigation.navigate("Success");
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
            navigation.navigate("Success");
          } else {
            dispatch(notification({type: "error", text: "알림 설정에 실패했습니다"}));
          }
        });
      } catch (e: unknown) {
        dispatch(notification({type: "error", text: `${e}`}));
      }
    } else {
      dispatch(notification({type: "error", text: "실물 기기에서 테스트해주세요"}));

      navigation.navigate("Success");
    }
  }

  return (
    <SafeAreaView style={structure.safeViewContainer}>
      <View style={structure.container}>
        <View style={structure.headerBox}>
          <Header arrow={true} navigation={navigation} />
        </View>
        <View style={{ width: deviceWidth > 1000 ? 500 : '100%', flex: 1, marginHorizontal: 'auto' }}>
          <View style={structure.contentContainer}>
            <View style={structure.imageContentBox}>
              <View style={structure.titleBox}>
                <Text style={structure.title}>알림을{'\n'}허용해주세요</Text>
              </View>
              <View style={structure.descriptionBox}>
                <Text style={structure.description}>활승 신청 및 승인 상태 업데이트,{'\n'}오늘 해야 할 일 등을 알림으로 보내드릴게요.</Text>
                <View style={{ width: '100%', backgroundColor: colors.light, borderRadius: 15, padding: 17, marginTop: 30 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 15, textAlign: 'center' }}>선생님께는 저녁 6시 이후 알림이 전송되지 않습니다</Text>
                </View>
              </View>
              <View style={structure.imageBox}>
                {/* <Image style={structure.image} source={require("../assets/images/icon.png")}/> */}
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{ width: deviceWidth > 1000 ? 500 : '100%', marginHorizontal: 'auto' }}>
        <View style={structure.btnBox}>
          <ButtonGradient/>
          <Button btnText='다음' fn={() => setNotificationToken()} />
        </View>
      </View>
    </SafeAreaView>
  )
}

export function Success({ navigation }:StackScreenProps<StartStackParamList, "Success">) {
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={structure.safeViewContainer}>
      <View style={structure.container}>
        <View style={structure.headerBox}>
          <Header arrow={false} navigation={navigation} />
        </View>
        <View style={{ width: deviceWidth > 1000 ? 500 : '100%', flex: 1, marginHorizontal: 'auto' }}>
          <View style={structure.contentContainer}>
            <View style={structure.imageContentBox}>
              <View style={structure.titleBox}>
                <Text style={structure.title}>모든 준비가{'\n'}완료되었어요!</Text>
              </View>
              <View style={structure.descriptionBox}>
                <Text style={structure.description}>'완료하기'를 눌르고{'\n'}모바일에서 Ground를 이용하세요.</Text>
              </View>
              <View style={structure.imageBox}>
                <Image style={structure.image} source={require("../assets/images/logo_trans.png")}/>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{ width: deviceWidth > 1000 ? 500 : '100%', marginHorizontal: 'auto' }}>
        <View style={structure.btnBox}>
          <ButtonGradient/>
          <Button btnText='완료하기' fn={() => dispatch(login())} />
        </View>
      </View>
    </SafeAreaView>
  )
}