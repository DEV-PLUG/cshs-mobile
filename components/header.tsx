import { Pressable, StyleSheet, View, Text, Animated } from "react-native"
import Entypo from "@expo/vector-icons/Entypo"
import { useEffect, useRef } from "react"
import { colors } from "@/styles/colors";

interface Header {
  title?: string;
  navigation?: any;
  SubContent?: any;
  arrow?: boolean;
}

export default function Header({
    title = '',
    navigation,
    SubContent = null,
    arrow = true,
  }:Header) {

  const titleOpacity = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    if(title === '') {
      Animated.timing(titleOpacity, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false
      }).start();
    } else {
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false
      }).start();
    }
  }, [title])
  
  return (
    <View style={headerStyles.headerBox}>
      <View>
        { arrow === true && <Pressable
          onPress={() => {
            navigation.goBack()
          }}
          style={({ pressed }):any => [
            {
              ...headerStyles.headerBtn,
              opacity: pressed
                ? 0.3
                : 1
            }
        ]}>
          <Entypo name="chevron-left" size={30} color={'#000000'} />
        </Pressable> }
        <Animated.Text style={{...headerStyles.title, opacity: titleOpacity}}>
          {title}
        </Animated.Text>
        <View style={headerStyles.headerSubContent}>
          { SubContent !== null && <SubContent/> }
        </View>
      </View>
    </View>
  )
}

const headerStyles = StyleSheet.create({
  title: {
    textAlign: "center",
    justifyContent: "center",
    lineHeight: 23,
    fontSize: 17,
    fontFamily: "Pretendard-Medium",
    height: 23,
  },
  headerBox: {
    position: "relative",
    height: 35,
    justifyContent: "center"
  },
  headerBtn: {
    position: 'absolute',
    zIndex: 10,
    width: 40,
    left: 10
  },
  headerSubContent: {
    position: 'absolute',
    zIndex: 10,
    right: 5,
    height: 23,
    justifyContent: "center",
  }
});