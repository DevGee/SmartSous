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
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
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
      <View style={styles.modalContent}>
        <Text>Salt and Pepper Ribeye</Text>
        <Text>Cook Time: 30 min</Text>
        <Text>Servings: 1</Text>
        <Text>Ingredients: "1 tablespoon cornstarch"</Text>
        <Text>     "1 tablespoon cold water"</Text>
        <Text>      "1/2 cup white sugar"</Text>
        <Text>      "1/2 cup soy sauce"</Text>
        <Text>     "1/4 cup cider vinegar"</Text>
        <Text>     "1 clove garlic, minced"</Text>
        <Text>     "1/2 teaspoon ground ginger"</Text>
        <Text>     "1/4 teaspoon ground black pepper"</Text>
        <Text>     "12 skinless chicken thighs"</Text>
        
      </View>
    );
  }
}

export default TestScreen;
