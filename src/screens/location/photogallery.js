import React, {Component} from "react";
import {ImageBackground, Image, View, ScrollView} from "react-native";
import {Container, Button, Grid, FooterTab, Icon, Footer, Row, Text, H2, H3} from "native-base";
import {Localization} from 'expo-localization';
import i18n from 'i18n-js';
import styles from "./styles";

const location_picture = require("../../../assets/images/Estancia_La_linda.jpg");
import {en, es} from "./content"


i18n.fallbacks = true;
i18n.translations = {es, en};
i18n.locale = Localization.locale;

class photogallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: true,
      description: false,
      maptab: false,
    };
  }

  render() {
    return (
      <Container>
        <ScrollView style={styles.photoGalleryContainer}>
        <View style={{marginTop: 0}}>
              <ImageBackground source={location_picture} style={styles.logo}/>
        </View>
        <View style={{
          alignItems: "center",
          marginTop: 170,
          backgroundColor: "transparent"
        }}>
        <H2 style={styles.text}>Estancia La Linda</H2>
         <View style={{marginBottom: -20}}/>
            <View style={{padding: 20, textAlign:"center"}}>
          <H3 style={styles.text}>Manuel Luis de Oliden 4651, B1664 Tortuguitas,
            Buenos Aires, Argentina</H3>
          <View style={{marginTop: 8, marginLeft:12, marginRight:12}}>
          <Text style={{textAlign:"center"}}>La estancia se encuentra a 40km de Buenos Aires. En auto el viaje es de aproximadamente 45
            minutos.</Text>
          <Text style={{textAlign:"center"}}>Si no tenes auto avisanos en tu perfil, vamos a organizar combis que partan y regresen al barrio de Palermo. </Text>
          </View>
        </View>
    </View>
        <View
          style={{
          alignItems: "center",
          padding: 34,
          backgroundColor: "transparent"
            }}>
          <H2 style={styles.text}>Fotos de La Linda</H2>
        </View>
          <Grid>
            <Row size={1}>
              <View style={styles.photoGallery}>
                <Image source={require("../../../assets/images/lalinda/gal002.jpg")} style={styles.photo}/>
              </View>
            </Row>
            <Row size={1}>
              <View style={styles.photoGallery}>
                <Image source={require("../../../assets/images/lalinda/gal004.jpg")} style={styles.photo}/>
              </View>
            </Row>
            <Row size={1}>
              <View style={styles.photoGallery}>
                <Image source={require("../../../assets/images/lalinda/gal006.jpg")} style={styles.photo}/>
              </View>
            </Row>
            <Row size={1}>
              <View style={styles.photoGallery}>
                <Image source={require("../../../assets/images/lalinda/gal011.jpg")} style={styles.photo}/>
              </View>
            </Row>
            <Row size={1}>
              <View style={styles.photoGallery}>
                <Image source={require("../../../assets/images/lalinda/gal012.jpg")} style={styles.photo}/>
              </View>
            </Row>
            <Row size={1}>
              <View style={styles.photoGallery}>
                <Image source={require("../../../assets/images/lalinda/gal068.jpg")} style={styles.photo}/>
              </View>
            </Row>
          </Grid>
        </ScrollView>
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

export default photogallery;
