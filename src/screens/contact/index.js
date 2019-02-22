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

const launchscreenLogo = require("../../../assets/logo-camiyaqui.png");


// i18n.fallbacks = true;
// i18n.translations = {es, en};
// i18n.locale = Localization.locale;

class Contact extends Component {

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
            />
          </InputGroup>
          <Button primary onPress={this._handle_message_submit}><Text>Enviar</Text></Button>
        </View>
        </Content>
      </Container>
    );
  }

  _handle_message_submit = () => {
    Toast.show({
      text: "Mensaje enviado con éxito!",
      textStyle: {color: "yellow"},
      buttonText: "Okay"
    })
  }


}

export default Contact;
