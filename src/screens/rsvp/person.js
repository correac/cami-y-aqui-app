import React from 'react';
import {
  Container,
  View, H2, Label,
  Text, Header, Left, Button, Icon, Body, Title, FooterTab, Footer, Content,
  Form, Item, Input, CheckBox, ListItem, CardItem, Card, Toast
} from "native-base";

import styles from './styles';

export default class Person extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.person_data;
    console.log(props.person_data);
  }

  toggleAttending() {
    this.setState({
      'is_attending': !this.state.is_attending
    })
  }

  toggleChild() {
    this.setState({
      'is_child': !this.state.is_child
    })
  }

  _updateRsvp = async () => {
    this.setState({'updating': true});
    const data = JSON.stringify({
      is_attending: this.state.is_attending,
      dietary_restrictions: this.state.dietary_restrictions,
      is_child: this.state.is_child,
    });
    console.log(data);
    fetch('https://test.camiyaqui.com/api/guest-rsvp/'+this.state.secret_code, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token a10772b41d52d1f8c4bebd350da879ffdadd9a16'
      },
      body: data,
    }).then((response) => {
      if(response.status === 200){
        Toast.show({
          text: "Datos actualizados",
          buttonText: "Okay",
          type: "success",
          duration: 3000
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
      console.log(error)
    });
    this.setState({'updating': false})
  };

  render() {
    return (
      <Card style={styles.mb}>
        <CardItem header>
          <Text>{this.state.name}</Text>
        </CardItem>
        <CardItem>
          <Body>
          <Form style={{alignSelf: "stretch"}}>
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
            <Item floatingLabel>
              <Label>Restricciones en la dieta?</Label>
              <Input
                onChangeText={(text) => this.setState({'dietary_restrictions': text})}
                value={this.state.dietary_restrictions}
              />
            </Item>
            <ListItem button onPress={() => this.toggleChild()}>
              <CheckBox
                color="red"
                checked={this.state.is_child}
                onPress={() => this.toggleChild()}
              />
              <Body>
              <Text>Es niñ@?</Text>
              </Body>
            </ListItem>
            <Button full onPress={this._updateRsvp}><Text>Actualizar</Text></Button>
          </Form>
          </Body>
        </CardItem>
      </Card>
    )
      ;
  }
}
