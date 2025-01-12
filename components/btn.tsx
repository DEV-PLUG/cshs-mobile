import { View, Pressable, StyleSheet, Text } from "react-native"
import { colors } from "../styles/colors";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Button {
  btnText: string;
  fn?(): void;
  keyboard?: boolean;
}

interface TextButton {
  btnText: string;
  fn?(): void;
}

interface ContentTextButton {
  underline?: boolean;
  btnText: string;
  fn?(): void;
}

export function MapButton({
  btnText,
  fn,
  keyboard = false,
}:Button) {

return (
  <TouchableOpacity
    onPress={() => {
      fn && fn()
    }}
    activeOpacity={0.7}
  >
    <View style={ keyboard === true ? {...buttonStyles.btn} : {...buttonStyles.btn, borderRadius: 20} }>
      <Text style={buttonStyles.btnText}>{btnText}</Text>
    </View>
  </TouchableOpacity>
)
}

export function Button({
    btnText,
    fn,
    keyboard = false,
  }:Button) {

  return (
    <Pressable
      onPress={() => {
        fn && fn()
      }}
      style={({ pressed }):any => [
        {
          opacity: pressed
            ? 0.7
            : 1
        }
      ]}>
      <View style={ keyboard === true ? {...buttonStyles.btn, borderRadius: 20} : {...buttonStyles.btn, borderRadius: 20} }>
        <Text style={buttonStyles.btnText}>{btnText}</Text>
      </View>
    </Pressable>
  )
}

export function LightButton({
    btnText,
    fn,
    keyboard = false,
  }:Button) {

  return (
    <Pressable
      onPress={() => {
        fn && fn()
      }}
      style={({ pressed }):any => [
        {
          opacity: pressed
            ? 0.7
            : 1
        }
      ]}>
      <View style={ keyboard === true ? {...lightButtonStyles.btn} : {...lightButtonStyles.btn, borderRadius: 20} }>
        <Text style={lightButtonStyles.btnText}>{btnText}</Text>
      </View>
    </Pressable>
  )
}

export function TextButton({
    btnText,
    fn,
  }:TextButton) {

  return (
    <View style={textButtonStyles.btnBox}>
      <Pressable
        onPress={() => {
          fn && fn()
        }}
        style={({ pressed }) => [
          {
            ...textButtonStyles.btn,
            backgroundColor: pressed
              ? 'rgba(59, 130, 246, 0.3)'
              : 'rgba(59, 130, 246, 0.2)'
          }
        ]}>
          <Text style={textButtonStyles.btnText}>{btnText}</Text>
      </Pressable>
    </View>
  )
}

export function ContentTextButton({
  btnText,
  fn,
  underline = false,
}:ContentTextButton) {

return (
  <View style={contentTextButtonStyles.btnBox}>
    <Pressable
      onPress={() => {
        fn && fn()
      }}
      style={({ pressed }) => [
        {
          ...contentTextButtonStyles.btn,
          backgroundColor: pressed
            ? colors.lightGray
            : '#fff'
        }
      ]}>
        <Text style={ underline === true ? {...textButtonStyles.btnText, textDecorationLine: 'underline'} : {...textButtonStyles.btnText} }>{btnText}</Text>
    </Pressable>
  </View>
)
}

const contentTextButtonStyles = StyleSheet.create({
  btnBox: {
    justifyContent: "space-between",
    flexDirection: "row",
    position: "relative",
    left: -7,
  },
  btnText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "bold",
    fontFamily: "Pretendard-Bold"
  },
  btn: {
    padding: 7,
    alignSelf: 'center',
    borderRadius: 7,
  }
})

const buttonStyles = StyleSheet.create({
  btn: {
    height: 57,
    backgroundColor: colors.baseColor,
    alignItems: "center",
    justifyContent: "center",
    width: '100%'
  },
  btnText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "bold",
    fontFamily: "Pretendard-Bold"
  },
})

const lightButtonStyles = StyleSheet.create({
  btn: {
    height: 57,
    backgroundColor: 'rgba(175, 227, 2, 0.3)',
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: colors.baseColor,
    fontSize: 17,
    fontWeight: "bold",
    fontFamily: "Pretendard-Bold"
  },
})

const textButtonStyles = StyleSheet.create({
  btnBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 7,
  },
  btn: {
    paddingHorizontal: 10,
    justifyContent: "center",
    height: 30,
    borderRadius: 7,
  },
  btnText: {
    color: colors.baseColor,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Pretendard-Medium",
  },
})