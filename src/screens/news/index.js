import React, {Component} from "react";
import {StyleSheet, ImageBackground, View, StatusBar} from "react-native";
import {Container, Button, H2, H3, Text, FooterTab, Icon, Footer, Header, Left, Body, Title, Right} from "native-base";
import {Localization} from 'expo-localization';
import i18n from 'i18n-js';

const styles = StyleSheet.create({
     containerStyle: {
     borderWidth: 1,
     borderRadius: 10,
     borderColor: '#ddd',
     borderBottomWidth: 0,
     shadowColor: '#000',
     shadowOffset: { width: 0, height: 20 },
     shadowOpacity: 0.8,
     shadowRadius: 2,
     elevation: 1,
     marginLeft: 5,
     marginRight: 5,
     marginTop: 10,
     }
     })

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: true,
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
                 <Title>Novedades</Title>
               </Body>
               <Right/>
            </Header>
            <View
                style={{backgroundColor: "#6FAF98", marginTop:20, marginLeft:10, marginRight:10}}>
                <Text style={styles.containerStyle} style={{textAlign:"center", color: "#FFFFFF"}}>En esta sección postearemos las últimas novedades sobre el casamiento, logística de transporte, noche de pre-boda y mucho más!</Text>
            </View>
        </Container>
        );
    }
}

export default News;
