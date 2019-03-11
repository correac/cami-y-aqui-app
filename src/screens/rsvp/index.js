import React from 'react';
import {
  Container,
  View, H2, Label,
  Text, Header, Left, Button, Icon, Body, Title, FooterTab, Footer, Content,
  Form, Item, Input, CheckBox, ListItem, Spinner, Toast
} from "native-base";
import {AsyncStorage, Platform} from 'react-native'
const fontAwesome = {
  iconFamily: 'FontAwesome',
  iconFontSize: (Platform.OS === 'ios' ) ? 30 : 28,
  iconMargin: 7,
  iconLineHeight: (Platform.OS === 'ios' ) ? 37 : 30,
};

export default class Rsvp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updating: false,
    };
  }

  toggleAttending() {
    this.setState({
      is_attending: !this.state.is_attending
    });
  }

  toggleCar() {
    this.setState({
      has_car: !this.state.has_car
    });
  }

  componentWillMount(){
    this.setState({'updating': true});
    AsyncStorage.getItem('userToken').
    then((userToken) => {
      this.setState({'userToken': userToken});
      console.log('https://test.camiyaqui.com/api/guest-rsvp');
      fetch('https://test.camiyaqui.com/api/guest-rsvp', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Token '+userToken
        }
      }).then((response) => response.json())
        .then((response) => {
        console.log(response);
        this.setState(response);
      });
    });
    this.setState({'updating': false});
  }

  _updateRsvp = async () => {
    this.setState({'updating': true});
    const data = JSON.stringify({
      is_attending: this.state.is_attending,
      comes_from: this.state.comes_from,
      dietary_restrictions: this.state.dietary_restrictions,
      has_car: this.state.has_car,
    });
    console.log(data);
    fetch('https://test.camiyaqui.com/api/guest-rsvp', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token '+this.state.userToken
      },
      body: data,
    }).then((response) => {
      if(response.status === 200){
        Toast.show({
          text: "Datos actualizados",
          buttonText: "Okay",
          type: "success",
          duration: 10000
        });
      } else {
        Toast.show({
          text: "Hubo un problema",
          buttonText: "Okay",
          type: "warning",
          duration: 10000
        });
      }
    }).catch((error)=>{
      Toast.show({
        text: "Hubo un problema serio",
        buttonText: "Okay",
        type: "danger",
        duration: 10000
      });
      console.log(error);
    });
    this.setState({'updating': false})
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
          <Title>Confirma tu asistencia</Title>
          </Body>
        </Header>

        <Content padder>
          <H2>Acá podrás confirmar tu asistencia</H2>
          <Text>Lo más importante es saber que podremos contar con vos en este día tan especial, pero también vamos a
            usar este espacio para confirmar detalles de tu dieta, etc.
          </Text>
          <Form style={{margiTop: 5}}>
            <ListItem button onPress={() => this.toggleAttending()}>
              <CheckBox
                color="red"
                checked={this.state.is_attending}
                onPress={() => this.toggleAttending()}
              />
              <Body>
              <Text>Venís?</Text>
              </Body>
            </ListItem>
            {this.state.is_attending &&
            <Form>
              <Item floatingLabel>
                <Label>Desde dónde venís:</Label>
                <Input
                  onChangeText={(text) => this.setState({'comes_from': text})}
                  value = {this.state.comes_from}
                />
              </Item>
              <Item floatingLabel>
                <Label>Restricciones en la dieta?</Label>
                <Input
                  onChangeText={(text) => this.setState({'dietary_restrictions': text})}
                  value = {this.state.dietary_restrictions}
                />
              </Item>
              <ListItem button onPress={() => this.toggleCar()}>
                <CheckBox
                  color="red"
                  checked={this.state.has_car}
                  onPress={() => this.toggleCar()}
                />
                <Body>
                <Text>Tenés auto?</Text>
                </Body>
              </ListItem>
            </Form>
            }
            <Button style={{marginTop:20, backgroundColor: "#6FAF98", alignSelf: "center"}} onPress={this._updateRsvp}><Text>Actualizar</Text></Button>
            {this.state.updating && <Spinner />}
          </Form>
        </Content>
        <Footer>
          <FooterTab>
            <Button onPress={() => this.props.navigation.navigate("Group")}>
              <Icon name="people"/>
            </Button>
            <Button active={true} onPress={() => this.props.navigation.navigate("Rsvp")}>
              <Icon type="FontAwesome" name='address-card' />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
