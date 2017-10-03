import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
    marginBottom: 30,
  },
});

class TestScreen extends Component {
  static navigationOptions = {
    title: 'Test Screen',
  };
  render() {
    return (
      <View>
        <Text>Testing second screen</Text>
      </View>
    );
  }
}

export default TestScreen;