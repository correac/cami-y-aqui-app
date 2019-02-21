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

const Drawer = createDrawerNavigator(
  {
    Home: { screen: Home },
    Location: {screen: Location},
    Contact: {screen: Contact}
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
    Drawer: { screen: Drawer },
    LocationMap: {screen: locationMap},
    LocationPhoto: {screen: photogallery}
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default () =>
  <Root>
    <AppContainer />
  </Root>;
