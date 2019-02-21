import React, {Component} from "react";
import {Container, Button, H1, H3, Text, Input, InputGroup, Toast} from "native-base";
import {Localization} from 'expo-localization';
import i18n from 'i18n-js';
import styles from "./styles";

const launchscreenLogo = require("../../../assets/logo-camiyaqui.png");
import {en, es} from "./content"


i18n.fallbacks = true;
i18n.translations = {es, en};
i18n.locale = Localization.locale;

class Contact extends Component {

  render() {
    return (
      <Container>
        <View style={styles.title}>
          <H1>Contacto</H1>
        </View>
        <View style={styles.messageContainer}>
          <InputGroup borderType="regular">
            <Input
              placeholder={"Tu mensaje"}
              onChangeText={(text) => this.setState({message: text})}
            />
          </InputGroup>
          <Button primary> Enviar </Button>
        </View>
      </Container>
    );
  }

  _handle_message_submit = () => {
    Toast.show({
      text: "Mensaje enviado con éxito!",
      textStyle: { color: "yellow" },
      buttonText: "Okay"
    })
  }


}

export default Contact;
