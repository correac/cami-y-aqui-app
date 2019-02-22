import React from 'react';
import {
  Container,
  View, H2, Label,
  Text, Header, Left, Button, Icon, Body, Title, FooterTab, Footer, Content,
  Form, Item, Input, CheckBox, ListItem, CardItem, Card
} from "native-base";

import styles from './styles';

export default class Person extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      person_id: props.person_id,
      person_name: props.name,
      is_attending: props.is_attending,
      is_child: props.is_child,
      diet: props.diet,
    }
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

  render() {
    return (
      <Card style={styles.mb}>
        <CardItem header>
          <Text>{this.state.person_name}</Text>
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
              <Input onChangeText={(text) => this.setState({'diet': text})}/>
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
            <Button full><Text>Actualizar</Text></Button>
          </Form>
          </Body>
        </CardItem>
      </Card>
    )
      ;
  }
}
