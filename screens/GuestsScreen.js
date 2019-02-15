import React from 'react';
import {ScrollView, View, Image, StyleSheet, ActivityIndicator, FlatList, Text} from 'react-native';


export default class GuestsScreen extends React.Component {
  constructor(props) {
  super(props);
  this.state = {isLoading: true};
  }
  componentDidMount() {
    return fetch('https://test.camiyaqui.com/api/guests.json')
      .then((response) => response.json())
      .then((responseJSON) => {
        this.setState({isLoading: false,
        dataSource: responseJSON});
      }, function(){

      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    if (this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator />
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop: 20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item.first_name}</Text>}
          keyExtractor={({id}, index) => id}
          />
      </View>
    );
  }
}