import React from "react";
import { Root } from "native-base";
// import { StackNavigator, DrawerNavigator } from "react-navigation";
import { createDrawerNavigator, createStackNavigator, createAppContainer } from "react-navigation";

import SideBar from "./screens/sidebar";
import Home from "./screens/home/";
import Location from "./screens/location";
import locationMap from "./screens/location/locationmap";
import photogallery from "./screens/location/photogallery";
import Contact from "./screens/contact";
import AuthLoading from "./screens/login/authloading";
import Login from "./screens/login";
import Rsvp from "./screens/rsvp";

const Drawer = createDrawerNavigator(
  {
    Home: { screen: Home },
    Location: {screen: Location},
    Contact: {screen: Contact},
    Rsvp: {screen: Rsvp}
  },
  {
    initialRouteName: "Home",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

const AppNavigator = createStackNavigator(
  {
    AuthInit: {screen: AuthLoading},
    Auth: {screen: Login},
    Drawer: { screen: Drawer },
    LocationMap: {screen: locationMap},
    LocationPhoto: {screen: photogallery}
  },
  {
    initialRouteName: "AuthInit",
    headerMode: "none"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default () =>
  <Root>
    <AppContainer />
  </Root>;
