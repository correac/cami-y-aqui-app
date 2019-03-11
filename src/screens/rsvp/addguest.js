import React from 'react';
import {
  Container,
  View, H2, Label,
  Text, Header, Left, Button, Icon, Body, Title, FooterTab, Footer, Content,
  Form, Item, Input, CheckBox, ListItem, Toast
} from "native-base";
import {AsyncStorage} from "react-native";

export default class addGuest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_attending: false,
    };
  }

  toggleAttending() {
    this.setState({
      is_attending: !this.state.is_attending
    });
  }

  componentWillMount(){
    AsyncStorage.getItem('userToken').
    then((userToken) => {
      this.setState({'userToken': userToken});
  });
  };

  _submitNewGuest = async () => {
    this.setState({'updating': true});
    const data = JSON.stringify({
      is_attending: this.state.is_attending,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
    });
    console.log(data);
    fetch('https://test.camiyaqui.com/api/new-guest', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token '+this.state.userToken
      },
      body: data,
    }).then((response) => {
      if(response.status===200){
        Toast.show({
          text: "Invitado agregado",
          buttonText: "Okay",
          type: "success",
          duration: 10000
        });
        this.setState({'email': '', 'first_name': '', 'last_name': ''});
      } else {
        Toast.show({
          text: "Hubo un problema",
          buttonText: "Okay",
          type: "warning",
          duration: 10000
        });
      }
    }).catch((error) => {
      Toast.show({
        text: "Hubo un problema serio",
        buttonText: "Okay",
        type: "danger",
        duration: 10000
      });
      console.log(error);
    })
  };
  render() {
    return (
      <Container>
        <Content padder>
          <H2>Agrega a tu pareja o hijos</H2>
          <Text>Si tu pareja o hijos vienen, por favor agrégalos aquí. El nombre es el único campo obligatorio, si
            es un adulto al que le gustaría usar esta app, por favor incluí el e-mail también.
          </Text>
          <Form>
            <Item floatingLabel>
              <Label>Nombre:</Label>
              <Input
                onChangeText={(text) => this.setState({'first_name': text})}
                value={this.state.first_name}
              />
            </Item>
            <Item floatingLabel>
              <Label>Apellido:</Label>
              <Input
                onChangeText={(text) => this.setState({'last_name': text})}
                value={this.state.last_name}
              />
            </Item>
            <Item floatingLabel>
              <Label>Email:</Label>
              <Input
                onChangeText={(text) => this.setState({'email': text})}
                value={this.state.email}
              />
            </Item>
            <ListItem button onPress={() => this.toggleAttending()}>
              <CheckBox
                color="red"
                checked={this.state.is_attending}
                onPress={() => this.toggleAttending()}
              />
              <Body>
              <Text>Viene?</Text>
              </Body>
            </ListItem>
            <Button style={{marginTop:20, backgroundColor: "#6FAF98", alignSelf: "center"}} onPress={this._submitNewGuest}>
              <Text>Agregar</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }

}
