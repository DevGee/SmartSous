import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TestComponent from '../components/TestComponent/TestComponent';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class TestScreen extends Component {
  constructor() {
    super();
    this.state = {
      test: 'test',
    };
  }
  static navigationOptions = {
    title: 'Second Screen',
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Testing second screen with CSS</Text>
        <Text>{this.state.test}</Text>
        <TestComponent name='Steven'/>
      </View>
    );
  }
}

export default TestScreen;
