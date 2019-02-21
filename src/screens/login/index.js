import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  View,
  Text,
  Animated,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  LayoutAnimation,
  TouchableOpacity,
} from 'react-native';

import {Fonts, Colors} from '../constants';
import {
  Input,
  Button,
  Container
} from 'native-base';

const FORM_STATES = {
  LOGIN: 0,
  REGISTER: 1,
};

export default class Login extends React.Component {
  state = {
    anim: new Animated.Value(0),

    // Current visible form
    formState: FORM_STATES.LOGIN,
    isKeyboardVisible: false,
  };

  _signInAsync = async () => {
    console.log(this.state.email);
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('Drawer');
  };

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(Platform.select({
      android: 'keyboardDidShow',
      ios: 'keyboardWillShow'
    }), this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener(Platform.select({
      android: 'keyboardDidHide',
      ios: 'keyboardWillHide'
    }), this._keyboardDidHide.bind(this));
  }

  componentDidMount() {
    Animated.timing(this.state.anim, {toValue: 3000, duration: 3000}).start();
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow() {
    LayoutAnimation.easeInEaseOut();
    this.setState({isKeyboardVisible: true});
  }

  _keyboardDidHide() {
    LayoutAnimation.easeInEaseOut();
    this.setState({isKeyboardVisible: false});
  }

  fadeIn(delay, from = 0) {
    const {anim} = this.state;
    return {
      opacity: anim.interpolate({
        inputRange: [delay, Math.min(delay + 500, 3000)],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
      transform: [{
        translateY: anim.interpolate({
          inputRange: [delay, Math.min(delay + 500, 3000)],
          outputRange: [from, 0],
          extrapolate: 'clamp',
        }),
      }],
    };
  }

  render() {
    const TopComponent = Platform.select({ios: KeyboardAvoidingView, android: View});
    const isRegister = this.state.formState === FORM_STATES.REGISTER;

    return (
      <Container>
        {/*<ImageBackground*/}
        {/*source={require('../assets/images/splashscreen.png')}*/}
        {/*style={styles.backgroundImage}*/}
        {/*resizeMode="cover"*/}
        {/*>*/}

        <View style={[styles.section, {paddingTop: 30, paddingLeft: 15, paddingRight: 15}]}>
          <Animated.Image
            resizeMode="contain"
            style={[styles.logo, this.state.isKeyboardVisible && {height: 90}, this.fadeIn(0)]}
            source={require('../../assets/images/logo-camiyaqui.png')}
          />
        </View>

        <Animated.View style={[styles.section, styles.middle, this.fadeIn(700, -20)]}>
          <Input
            placeholder="Email"
            style={styles.textInput}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            onChangeText={(text) => this.setState({'email': text})}
          />

          {this.state.formState === FORM_STATES.REGISTER &&
          <Input
            placeholder="YNombre"
            style={styles.textInput}
            autoCapitalize="words"
            autoCorrect={false}
            keyboardType="default"
          />
          }

          <Animated.View style={[styles.section, styles.bottom, this.fadeIn(700, -20)]}>
            <Button
              secondary
              rounded
              style={{alignSelf: 'stretch', marginBottom: 10}}
              caption={this.state.formState === FORM_STATES.LOGIN ? 'Login' : 'Register'}
              onPress={this._signInAsync}
            />


            {!this.state.isKeyboardVisible && (
              <TouchableOpacity
                onPress={() => {
                  LayoutAnimation.spring();
                  this.setState({formState: isRegister ? FORM_STATES.LOGIN : FORM_STATES.REGISTER});
                }}
                style={{paddingTop: 30, flexDirection: 'row'}}
              >
                <Text style={{
                  color: Colors.white,
                }}>{isRegister ? 'Ya estás registrado?' : 'Aún no estás registrado?'}</Text>
                <Text style={{
                  color: Colors.white,
                  marginLeft: 5
                }}>{isRegister ? 'Login' : 'Registrarse'}</Text>
              </TouchableOpacity>
            )}
          </Animated.View>
        </Animated.View>
      </Container>
    );
  }
}
