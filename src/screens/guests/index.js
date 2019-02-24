import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Toast,
  Button, Icon, Title,
  Spinner
} from 'native-base';
import {AsyncStorage, ScrollView} from "react-native";
import Person from "../rsvp/group";
import Guest from "./guest";

export default class Guests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updating: false,
    };
  }

  componentDidMount() {
    this.setState({'updating': true});
    AsyncStorage.getItem('userToken').then((userToken) => {
      this.setState({'userToken': userToken})
    }).then(() => {
        this._fetchGuests();
      }
    ).then(() => {
      this.setState({'updating': false});
    });

  };

  _fetchGuests() {
    fetch('https://test.camiyaqui.com/api/guests/', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token a10772b41d52d1f8c4bebd350da879ffdadd9a16'
      }
    }).then((response) => response.json())
      .then((response) => {
        this.setState({'guests': response});
      }).catch((error) => {
        Toast.show({
          text: "Hubo un problema serio",
          buttonText: "Okay",
          type: "danger",
          duration: 10000
        });
      }
    );
  };

  renderGuests() {
    if (this.state.guests) {
      return this.state.guests.map((guest_data) => {
        return (<Guest key={guest_data.pk} person_data={guest_data}/>)
      })
    }
    console.log('No Guests');
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
          <Title>Lista de Invitados</Title>
          </Body>
        </Header>
        <Content>
            <List>
              {this.renderGuests()}
              {this.state.updating && <Spinner/>}
            </List>
        </Content>
      </Container>
    );
  }
}
