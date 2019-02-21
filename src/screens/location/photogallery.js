import React, {Component} from "react";
import {Image, View, ScrollView} from "react-native";
import {Container, Button, Grid, FooterTab, Icon, Footer, Row, Text, H2} from "native-base";
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
        <View
          style={{
            alignItems: "center",
            // marginBottom: 10,
            padding: 34,
            backgroundColor: "transparent"
          }}
        >
          <H2 style={styles.text}>Fotos de La Linda</H2>
        </View>
        <ScrollView style={styles.photoGalleryContainer}>
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

export default photogallery;
