import { useState, useRef, useEffect } from "react"
import { TextInput, View, StyleSheet, Animated, Text, Pressable, Platform } from "react-native"
import { colors } from "../styles/colors"

interface Input {
  Ref?: any;
  onEndEditing?(): void;
  onChangeText?(text:string): void;
  placeholder: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad' | 'decimal-pad';
  secureText?: boolean;
  label?: string;
  error?: boolean | string;
  editable?: boolean;
  textarea?: boolean;
  value?: string;
  type?: "none" | "money";
}

interface CustomInput {
  placeholder: string;
  label?: string;
  error?: boolean | string;
  textarea?: boolean;
  value?: string;
  fn?(): void;
}

export default function Input({ 
  Ref = useRef(), 
  onEndEditing,
  onChangeText,
  placeholder, 
  keyboardType = 'default',
  secureText = false,
  label = '',
  error = false,
  editable = true,
  textarea = false,
  value = '',
  type = "none",
  }:Input) {
  
  const [ isFocus, setFocus ] = useState(false);

  let labelBottomAnimation = useRef(new Animated.Value(0)).current;

  if(Platform.OS === 'ios') labelBottomAnimation = useRef(new Animated.Value(23)).current;
  else labelBottomAnimation = useRef(new Animated.Value(19)).current;

  if(value !== '') labelBottomAnimation = useRef(new Animated.Value(3)).current;

  let labelFontAnimation = useRef(new Animated.Value(1)).current;
  if(value !== '') labelFontAnimation = useRef(new Animated.Value(0.5)).current;

  const [text, setChangeText] = useState("");

  useEffect(() => {
    setChangeText(value);
  }, []);

  const onChange = (inputText:string) => {
    setChangeText(inputText);
    onChangeText && onChangeText(inputText);
  }

  return (
    <View>
      <View style={ textarea === true ? {
        ...inputStyles.inputBox,
        borderColor: error === false ? isFocus === true ? colors.baseColor : colors.lightGray : colors.Red, height: 50 + 30 * (text.split("\n").length - 1)
        } : {
        ...inputStyles.inputBox,
        borderColor: error === false ? isFocus === true ? colors.baseColor : colors.lightGray : colors.Red
        }}>
        <TextInput 
          multiline={textarea}
          editable={editable}
          secureTextEntry={secureText}
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor={colors.Gray}
          ref={Ref}
          value={text}
          onChangeText={ inputText => onChange(inputText) }
          style={ textarea === true ? editable === false ? {...inputStyles.input, color: colors.Gray, marginTop: 5, height: 48 + 30 * (text.split("\n").length - 1), paddingTop: 5, overflow: "scroll", paddingBottom: 5} : {...inputStyles.input, marginTop: 5, height: 42 + 30 * (text.split("\n").length - 1), paddingTop: 5, overflow: "scroll", paddingBottom: 5} : editable === false ? {...inputStyles.input, color: colors.Gray} : {...inputStyles.input} } 
          onEndEditing={() => {
            setFocus(false);

            if(type === "money" && text !== '') {
              if(text.replace(/\./g, "").replace(/\,/g, "").replace(/(^0+)/, "") === '') {
                setChangeText('');

                if(Platform.OS === 'ios') {
                  Animated.timing(labelBottomAnimation, {
                    toValue: 23,
                    duration: 100,
                    useNativeDriver: false
                  }).start();
                } else {
                  Animated.timing(labelBottomAnimation, {
                    toValue: 19,
                    duration: 100,
                    useNativeDriver: false
                  }).start();
                }
                Animated.timing(labelFontAnimation, {
                  toValue: 1,
                  duration: 100,
                  useNativeDriver: false
                }).start();
              }
              else setChangeText(text.replace(/\./g, "").replace(/\,/g, "").replace(/(^0+)/, "").replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원');
            }

            if(text !== "")  {
              onEndEditing && onEndEditing();
            }
          }} 
          onFocus={() => {
            setFocus(true);
            if(type === "money") setChangeText(text.replace(/,/g, "").slice(0, -1));
          }} 
        />
      </View>
      {/* <Animated.View style={{...inputStyles.placeholder, top: labelBottomAnimation}}>
        <Animated.View style={{transform: [{scale: labelFontAnimation}]}}>
          <Pressable onPress={() => Ref.current.focus()}>
            <Text onPress={() => Ref.current.focus()} style={ error === false ? isFocus === true ? {...inputStyles.placeholderText, color: colors.baseColor} : {...inputStyles.placeholderText} : {...inputStyles.placeholderText, color: colors.Red} }>{placeholder}</Text>
          </Pressable>
        </Animated.View>
      </Animated.View> */}
      { !(label === '' && error === false) && <View style={inputStyles.label}>
        <Text style={ error !== false ? {...inputStyles.labelText, color: colors.Red} : {...inputStyles.labelText} }>{ error === false ? label : error }</Text>
      </View> }
    </View>
  )
}

export function CustomInput({ 
    placeholder, 
    label = '',
    error = false,
    textarea = false,
    value = '',
    fn,
  }:CustomInput) {

  return (
    <Pressable
      onPress={() => fn !== undefined && fn()}
    >
      <View style={ textarea === true ? {
        ...inputStyles.inputBox,
        borderColor: error === false ? colors.lightGray : colors.Red, height: 50 + 30 * (value.split("\n").length - 1)
        } : {
        ...inputStyles.inputBox,
        borderColor: error === false ? colors.lightGray : colors.Red
        }}>
        <TextInput 
          onPressOut={() => fn !== undefined && fn()}
          editable={false}
          value={value}
          multiline={textarea}
          style={ textarea === true ? {...inputStyles.input, marginTop: 5, height: 42 + 30 * (value.split("\n").length - 1), paddingTop: 5, overflow: "scroll", paddingBottom: 5} : {...inputStyles.input} }
        />
      </View>
      { !(label === '' && error === false) && <View style={inputStyles.label}>
        <Text style={ error !== false ? {...inputStyles.labelText, color: colors.Red} : {...inputStyles.labelText} }>{ error === false ? label : error }</Text>
      </View> }
    </Pressable>
  )
}

const inputStyles = StyleSheet.create({
  input: {
    height: 50,
    fontSize: 20,
    color: colors.darkGray,
    fontFamily: "Pretendard-Medium",
    width: 400,
    padding: 10,
    paddingHorizontal: 15
  },
  inputBox: {
    borderWidth: 2.5,
    marginTop: 5,
    position: "relative",
    borderRadius: 18
  },
  placeholder: {
    position: 'absolute',
    left: 0,
    flexDirection: "row",
  },
  placeholderText: {
    fontSize: 30,
    left: 0,
    color: colors.Gray,
    position: "absolute",
    fontFamily: "Pretendard-Medium"
  },
  label: {
    marginTop: 5,
  },
  labelText: {
    fontSize: 15.5,
    fontFamily: "Pretendard-Medium",
    color: colors.Gray
  }
})