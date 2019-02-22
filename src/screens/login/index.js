import React from 'react';
import {
  AsyncStorage,
  View,
  Text,
  LayoutAnimation,
  TouchableOpacity,
  Image
} from 'react-native';

import {
  H2,
  H3,
  Input,
  Button,
  Container, Form, Item, Content, Toast,
} from 'native-base';

const FORM_STATES = {
  LOGIN: 0,
  REGISTER: 1,
};

import styles from "./style"

export default class Login extends React.Component {
  state = {
    // Current visible form
    formState: FORM_STATES.LOGIN,
  };

  _signInAsync = async () => {
    console.log(this.state.email);
    await AsyncStorage.setItem('userToken', 'abc');
    if (this.state.formState === FORM_STATES.REGISTER) {
      Toast.show({
        text: "Gracias por registrarte. Cuando revisemos la aplicación te haremos saber.",
        buttonText: "Okay",
        type: "success",
        duration: 10000
      });
      return
    }

    this.props.navigation.navigate('App');
  };

  render() {
    const isRegister = this.state.formState === FORM_STATES.REGISTER;

    return (
      <Container>
        <Content padder>
          <View style={[styles.section, {paddingTop: 30, paddingLeft: 15, paddingRight: 15}]}>
            <Image
              resizeMode="contain"
              style={styles.logo}
              source={require('../../../assets/logo-camiyaqui.png')}
            />
          </View>


          <Text style={{marginBottom: 10}}>
            Por favor ingresa con el mismo e-mail que usamos para comunicarnos con vos.
          </Text>
          <Form>
            <Item>
              <Input
                placeholder="Email"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={(text) => this.setState({'email': text})}
              />
            </Item>
            {this.state.formState === FORM_STATES.REGISTER &&
            <Item>
              <Input
                placeholder="Nombre"
                autoCapitalize="words"
                autoCorrect={false}
                keyboardType="default"
                onChangeText={(text) => this.setState({'name': text})}
              />
            </Item>
            }
            <View style={{marginTop: 5, alignItems: 'center', justifyContent: 'center'}}>
              <Button full primary onPress={this._signInAsync} style={{padding: 5}}>
                <Text>{this.state.formState === FORM_STATES.LOGIN ? 'Login' : 'Registrarse'}</Text>
              </Button>
            </View>
          </Form>

          <View style={[styles.section, {marginTop: 15}]}>
            <H2 style={{
              color: "#7fbcff",
            }}>{isRegister ? 'Ya estás registrado?' : 'Aún no estás registrado?'}</H2>
            <TouchableOpacity
              onPress={() => {
                LayoutAnimation.spring();
                this.setState({formState: isRegister ? FORM_STATES.LOGIN : FORM_STATES.REGISTER});
              }}
              // style={{paddingTop: 30, flexDirection: 'row'}}
            >
              <H3 style={{
                color: "#7fbcff",
                marginLeft: 5
              }}>{isRegister ? 'Login' : 'Registrarse'}</H3>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    );
  }
}
