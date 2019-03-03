import {Body, Left, ListItem, Right, Text, Thumbnail, Icon} from "native-base";
import React from "react";


export default class Guest extends React.Component {
  constructor(props) {
    super(props);
    this.key = props.person_data.pk;
    this.state = props.person_data;
    console.log(props.person_data);
  }

  render(){
    return(
      <ListItem avatar>
        <Left>
          <Thumbnail source={require('../../../assets/images/girl_r.png')} style={{height: 30, width: 30}}/>
        </Left>
        <Body>
        <Text>{this.state.first_name} {this.state.last_name}</Text>
        <Text note>Viene de: {this.state.comes_from}</Text>
        </Body>
        <Right>
          {this.state.is_attending && <Icon type="FontAwesome" name='check' style={{color: '#00FF00'}}/>}
          {!this.state.is_attending && <Icon type="FontAwesome" name='times' style={{color: '#FF0000'}} />}
        </Right>
      </ListItem>
    );
  }
}
