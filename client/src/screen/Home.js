import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BarcodeScanner from '../components/BarcodeScanner/BarcodeScanner';

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
        <BarcodeScanner/>
      </View>
    );
  }
}

export default Home;
