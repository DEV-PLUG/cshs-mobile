import { View, SafeAreaView, KeyboardAvoidingView, Text, Image, Keyboard, StyleSheet, ScrollView, Pressable, Animated, Dimensions, Platform, Easing } from "react-native";
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';

import structure from "../styles/structure";
import Header from "@/components/header";
import { navigationOptions } from "@/libs/navigation";
import { Button, LightButton, TextButton } from "@/components/btn";
import Input, { CustomInput } from "@/components/input";
import { useEffect, useRef, useState } from "react";
import detectKeyboard from "@/libs/detectKeyboard";
import { BASE_URL } from "@/libs/swr";
import { useDispatch } from "react-redux";
import { login, setLoading } from "@/libs/reduces/app";
import { saveItem } from "@/libs/SecureStore";
import ButtonGradient from "@/components/btnGradient";
import { colors } from "@/styles/colors";
import * as WebBrowser from 'expo-web-browser';

const deviceWidth = Dimensions.get('window').width;

const Stack = createStackNavigator<StartStackParamList>();

type StartStackParamList = {
  Start1: undefined;
  Signup: undefined;
  Login: undefined;
};

export default function Start() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Start1">
          <Stack.Screen name="Start1" component={Start1} options={navigationOptions} />
          <Stack.Screen name="Signup" component={Signup} options={navigationOptions} />
          <Stack.Screen name="Login" component={Login} options={navigationOptions} />
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
        <View style={structure.contentContainer}>
          <View style={structure.imageContentBox}>
            <View style={structure.titleBox}>
              <Text style={structure.title}>Ground와 함께하는{'\n'}편리한 학교생활!</Text>
            </View>
            <View style={structure.descriptionBox}>
              <Text style={structure.description}>Ground의 모든 기능을{'\n'}모바일 앱으로 이용해보세요.</Text>
            </View>
            <View style={structure.imageBox}>
              <Image style={structure.image} source={require("../assets/images/icon.png")}/>
            </View>
          </View>
        </View>
      </View>
      <View style={structure.btnBox}>
        <ButtonGradient/>
        <Button btnText='시작하기' fn={() => navigation.navigate("Signup")} />
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
      <View style={structure.btnBox}>
        <ButtonGradient/>
        <Button btnText='다음' fn={() => WebBrowser.openBrowserAsync("http://192.168.25.15:3000/mobile/login")} />
      </View>
    </SafeAreaView>
  )
}

export function Signup2({ navigation }:StackScreenProps<StartStackParamList, "Signup">) {

  const input1 = useRef<HTMLDivElement>();
  const input2 = useRef<HTMLDivElement>();
  const input3 = useRef<HTMLDivElement>();
  const input4 = useRef<HTMLDivElement>();
  const input5 = useRef<HTMLDivElement>();
  const input6 = useRef<HTMLDivElement>();

  const [inputProcess, setInputProcess] = useState(0);
  const [isKeyboard, setIsKeyboard] = useState(false);
  detectKeyboard({setIsKeyboard});

  useEffect(() => {
    input1.current?.focus();
  }, [])

  useEffect(() => {
    setTimeout(function() {
      if(inputProcess === 1) input2.current?.focus();
      if(inputProcess === 2) input3.current?.focus();
      if(inputProcess === 3) input4.current?.focus();
      if(inputProcess === 4) input5.current?.focus();
      if(inputProcess === 5) input6.current?.focus();
    }, 200);
  }, [inputProcess])

  const [id, setId] = useState('');
  const [pw, setPW] = useState('');
  const [email, setEmail] = useState('');
  const [sex, setSex] = useState('');
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [loading, setLoadingState] = useState(false);

  const dispatch = useDispatch();
  async function signup() {
    if (loading) return;
    setLoadingState(true);
    dispatch(setLoading(true));

    fetch(BASE_URL + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        user_id: id,
        password: pw,
        sex: +sex,
        birthday: new Date(birthday),
        name: name
      })
    })
    .then((response) => response.json())
    .then(async (response) => {
      setLoadingState(false);
      dispatch(setLoading(false));
      if(response.success === true) {
        await saveItem("accessToken", response.token + '');
        dispatch(login());
      } else {
      }
    })
  }

  return (
      <SafeAreaView style={structure.safeViewContainer}>
        <View style={structure.container}>
          <View style={structure.headerBox}>
            <Header arrow={true} navigation={navigation} />
          </View>
          <ScrollView style={structure.contentContainer}>
            <View style={structure.contentContainer}>
              <View style={structure.contentBox}>
                <View style={{display: 'flex', width: 400, flexDirection: 'row', marginBottom: 30}}>
                  <TextButton fn={() => navigation.navigate('Login')} btnText="이미 계정이 있으신가요?" />
                </View>
                {/* <Text style={structure.inputLabel}>이메일</Text> */}
                <Input placeholder={'이메일'} Ref={input1} onEndEditing={() => { if(inputProcess < 1) setInputProcess(1) }} onChangeText={(value:any) => setEmail(value)} />
                { inputProcess >= 1 && <View style={{marginTop:30}}>
                  {/* <Text style={structure.inputLabel}>아이디</Text> */}
                  <Input placeholder={'아이디'} Ref={input2} onEndEditing={() => { if(inputProcess < 2) setInputProcess(2) }} onChangeText={(value:any) => setId(value)} />
                </View> }
                { inputProcess >= 2 && <View style={{marginTop:30}}>
                  {/* <Text style={structure.inputLabel}>비밀번호</Text> */}
                  <Input placeholder={'비밀번호'} secureText Ref={input3} onEndEditing={() => { if(inputProcess < 3) setInputProcess(3) }} onChangeText={(value:any) => setPW(value)} />
                </View> }
                { inputProcess >= 3 && <View style={{marginTop:30}}>
                  {/* <Text style={structure.inputLabel}>성별</Text> */}
                  <Input placeholder={'성별'} Ref={input4} onEndEditing={() => { if(inputProcess < 4) setInputProcess(4) }} onChangeText={(value:any) => setSex(value)} />
                </View> }
                { inputProcess >= 4 && <View style={{marginTop:30}}>
                  {/* <Text style={structure.inputLabel}>이름</Text> */}
                  <Input placeholder={'이름'} Ref={input5} onEndEditing={() => { if(inputProcess < 5) setInputProcess(5) }} onChangeText={(value:any) => setName(value)} />
                </View> }
                { inputProcess >= 5 && <View style={{marginTop:30}}>
                  {/* <Text style={structure.inputLabel}>생일</Text> */}
                  <Input placeholder={'생일'} Ref={input6} onEndEditing={() => { if(inputProcess < 6) setInputProcess(6) }} onChangeText={(value:any) => setBirthday(value)} />
                </View> }
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={structure.btnBox}>
          <ButtonGradient/>
          <Button btnText='다음' keyboard={isKeyboard} fn={ inputProcess >= 6 ? isKeyboard === true ? () => Keyboard.dismiss() : () => signup() : () => Keyboard.dismiss() } />
        </View>
      </SafeAreaView>
  )
}

export function Login({ navigation }:StackScreenProps<StartStackParamList, "Login">) {

  const input1 = useRef<HTMLDivElement>();
  const input2 = useRef<HTMLDivElement>();

  const [inputProcess, setInputProcess] = useState(0);
  const [isKeyboard, setIsKeyboard] = useState(false);
  detectKeyboard({setIsKeyboard});

  useEffect(() => {
    input1.current?.focus();
  }, [])

  useEffect(() => {
    setTimeout(function() {
      if(inputProcess === 1) input2.current?.focus();
    }, 200);
  }, [inputProcess])

  const [id, setId] = useState('');
  const [pw, setPW] = useState('');
  const [loading, setLoadingState] = useState(false);

  const dispatch = useDispatch();
  async function signin() {
    if (loading) return;
    setLoadingState(true);
    dispatch(setLoading(true));

    fetch(BASE_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: id,
        password: pw
      })
    })
    .then((response) => response.json())
    .then(async (response) => {
      setLoadingState(false);
      dispatch(setLoading(false));
      if(response.success === true) {
        await saveItem("accessToken", response.token + '');
        dispatch(login());
      } else {
      }
    })
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={structure.container}>
      <SafeAreaView style={structure.safeViewContainer}>
        <View style={structure.container}>
          <View style={structure.headerBox}>
            <Header arrow={true} navigation={navigation} />
          </View>
          <ScrollView style={structure.contentContainer}>
            <View style={structure.contentContainer}>
              <View style={structure.contentBox}>
                <View style={{marginTop:0}}>
                  {/* <Text style={structure.inputLabel}>아이디</Text> */}
                  <Input placeholder={'아이디'} Ref={input1} onEndEditing={() => { if(inputProcess < 1) setInputProcess(1) }} onChangeText={(value:any) => setId(value)} />
                </View> 
                { inputProcess >= 1 && <View style={{marginTop:30}}>
                  {/* <Text style={structure.inputLabel}>비밀번호</Text> */}
                  <Input placeholder={'비밀번호'} secureText Ref={input2} onEndEditing={() => { if(inputProcess < 2) setInputProcess(2) }} onChangeText={(value:any) => setPW(value)} />
                </View> }
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={structure.btnBox}>
          <Button btnText='다음' fn={ inputProcess >= 2 ? isKeyboard === true ? () => Keyboard.dismiss() : () => signin() : () => Keyboard.dismiss() } />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}