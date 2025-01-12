import { useEffect, useRef } from "react";
import { View, StyleSheet, Dimensions, Image, Animated, Text } from "react-native";

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default function Loading() {
  let circle1 = useRef(new Animated.Value(0)).current;
  let circle2 = useRef(new Animated.Value(0)).current;
  let circle3 = useRef(new Animated.Value(0)).current;
  let circle4 = useRef(new Animated.Value(0)).current;

  function circleAnimation() {
    circle1.setValue(0);
    circle2.setValue(0);
    circle3.setValue(0);
    circle4.setValue(0);

    Animated.timing(circle1, {
      toValue: 30,
      duration: 500,
      useNativeDriver: false
    }).start();
    Animated.timing(circle2, {
      toValue: 30,
      duration: 500,
      useNativeDriver: false
    }).start();
    Animated.timing(circle3, {
      toValue: 30,
      duration: 500,
      useNativeDriver: false
    }).start();
    Animated.timing(circle4, {
      toValue: 30,
      duration: 500,
      useNativeDriver: false
    }).start();
    setTimeout(() => {
      Animated.timing(circle1, {
        toValue: -30,
        duration: 1000,
        useNativeDriver: false
      }).start();
      Animated.timing(circle2, {
        toValue: -30,
        duration: 1000,
        useNativeDriver: false
      }).start();
      Animated.timing(circle3, {
        toValue: -30,
        duration: 1000,
        useNativeDriver: false
      }).start();
      Animated.timing(circle4, {
        toValue: -30,
        duration: 1000,
        useNativeDriver: false
      }).start();
    }, 500);
  }

  useEffect(() => {
    circleAnimation();
    setInterval(() => {
      circleAnimation();
    }, 1000);
  }, [])

  return (
    <View style={{
      width: deviceWidth,
      height: deviceHeight,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
    }}>
      <View style={{
        width: 80,
        height: 80,
        position: 'absolute',
        marginVertical: 100
      }}>
        <Animated.View style={{
          position: 'absolute',
          bottom: circle1,
          opacity: 0.5
        }}>
          <Image style={{
            width: 80,
            height: 80
          }} source={require("../assets/images/logo/circle1.png")}/>
        </Animated.View>
        <Animated.View style={{
          position: 'absolute',
          left: circle2,
          opacity: 0.5
        }}>
          <Image style={{
            width: 80,
            height: 80
          }} source={require("../assets/images/logo/circle2.png")}/>
        </Animated.View>
        <Animated.View style={{
          position: 'absolute',
          right: circle3,
          opacity: 0.5
        }}>
          <Image style={{
            width: 80,
            height: 80
          }} source={require("../assets/images/logo/circle3.png")}/>
        </Animated.View>
        <Animated.View style={{
          position: 'absolute',
          top: circle4,
          opacity: 0.5
        }}>
          <Image style={{
            width: 80,
            height: 80
          }} source={require("../assets/images/logo/circle4.png")}/>
        </Animated.View>
      </View>
    </View>
  )
}

export function LoadingComponent() {
  let circle1 = useRef(new Animated.Value(0)).current;
  let circle2 = useRef(new Animated.Value(0)).current;
  let circle3 = useRef(new Animated.Value(0)).current;
  let circle4 = useRef(new Animated.Value(0)).current;

  function circleAnimation() {
    circle1.setValue(0);
    circle2.setValue(0);
    circle3.setValue(0);
    circle4.setValue(0);

    Animated.timing(circle1, {
      toValue: 30,
      duration: 500,
      useNativeDriver: false
    }).start();
    Animated.timing(circle2, {
      toValue: 30,
      duration: 500,
      useNativeDriver: false
    }).start();
    Animated.timing(circle3, {
      toValue: 30,
      duration: 500,
      useNativeDriver: false
    }).start();
    Animated.timing(circle4, {
      toValue: 30,
      duration: 500,
      useNativeDriver: false
    }).start();
    setTimeout(() => {
      Animated.timing(circle1, {
        toValue: -30,
        duration: 1000,
        useNativeDriver: false
      }).start();
      Animated.timing(circle2, {
        toValue: -30,
        duration: 1000,
        useNativeDriver: false
      }).start();
      Animated.timing(circle3, {
        toValue: -30,
        duration: 1000,
        useNativeDriver: false
      }).start();
      Animated.timing(circle4, {
        toValue: -30,
        duration: 1000,
        useNativeDriver: false
      }).start();
    }, 500);
  }

  useEffect(() => {
    circleAnimation();
    setInterval(() => {
      circleAnimation();
    }, 1000);
  }, [])

  return (
    <View style={{
      width: deviceWidth,
      height: deviceHeight,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
    }}>
      <View style={{
        width: 80,
        height: 80,
        position: 'absolute',
        marginVertical: 100
      }}>
        <Animated.View style={{
          position: 'absolute',
          bottom: circle1,
          opacity: 0.5
        }}>
          <Image style={{
            width: 80,
            height: 80
          }} source={require("../assets/images/logo/circle1.png")}/>
        </Animated.View>
        <Animated.View style={{
          position: 'absolute',
          left: circle2,
          opacity: 0.5
        }}>
          <Image style={{
            width: 80,
            height: 80
          }} source={require("../assets/images/logo/circle2.png")}/>
        </Animated.View>
        <Animated.View style={{
          position: 'absolute',
          right: circle3,
          opacity: 0.5
        }}>
          <Image style={{
            width: 80,
            height: 80
          }} source={require("../assets/images/logo/circle3.png")}/>
        </Animated.View>
        <Animated.View style={{
          position: 'absolute',
          top: circle4,
          opacity: 0.5
        }}>
          <Image style={{
            width: 80,
            height: 80
          }} source={require("../assets/images/logo/circle4.png")}/>
        </Animated.View>
      </View>
    </View>
  )
}