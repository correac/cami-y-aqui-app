import React from 'react';
import {
  View,
  Text
} from 'react-native'

export default class AddGuestScreen extends react.Component {
  static navigationOptions = {
    title: 'Add Guest',
  };

  render() {
    return (
      <View>
        <Text>
          Add new Guest
        </Text>
      </View>
    )
  }
}