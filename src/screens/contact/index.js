import React, {Component} from "react";
import {
  Container,
  Content,
  View,
  Button,
  Input,
  InputGroup,
  Toast,
  Text,
  Left,
  Icon,
  Body,
  Title,
  Right,
  Header
} from "native-base";
import {Localization} from 'expo-localization';
import i18n from 'i18n-js';
import styles from "./styles";
import HeaderApp from "../header";
import {AsyncStorage} from "react-native";


import API_KEY from "../../../constants";


// i18n.fallbacks = true;
// i18n.translations = {es, en};
// i18n.locale = Localization.locale;

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }
  componentWillMount(){
    AsyncStorage.getItem('userToken').
    then((userToken) => {
      this.setState({'userToken': userToken});
    });
  }

  _sendMessage = async () => {
    const data = JSON.stringify({'message': this.state.message});
    fetch('https://test.camiyaqui.com/api/message/'+this.state.userToken, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': API_KEY
      },
      body: data,
    }).then((response) => {
      if (response.status === 200){
        Toast.show({
          text: "Mensaje enviado con éxito!",
          textStyle: {color: "yellow"},
          buttonText: "Okay"
        });
        this.setState({'message': ''})
      } else {
        Toast.show({
          text: "Hubo un problema",
          buttonText: "Okay",
          type: "warning",
          duration: 10000
        });
      }
    }).catch((error) => {
      console.log(error);
      Toast.show({
        text: "Hubo un problema serio",
        buttonText: "Okay",
        type: "danger",
        duration: 10000
      });
    })
  };

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
          <Title>Contacto</Title>
          </Body>
        </Header>

        <Content padder>
        <Text>Cualquier duda o cosa que nos quieras decir, lo podés hacer mandándonos un mensaje.</Text>
        <View style={styles.messageContainer}>
          <InputGroup borderType="regular">
            <Input
              placeholder={"Tu mensaje"}
              onChangeText={(text) => this.setState({message: text})}
              multiline={true}
              value={this.state.message}
            />
          </InputGroup>
          <Button primary onPress={this._sendMessage}><Text>Enviar</Text></Button>
        </View>
        </Content>
      </Container>
    );
  }

}

export default Contact;
