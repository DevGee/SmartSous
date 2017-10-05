import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import axios from 'axios';
import TestScreen from './TestScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class Main extends Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  constructor() {
    super();
    this.state = {
      status: 'away',
      testRequest: '',
    };
  }
  componentDidMount() {
    this.getTest();
  }
  getTest() {
    axios.get('http://198.199.98.149:5000')
      .then((response) => {
        console.log(response.data);
        this.setState({
          testRequest: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>Hello!</Text>
        <Text>{this.state.status}</Text>
        <Text>{this.state.testRequest}</Text>
        <Button
          onPress={() => navigate('TestScreen')}
          title='Testing Second Screen'
        />
      </View>
    );
  }
}

const App = StackNavigator({
  Main: { screen: Main },
  TestScreen: { screen: TestScreen },
});

export default App;
