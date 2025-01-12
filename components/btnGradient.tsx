import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet } from "react-native";

interface ButtonGradient {
  opposite?: boolean;
}

export default function ButtonGradient({
    opposite = false,
  }:ButtonGradient) {

  return (
    <LinearGradient style={gradientStyles.btnGradient} colors={ opposite === true ? ['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)'] : ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)'] }></LinearGradient>
  )
}

const gradientStyles = StyleSheet.create({
  btnGradient: {
    height: 25,
    position: "absolute",
    top: -25,
    right: 0,
    left: 0
  }
})