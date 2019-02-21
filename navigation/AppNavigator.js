import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen';
import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";

const AuthStack = createStackNavigator({SignIn: LoginScreen});
const AppStack = createStackNavigator({ Home: HomeScreen, Other: LinksScreen});

export default createAppContainer(createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    App: MainTabNavigator,
    Auth: AuthStack
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

// Main: MainTabNavigator,