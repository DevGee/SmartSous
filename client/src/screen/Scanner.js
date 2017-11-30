import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import BarcodeScanner from '../components/BarcodeScanner/BarcodeScanner'; // Use react-native-camera

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBox: {
    height: 100,
    fontSize: 14,
  },
});

class Scanner extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
    };
  }
  toggleCamera() {
    this.setState({
      visible: !this.state.visible,
    });
  }
  handleCamera = (bool) => {
    this.setState({
      visible: bool,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.visible && <BarcodeScanner visibleHandler={this.handleCamera}/>}
        {!this.state.visible && <Button
          borderRadius={5}
          backgroundColor="lightskyblue"
          onPress={() => this.toggleCamera()}
          title='Open Camera'
        /> }
        {this.state.visible &&
        <Text style={styles.textBox}>Move barcode over the camera to scan</Text>}
      </View>
    );
  }
}

export default Scanner;
