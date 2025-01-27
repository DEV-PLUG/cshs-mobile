import { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Platform, Dimensions, Text, Animated, Easing } from "react-native"
import { useSelector } from "react-redux";
import { RootState } from "../libs/reduces/reduces";
import { colors } from "../styles/colors";
import Svg, { Path } from "react-native-svg";

const deviceWidth = Dimensions.get('window').width;

let timeout:NodeJS.Timeout;

export default function InAppNotification() {
  const notification = useSelector((state: RootState) => state.app.notification);
  const boxOpacity = useRef(new Animated.Value(0)).current;
  const boxScale = useRef(new Animated.Value(0.7)).current;

  const [isShown, setShown] = useState(false);

  useEffect(() => {
    if(notification !== null) {
      setShown(true);
      clearTimeout(timeout);

      boxScale.stopAnimation();
      boxOpacity.stopAnimation();

      boxScale.setValue(0.5);
      boxOpacity.setValue(0);

      Animated.timing(boxOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
      Animated.timing(boxScale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
        easing: Easing.bezier(0.16, 1, 0.3, 1)
      }).start();

      timeout = setTimeout(function() {
        Animated.timing(boxOpacity, {
          toValue: 0,
          duration: 100,
          useNativeDriver: false,
        }).start(() => {
          setShown(false);
        });
      }, 1500);
    }
  }, [notification])

  return (
    <View style={notificationStyles.container}>
      { isShown === true && <Animated.View style={{...notificationStyles.box, transform: [{ scale: boxScale }], opacity: boxOpacity}}>
        <View style={notificationStyles.notificationBox}>
          { notification?.type === "success" && <Svg fill="#1EC050" viewBox="0 0 20 20"><Path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></Svg> }
          { notification?.type === "warning" && <Svg style={{marginTop: 4}} fill="#FF9933" viewBox="0 0 20 20"><Path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></Svg> }
          { notification?.type === "error" && <Svg fill="#FF3737" viewBox="0 0 20 20"><Path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></Svg> }
        </View>
        <Text style={notificationStyles.notificationText}>{notification?.text}</Text>
      </Animated.View> }
    </View>
  )
}

const notificationStyles = StyleSheet.create({
  container: {
    width: deviceWidth > 1000 ? 500 : deviceWidth - 50,
    left: deviceWidth > 1000 ? '50%' : 25,
    right: deviceWidth > 1000 ? '50%' : 25,
    position: "absolute",
    zIndex: 50,
    ...Platform.select({
      ios: { 
        top: 60
      },
      android: { 
        top: 95
      },
    }),
    transform: [
      { translateX: deviceWidth > 1000 ? '-50%' : 0 },
      { translateY: deviceWidth > 1000 ? '-50%' : 0 }
    ]
  },
  box: {
    left: 0,
    right: 0,
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.darkGray,
    // ...Platform.select({
    //   ios: { 
    //     shadowColor: '#000000',
    //     shadowOpacity: 0.2,
    //     shadowRadius: 10,
    //   },
    //   android: { 
    //     elevation: 20,
    //   },
    // })
  },
  notificationBox: {
    width: 30, 
    height: 30, 
    alignItems: "center", 
    justifyContent: "center"
  },
  notificationText: {
    fontFamily: "Pretendard-Medium", 
    fontSize: 17, 
    color: "#ffffff", 
    marginLeft: 7, 
    width: deviceWidth - 125
  }
})