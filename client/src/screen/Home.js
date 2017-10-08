import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { Card, Button } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello!</Text>
      </View>
    );
  }
}

export default Home;
