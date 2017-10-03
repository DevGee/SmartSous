import React, { Component } from 'react';
import { Button, Text, View, AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import TestScreen from './TestScreen';

class Main extends Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>Hello!</Text>
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