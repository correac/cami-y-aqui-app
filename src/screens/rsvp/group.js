import React from 'react';
import {
  Container,
  View, H2, Label,
  Text, Header, Left, Button, Icon, Body, Title, FooterTab, Footer, Content,
  Form, Item, Input, CheckBox, ListItem, Toast, Spinner
} from "native-base";
import {
  AsyncStorage,
  TouchableOpacity
} from 'react-native';

import Person from "./person";
import styles from "./styles";

export default class Group extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updating: false,
    };
  }

  componentWillMount() {
    this.setState({'updating': true});
    AsyncStorage.getItem('userToken').
      then((userToken) =>
      {
        this.setState({'userToken': userToken})
      }).then(()=>{
        this._fetchGroup();
      }
    );
    this.setState({'updating': false});
    };

    _fetchGroup() {
      fetch('https://test.camiyaqui.com/api/group/' + this.state.userToken, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Token a10772b41d52d1f8c4bebd350da879ffdadd9a16'
        }
      }).then((response) => response.json())
        .then((response) => {
          this.setState({'group': response});
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

  renderPersons(){
    if (this.state.group){
      return this.state.group.map((person_data) => {
        return (<Person person_data={person_data} />)
      })
    }
    console.log('No people in the group');
  }

  render() {
    return (
      <Container>
        <Content padder>
          <H2>Tu Grupo</H2>
          <Text>Esta es la lista de personas que vienen con vos. Podés confirmar si vienen, si son niñ@s menores de 12 y
            agregar otros.
          </Text>
          {this.state.updating && <Spinner />}
          {!this.state.updating && this.renderPersons()}
        </Content>
        <TouchableOpacity onPress={() => {
          this.props.navigation.navigate("AddGuest")
        }} style={styles.fab}>
          <Icon name="person-add"/>
        </TouchableOpacity>
      </Container>
    );
  }

}

// onPress={() => this.props.navigation.navigate("AddGuest")} style={styles.fab}
// style={styles.fabIcon}
