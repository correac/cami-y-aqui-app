import React from 'react';
import {
  Container,
  View, H2, Label,
  Text, Header, Left, Button, Icon, Body, Title, FooterTab, Footer, Content,
  Form, Item, Input, CheckBox, ListItem
} from "native-base";
import Toast from "../../theme/components/Toast";

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

  _submitGuest() {
    Toast.show({
      text: "Gracias por agregar a un invitado",
      textStyle: {color: "yellow"},
      buttonText: "Okay"
    })
  }
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
              <Input onChangeText={(text) => this.setState({'name': text})}/>
            </Item>
            <Item floatingLabel>
              <Label>Email:</Label>
              <Input onChangeText={(text) => this.setState({'email': text})}/>
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
            <Button full>
              <Text>Agregar</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }

}
