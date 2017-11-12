import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
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
        <Button
          onPress={() => this.toggleCamera()}
          title={`${this.state.visible ? 'Hide' : 'Show'} Camera`}
        />
      </View>
    );
  }
}

export default Home;
