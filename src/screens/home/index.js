import React, {Component} from "react";
import {ImageBackground, View, StatusBar, AsyncStorage} from "react-native";
import {Container, Button, H3, Text} from "native-base";
import {Notifications, Permissions} from "expo";

import styles from "./styles";

const launchscreenLogo = require("../../../assets/logo-camiyaqui.png");

import { Localization } from 'expo-localization';
import i18n from 'i18n-js';

const es = {
  date: '19 de Octubre de 2019',
  place: 'Buenos Aires, Argentina',
  start: 'Comienza',
  intro_text: 'Bienvenido a nuestra Aplicación! Desde aquí podrás confirmar tu presencia, mandarnos mensajes, actualizar to información de contacto y mucho más!'
};
const en = {
  date: 'October 19th, 2019',
  place: 'Buenos Aires, Argentina',
  start: 'Start',
  intro_text: 'Welcome to our wedding app! From here you will be able to confirm your assistance, send us messages, ' +
    'update your contact information and much more!'
};

i18n.fallbacks = true;
i18n.translations = { en, es };
i18n.locale = Localization.locale;

const PUSH_ENDPOINT = 'https://test.camiyaqui.com/api/push-token';


async function registerForPushNotificationsAsync(userToken) {
  const {status: existingStatus} = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;
  console.log('Setting up permissions');
  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  return fetch(PUSH_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + userToken
    },
    body: JSON.stringify({
      token: token,
    }),
  }).then((response) => {
    console.log(response.status);
  });
}

class Home extends Component {
  state = {
    notification: {}
  };

  componentDidMount() {
    AsyncStorage.getItem('userToken')
      .then((userToken) => {
        this.setState({'userToken': userToken});
        registerForPushNotificationsAsync(userToken);
      }).then(() => {
      this._notificationSubscription = Notifications.addListener(this._handleNotification);
    });
  }

  _handleNotification = (notification) => {
    this.setState({notification: notification});
  };

  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content"/>
        <View style={styles.logoContainer}>
          <ImageBackground source={launchscreenLogo} style={styles.logo}/>
        </View>
        <View>
          <Text>Bienvenido a nuestra Aplicación! Desde aquí podrás confirmar tu presencia, mandarnos mensajes, actualizar to información de contacto y mucho más!</Text>
        </View>
        <View
          style={{
            alignItems: "center",
            marginBottom: 50,
            backgroundColor: "transparent"
          }}
        >
          <H3 style={styles.text}>19 de Octubre de 2019</H3>
          <View style={{marginTop: 8}}/>
          <H3 style={styles.text}>Buenos Aires, Argentina</H3>
          <View style={{marginTop: 8}}/>
        </View>
        <View style={{marginBottom: 80}}>
          <Button
            style={{backgroundColor: "#6FAF98", alignSelf: "center"}}
            onPress={() => this.props.navigation.openDrawer()}
          >
            <Text>Comienza!</Text>
          </Button>
        </View>
      </Container>
    );
  }
}

export default Home;
