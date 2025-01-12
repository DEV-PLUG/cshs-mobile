import { CardStyleInterpolators, TransitionPresets } from "@react-navigation/stack";

export const navigationOptions = {
  gestureEnabled: true,
  headerShown: false,
  cardShadowEnabled: true,
  ...TransitionPresets.SlideFromRightIOS
}