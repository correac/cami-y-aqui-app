import React from "react";
import {Root} from "native-base";
// import { StackNavigator, DrawerNavigator } from "react-navigation";
import {createDrawerNavigator, createStackNavigator, createAppContainer, createSwitchNavigator} from "react-navigation";

import SideBar from "./screens/sidebar";
import Home from "./screens/home/";
import Location from "./screens/location";
import locationMap from "./screens/location/locationmap";
import photogallery from "./screens/location/photogallery";
import Contact from "./screens/contact";
import AuthLoading from "./screens/login/authloading";
import Login from "./screens/login";
import Rsvp from "./screens/rsvp";
import HeaderApp from "./screens/header";
import Group from "./screens/rsvp/group";
import addGuest from "./screens/rsvp/addguest";
import Profile from "./screens/profile";


const LocationNavigator = createStackNavigator(
  {
    Location: {
      screen: Location,
      navigationOptions: {
        header: null
      }
    },
    LocationMap: {screen: locationMap},
    LocationPhoto: {screen: photogallery}
  },
  {
    initialRouteName: "Location"
  }
);

const RsvpNavigator = createStackNavigator(
  {
    Rsvp: {
      screen: Rsvp,
      navigationOptions: {
        header: null
      }
    },
    Group: {screen: Group},
    AddGuest: {screen: addGuest}
  }
);

const Drawer = createDrawerNavigator(
  {
    Home: {screen: Home},
    Location: {screen: LocationNavigator},
    Contact: {screen: Contact},
    Rsvp: {screen: RsvpNavigator},
    Profile: {screen: Profile}
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
    Drawer: {screen: Drawer},
  },
  {
    initialRouteName: "Drawer",
  }
);

const AuthNavigator = createSwitchNavigator(
  {
    AuthInit: {screen: AuthLoading},
    Auth: {screen: Login},
    App: {screen: Drawer}
  },
  {
    initialRouteName: "AuthInit",
    headerMode: "none"
  }
);

const AppContainer = createAppContainer(AuthNavigator);

export default () =>
  <Root>
    <AppContainer/>
  </Root>;
