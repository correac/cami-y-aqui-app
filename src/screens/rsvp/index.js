import React from 'react';
import {
  Container,
  View, H2, Label,
  Text, Header, Left, Button, Icon, Body, Title, FooterTab, Footer, Content,
  Form, Item, Input, CheckBox, ListItem
} from "native-base";
import {Platform} from 'react-native'
const fontAwesome = {
  iconFamily: 'FontAwesome',
  iconFontSize: (Platform.OS === 'ios' ) ? 30 : 28,
  iconMargin: 7,
  iconLineHeight: (Platform.OS === 'ios' ) ? 37 : 30,
}

export default class Rsvp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_attending: false,
      has_car: false
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
                <Input onChangeText={(text) => this.setState({'from': text})}/>
              </Item>
              <Item floatingLabel>
                <Label>Restricciones en la dieta?</Label>
                <Input onChangeText={(text) => this.setState({'diet': text})}/>
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
            <Button full><Text>Actualizar</Text></Button>
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
