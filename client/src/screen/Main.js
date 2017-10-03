import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
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
  constructor() {
    super();
    this.state = {
      status: 'away',
    };
  }
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>Hello!</Text>
        <Text>{this.state.status}</Text>
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
