import { useEffect, useRef } from "react";
import { View, StyleSheet, Dimensions, Image, Animated, Text } from "react-native";

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default function Loading() {
  return (
    <View style={{
      width: deviceWidth,
      height: deviceHeight,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
    }}>
      {/* <View style={{
        width: 80,
        height: 80,
        position: 'absolute',
        marginVertical: 100
      }}>
      </View> */}
      <View>
        <Text>fff</Text>
      </View>
    </View>
  )
}