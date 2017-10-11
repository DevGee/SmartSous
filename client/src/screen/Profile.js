import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
    super()
    this.state = {
      status: 'here',
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.status}</Text>
        <Button/>
      </View>
    );
  }
}

export default Profile;
