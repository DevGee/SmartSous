import React, { Component } from 'react';
import axios from 'axios';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { Constants, BarCodeScanner, Permissions } from 'expo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
  },
});

class BarcodeScanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      visible: true,
    };
  }

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = (data) => {
    //this.setState({ visible: !this.state.visible });
    this.props.visibleHandler(false);
    // Put POST request here to send barcode data to server
    Alert.alert(
      'Scan successful!',
      JSON.stringify(data),
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeRead={this._handleBarCodeRead}
          style={{ height: 350, width: 350 }}
        />
      </View>
    );
  }
}

export default BarcodeScanner;
