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
    this.getTest();
  }
  getTest() {
    axios.get('http://198.199.98.149:5000/api/test')
      .then((response) => {
        console.log(response.data);
        this.setState({
          text: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.status}</Text>
        <Text>{this.state.text}</Text>
        <Button
          title='Logout'
          onPress={this.getTest()}
          color='green'
         />
      </View>
    );
  }
}

export default Profile;
