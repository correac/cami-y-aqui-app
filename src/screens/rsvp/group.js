import React from 'react';
import {
  Container,
  H2,
  Text,
  Icon,
  Content,
  Toast,
  Spinner
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

  componentDidMount() {
    this.setState({'updating': true});
    AsyncStorage.getItem('userToken').
      then((userToken) =>
      {
        this.setState({'userToken': userToken})
      }).then(()=>{
        this._fetchGroup();
      }
    ).then(() => {
      this.setState({'updating': false});
    });
    };

    _fetchGroup() {
      this.setState({'updating': true});
      fetch('https://test.camiyaqui.com/api/group', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + this.state.userToken
        }
      }).then((response) => {
        if (response.status === 200){
          return response.json()
        }
      }).then( (data) => {
        console.log(data);
        this.setState({'group': data});
        }
      ).catch((error) => {
          Toast.show({
            text: "Hubo un problema serio",
            buttonText: "Okay",
            type: "danger",
            duration: 10000
          });
        }
      ).then(() => {
        this.setState({'updating': false});
      });
    };

  renderPersons(){
    if (this.state.group){
      return this.state.group.map((person_data) => {
        return (<Person key={person_data.id} person_data={person_data} token={this.state.userToken} />)
      })
    } else {
      console.log('No people in the group');
    }
  }

  render() {
    return (
      <Container>
        <Content padder>
          <H2>Tu Grupo</H2>
          <Text>Esta es la lista de personas que vienen con vos. Podés confirmar si vienen, si son niñ@s menores de 12 y
            agregar a otros.
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
