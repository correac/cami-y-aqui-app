import React from 'react';
import {
  Container,
  View, H2, Label,
  Text, Header, Left, Button, Icon, Body, Title, FooterTab, Footer, Content,
  Form, Item, Input, CheckBox, ListItem
} from "native-base";
import {
  TouchableOpacity
} from 'react-native';

import Person from "./person";



import styles from "./styles";

export default class Group extends React.Component{
  render() {
    return(
      <Container>
        <Content padder>
          <H2>Tu Grupo</H2>
          <Text>Esta es la lista de personas que vienen con vos. Podés confirmar si vienen, si son niñ@s menores de 12 y
            agregar otros.
          </Text>
          <Person
            person_id={1}
            name="Aquiles"
            is_attending={false}
            is_child={false}
            diet=""
          />
          <Person
            person_id={1}
            name="Aquiles"
            is_attending={false}
            is_child={false}
            diet=""
          />
          <Person
            person_id={1}
            name="Aquiles"
            is_attending={false}
            is_child={false}
            diet=""
          />
          <Person
            person_id={1}
            name="Aquiles"
            is_attending={false}
            is_child={false}
            diet=""
          />
        </Content>
        <TouchableOpacity onPress={()=>{this.props.navigation.navigate("AddGuest")}} style={styles.fab}>
          <Icon name="person-add"/>
        </TouchableOpacity>
      </Container>
    );
  }

}

// onPress={() => this.props.navigation.navigate("AddGuest")} style={styles.fab}
// style={styles.fabIcon}
