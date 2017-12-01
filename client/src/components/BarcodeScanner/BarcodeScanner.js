import React, { Component } from 'react';
import axios from 'axios';
import { Text, View, StyleSheet, Alert } from 'react-native';
import Camera from 'react-native-camera';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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

  postBarcodeFood(food) {
    const url = 'http://198.199.98.149:5000/api/barcode/';
    axios.post(url,
      {
        userID: global.USERID,
        name: food,
      })
        .then((res) => {

        })
        .catch((err) => {

        });
  }

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
              [
                { text: 'OK', onPress: () => this.postBarcodeFood(this.state.foodObj.productName) },
              ],
              { cancelable: false },
            );
          });
        } else {
          this.setState({
            foodObj: null,
          }, () => {
            Alert.alert('Product not found!');
          });
        }
        this.props.visibleHandler(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _handleBarCodeRead = (data) => {
    // this.setState({ visible: !this.state.visible });
    this.getFoodData(`https://world.openfoodfacts.org/api/v0/product/${data.data}`);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textContainer}>{this.state.foodApiUrl}</Text>
        <Camera
          onBarCodeRead={this._handleBarCodeRead}
          style={{ height: 350, width: 350 }}
        />
      </View>
    );
  }
}

export default BarcodeScanner;

