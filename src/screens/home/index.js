import React, { Component } from "react";
import {ImageBackground, View, StatusBar, AsyncStorage} from "react-native";
import { Container, Button, H3, Text } from "native-base";
import { Localization } from 'expo-localization';
import i18n from 'i18n-js';
import styles from "./styles";
const launchscreenLogo = require("../../../assets/logo-camiyaqui.png");
import {en, es} from "./content"
import {Notifications, Permissions} from "expo";

i18n.fallbacks = true;
i18n.translations = { es, en };
i18n.locale = Localization.locale;

const PUSH_ENDPOINT = 'https://test.camiyaqui.com/api/tokens/';
import API_KEY from "../../../constants";

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
      'Authorization': API_KEY
    },
    body: JSON.stringify({
      token: token,
      user: userToken,
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
    }).then(()=>{
      this._notificationSubscription = Notifications.addListener(this._handleNotification);
    });
    }

  _handleNotification = (notification) => {
    this.setState({notification: notification});
  };

  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" />
          <View style={styles.logoContainer}>
            <ImageBackground source={launchscreenLogo} style={styles.logo} />
          </View>
          <View
            style={{
              alignItems: "center",
              marginBottom: 50,
              backgroundColor: "transparent"
            }}
          >
            <H3 style={styles.text}>{i18n.t('foo')}</H3>
            <View style={{ marginTop: 8 }} />
            <H3 style={styles.text}>NativeBase components</H3>
            <View style={{ marginTop: 8 }} />
          </View>
          <View style={{ marginBottom: 80 }}>
            <Button
              style={{ backgroundColor: "#6FAF98", alignSelf: "center" }}
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Text>Lets Go!</Text>
            </Button>
          </View>
      </Container>
    );
  }
}

export default Home;
