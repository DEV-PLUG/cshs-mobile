import { Keyboard, Platform } from "react-native";
import { useEffect } from "react";

interface detectKeyboard {
  setIsKeyboard(value:boolean): void;
}

export default function detectKeyboard({ setIsKeyboard }:detectKeyboard) {
  useEffect(() => {
    const showSubscription = Platform.OS === 'ios' ? Keyboard.addListener("keyboardWillShow", () => {
      setIsKeyboard(true);
    }) : Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboard(true);
    })
    const hideSubscription = Platform.OS === 'ios' ? Keyboard.addListener("keyboardWillHide", () => {
      setIsKeyboard(false);
    }) : Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboard(false);
    })

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
}