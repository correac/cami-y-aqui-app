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

export default class Profile extends React.Component {
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

  componentDidMount(){
    this.setState({'updating': true});
    AsyncStorage.getItem('userToken').
    then((userToken) => {
      this.setState({'userToken': userToken});
      fetch('https://test.camiyaqui.com/api/profile', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + userToken,
        }
      }).then((response) => response.json())
        .then((response) => {
          console.log(response);
          this.setState({
            "first_name": response.first_name,
            "last_name": response.last_name,
            "email": response.email,
            "phone": response.profile.phone,
            "is_attending": response.profile.is_attending,
            "has_car": response.profile.has_car,
            "dietary_restrictions": response.profile.dietary_restrictions,
            "comes_from": response.profile.comes_from,
          });
        });

    }).then(()=>{
      this.setState({'updating': false})
    })
  }

  _updateProfile = async () => {
    this.setState({'updating': true});
    const data = JSON.stringify({
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      profile: {
        nickname: this.state.nickname,
        phone: this.state.phone,
        is_attending: this.state.is_attending,
        comes_from: this.state.comes_from,
        dietary_restrictions: this.state.dietary_restrictions,
        has_car: this.state.has_car,
      }
    });
    console.log(data);
    fetch('https://test.camiyaqui.com/api/profile', {
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
        console.log(response);
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
          <Title>Tu Perfil</Title>
          </Body>
        </Header>
        <Content padder>
          {this.state.updating && <Spinner />}
          <Form>
            <Item floatingLabel>
              <Label>Apodo:</Label>
              <Input
                onChangeText={(text) => this.setState({'nickname': text})}
                value = {this.state.nickname}
              />
            </Item>
            <Item floatingLabel>
              <Label>Nombre:</Label>
              <Input
                onChangeText={(text) => this.setState({'first_name': text})}
                value = {this.state.first_name}
              />
            </Item>
            <Item floatingLabel>
              <Label>Apellido:</Label>
              <Input
                onChangeText={(text) => this.setState({'last_name': text})}
                value = {this.state.last_name}
              />
            </Item>
            <Item floatingLabel>
              <Label>E-Mail:</Label>
              <Input
                onChangeText={(text) => this.setState({'email': text})}
                value = {this.state.email}
              />
            </Item>
            <Item floatingLabel>
              <Label>Teléfono:</Label>
              <Input
                onChangeText={(text) => this.setState({'phone': text})}
                value = {this.state.phone}
              />
            </Item>
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
            <Item floatingLabel>
              <Label>Restricciones en la dieta?</Label>
              <Input
                onChangeText={(text) => this.setState({'dietary_restrictions': text})}
                value = {this.state.dietary_restrictions}
              />
            </Item>
            <Item floatingLabel>
              <Label>Desde dónde venís:</Label>
              <Input
                onChangeText={(text) => this.setState({'comes_from': text})}
                value = {this.state.comes_from}
              />
            </Item>
            <Button full onPress={this._updateProfile}><Text>Actualizar</Text></Button>
            {this.state.updating && <Spinner />}
          </Form>
        </Content>
      </Container>
    );
  }
};
