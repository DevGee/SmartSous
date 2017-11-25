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
  textContainer: {
    position: 'absolute',
    top: 0,
  },
});

class BarcodeScanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      visible: true,
      foodObj: null,
      foodApiUrl: '',
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

  getFoodData(foodUrl) {
    axios.get(foodUrl)
      .then((res) => {
        // Put POST request here to send barcode data to server
        if (res.data.status === 1) {
          const foodProduct = res.data.product;
          const foodData = {
            status: res.data.status,
            productName: foodProduct.product_name,
            genericName: foodProduct.generic_name,
            frontImageUrl: foodProduct.image_front_url,
            quantity: foodProduct.quantity,
          };
          this.setState({
            foodObj: foodData,
          }, () => {
            Alert.alert(
              'Scan successful!',
              this.state.foodObj.productName,
              this.state.foodObj.frontImageUrl,
            );
          });
        } else {
          Alert.alert('Product not found!');
        }
        this.props.visibleHandler(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _handleBarCodeRead = (data) => {
    // this.setState({ visible: !this.state.visible });
    this.getFoodData(`http://world.openfoodfacts.org/api/v0/product/${data.data}`);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textContainer}>{this.state.foodApiUrl}</Text>
        <BarCodeScanner
          onBarCodeRead={this._handleBarCodeRead}
          style={{ height: 350, width: 350 }}
        />
      </View>
    );
  }
}

export default BarcodeScanner;

