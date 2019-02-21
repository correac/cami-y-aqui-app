import React, {Component} from "react";
import {ImageBackground, View, StatusBar} from "react-native";
import {Container, Button, H2, H3, Text, FooterTab, Icon, Footer} from "native-base";
import {Localization} from 'expo-localization';
import i18n from 'i18n-js';
import styles from "./styles";

const location_picture = require("../../../assets/images/Estancia_La_linda.jpg");
import {en, es} from "./content"


i18n.fallbacks = true;
i18n.translations = {es, en};
i18n.locale = Localization.locale;

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: false,
      description: true,
      maptab: false,
    };
  }

  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content"/>
        <View style={styles.logoContainer}>
          <ImageBackground source={location_picture} style={styles.logo}/>
        </View>
        <View
          style={{
            alignItems: "center",
            marginBottom: 50,
            backgroundColor: "transparent"
          }}
        >
          <H2 style={styles.text}>Estancia La Linda</H2>
          <View style={{marginTop: 8}}/>
          <View style={{padding: 16}}>
            <H3 style={styles.text}>Manuel Luis de Oliden 4651, B1664 Tortuguitas,
              Buenos Aires, Argentina</H3>
            <View style={{marginTop: 8}}>
              <Text>La estancia se encuentra a 40km de Buenos Aires. En auto el viaje es de aproximadamente 45
                minutos.</Text>
              <Text>Para los que no tengan auto, vamos a organizar combis que parten y regresan al barrio de
                Palermo. </Text>
            </View>
          </View>
        </View>
        <Footer>
          <FooterTab>
            <Button active={this.state.photos} onPress={() => this.props.navigation.navigate("LocationPhoto")}>
              <Icon active={this.state.photos} name="apps"/>
            </Button>
            <Button active={this.state.description} onPress={() => this.props.navigation.navigate("Location")}>
              <Icon active={this.state.description} name="camera"/>
            </Button>
            <Button active={this.state.maptab} onPress={() => this.props.navigation.navigate("LocationMap")}>
              <Icon active={this.state.maptab} name="compass"/>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default Location;
