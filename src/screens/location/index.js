import React, {Component} from "react";
import {ImageBackground, View, StatusBar} from "react-native";
import {Container, Button, H2, H3, Text, FooterTab, Icon, Footer, Header, Left, Body, Title, Right} from "native-base";
import {Localization} from 'expo-localization';
import i18n from 'i18n-js';
import styles from "./styles";

const uschat_picture = require("../../../assets/images/us_chat2/us_chat2.jpeg");

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
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="menu"/>
            </Button>
          </Left>
          <Body>
          <Title>Informacion</Title>
          </Body>
          <Right/>
        </Header>
            <View style={{marginLeft:12, marginRight:12, marginTop:30, marginBottom:30}}>
            <Text style={{textAlign:"center"}}>-Aqui, te querés casar conmigo?</Text>
            <Text style={{textAlign:"center"}}>-Claro que siii, Cami! Cuando?</Text>
            <Text style={{textAlign:"center"}}>-Que tal el 19 de Octubre, haremos una ceremonia en la Estacia la Linda a las 4pm. Después vamos a cenar, cantar y bailar hasta las 2am! Que te parece?</Text>
            <Text style={{textAlign:"center"}}>-Me parece genial! :D</Text>
         </View>
         <View style={styles.pictureContainer}>
            <ImageBackground source={uschat_picture} style={styles.picture}/>
        </View>
        <Footer>
          <FooterTab>
            <Button active={this.state.photos} onPress={() => this.props.navigation.navigate("LocationPhoto")}>
            <Icon active={this.state.photos} name="map"/>
            </Button>
            <Button active={this.state.description} onPress={() => this.props.navigation.navigate("Location")}>
            <Icon active={this.state.description} name="apps"/>
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
