const React = require("react-native");
const {Dimensions, Platform} = React;
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  imageContainer: {
    flex: 1,
    width: null,
    height: null
  },
  logoContainer: {
    flex: 1,
    marginTop: deviceHeight / 12,
    marginBottom: deviceHeight / 8,
  },
  logo: {
    position: "absolute",
    left: Platform.OS === "android" ? 40 : 50,
    top: Platform.OS === "android" ? 35 : 60,
    width: 280,
    height: 100
  },
  photoGalleryContainer:{
    marginTop: 5,
  },
  photoGallery: {
    flex: 1,
    padding: 6,
  },
  photo: {
    flex: 1,
    width: deviceWidth / 1.05,
    height: (deviceWidth / 1.05)*2/3,
    resizeMode: "contain"
  },
  text: {
    color: "#8b8b8b",
    bottom: 6,
    marginTop: 5
  }
};
