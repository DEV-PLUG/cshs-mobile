import { StyleSheet, Dimensions } from "react-native";
import { colors } from "./colors";
// import StatusBarHeightFn from "../libs/StatusBarHeight";

// const StatusBarHeight = StatusBarHeightFn();
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  safeViewContainer: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: '#ffffff',
  },
  headerBox: {
    height: 50,
    paddingHorizontal: 10,
    left: 0,
    right: 0,
    zIndex: 10,
    justifyContent: "center",
    // backgroundColor: 'black'
  },
  contentContainer: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    position: "relative"
  },
  contentBox: {
    paddingHorizontal: 25,
  },
  imageContentBox: {
    paddingHorizontal: 25,
    flex: 1
  },
  btnBox: {
    paddingHorizontal: 25,
    paddingBottom: 25,
    position: "relative",
  },
  btnBoxKeyboard: {
    position: "relative",
    paddingHorizontal: 25,
    paddingBottom: 25 + 57,
  },

  title: {
    fontSize: 27,
    color: colors.darkGray,
    fontWeight: 'bold',
    fontFamily: "Pretendard-Bold"
  },
  description: {
    fontSize: 17,
    color: colors.textGray,
    fontFamily: "Pretendard-Medium"
  },
  imageBox: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  image: {
    width: 220,
    height: 220
  },
  inputBox: {
    marginTop: 35
  },

  titleBox: {
    marginTop: 15
  },
  descriptionBox: {
    marginTop: 7
  },

  modalTitle: {
    fontSize: 25,
    color: colors.darkGray,
    fontFamily: "Pretendard-Bold"
  },
  modalDescription: {
    fontSize: 15,
    color: colors.textGray,
    fontFamily: "Pretendard-Medium",
    marginTop: 5,
    marginBottom: 30
  },
  modalBtnBox: {
    position: "relative",
    marginTop: 45,
  },
  modalSubContentBox: {
    marginTop: 20,
  },
  modalSubTitle: {
    fontSize: 23,
    color: colors.darkGray,
    fontFamily: "Pretendard-Bold"
  },
  modalSubDescription: {
    fontSize: 13,
    color: colors.textGray,
    fontFamily: "Pretendard-Medium",
  },

  listBox: {
    right: 0,
    left: 0,
    paddingVertical: 13,
    paddingHorizontal: 25,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  listBoxIcon: {
    width: 45,
    height: 45,
    borderRadius: 45,
    backgroundColor: colors.lightGray,
    alignItems: "center",
    justifyContent: "center"
  },
  listBoxTextContainer: {
    marginLeft: 10,
    justifyContent: "center",
    height: 40
  },
  listBoxTitle: {
    fontSize: 18,
    color: colors.darkGray,
    fontFamily: "Pretendard-Bold",
  },
  listBoxDescription: {
    fontSize: 13,
    color: colors.textGray,
    fontFamily: "Pretendard-Medium"
  },

  line: { 
    right: 0, 
    left: 0,
    height: 1, 
    backgroundColor: colors.lightGray, 
    marginTop: 15, 
    marginBottom: 30 
  },
  loadingContainer: {
    width: deviceWidth, 
    height: deviceHeight - 100, 
    alignItems: "center", 
    justifyContent: "center"
  }
});