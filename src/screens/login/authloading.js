import React from 'react';
import {
  AsyncStorage,
  View,
} from 'react-native';

import {
  Container, Spinner,
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

    fetch('https://test.camiyaqui.com/api/token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token a10772b41d52d1f8c4bebd350da879ffdadd9a16'
      },
      body: JSON.stringify({
        secret_code: userToken,
      }),
    }).then((response) => {
      const statusCode = response.status;
      if (statusCode === 200){
        console.log('Valid User Token');
        this.props.navigation.navigate('App')
      }
      else {
        console.log('Invalid User Token');
        this.props.navigation.navigate('Auth')
      }
      }).catch((error) => {
      console.log(error)
    });

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
          <Text>Verifying your credentials</Text>
          <Spinner />
        </View>
      </Container>
    );
  }
}
