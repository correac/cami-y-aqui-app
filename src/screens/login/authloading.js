import React from 'react';
import {
  AsyncStorage,
  View,
} from 'react-native';

import {
  Container,
  Text
} from "native-base";


export default class AuthLoading extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    // this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    this.props.navigation.navigate('Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <Container>
        <View>
          <Text>Loading...</Text>
        </View>
      </Container>
    );
  }
}
