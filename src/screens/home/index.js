import React, { Component } from "react";
import { ImageBackground, View, StatusBar } from "react-native";
import { Container, Button, H3, Text } from "native-base";
import { Localization } from 'expo-localization';
import i18n from 'i18n-js';
import styles from "./styles";
const launchscreenLogo = require("../../../assets/logo-camiyaqui.png");
import {en, es} from "./content"


i18n.fallbacks = true;
i18n.translations = { es, en };
i18n.locale = Localization.locale;

class Home extends Component {
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
