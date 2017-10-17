import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      status: 'here',
      text: 'placeholder',
    };
  }
  componentDidMount() {

  }
  getTest() {

  }
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.status}</Text>
        <Text>{this.state.text}</Text>
        <Button
          title='Logout'
         />
      </View>
    );
  }
}

export default Profile;
