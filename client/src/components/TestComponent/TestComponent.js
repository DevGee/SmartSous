import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'red',
    fontSize: 20,
    lineHeight: 20,
  },
});

class TestComponent extends Component {
  render() {
    return (
      <View>
        <Text style={styles.text}>Test Component</Text>
        <Text style={styles.text}>{this.props.name}</Text>
      </View>
    );
  }
}

export default TestComponent;
