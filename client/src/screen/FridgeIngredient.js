import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  quantityText: {
    fontSize: 18,
    paddingBottom: 10,
    textAlign: 'center',
  },
  addbuttonStyle: {
    borderRadius: 5,
    marginBottom: 10,
  },
  removebuttonStyle: {
    borderRadius: 5,
  },
  deleteContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  deletebuttonStyle: {
    marginTop: 35,
    borderRadius: 5,
    width: '100%',
  },
  icon: {
    position: 'absolute',
    top: 0,
    right: -1,
  },
});

class FridgeIngredient extends Component {
  state = {
    qty: 0,
  };
  componentDidMount() {
    this.setState({
      qty: this.props.navigation.state.params.ingredientItem.qty,
    });
  }
  modifyQuantity(flag) {
    let incOrDec;
    if (flag) {
      incOrDec = 1;
    } else {
      incOrDec = -1;
    }
    const url = `http://198.199.98.149:5000/api/fridge/${global.USERID}`;
    this.setState({
      qty: this.state.qty + incOrDec,
    });
    global.PFRIDGEQUANTITY = this.state.qty;
    axios.put(url,
      {
        userID: global.USERID,
        qty: this.state.qty + incOrDec,
        title: this.props.navigation.state.params.ingredientItem.title,
      })
      .then(function (response) {
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    this.props.navigation.state.params.refresh();
  }
  addFood = () => {
    this.modifyQuantity(true);
  }

  minusFood = () => {
    this.modifyQuantity(false);
  }

  deleteFood = () => {
    const url = 'http://198.199.98.149:5000/api/fridge_delete';
    axios.put(url,
      {
        userID: global.USERID,
        title: this.props.navigation.state.params.ingredientItem.title,
      })
      .then((res) => {
        this.props.navigation.state.params.refresh();
        this.props.navigation.goBack();
      })
      .catch((err) => {

      });
  }

  confirmDelete = () => {
    Alert.alert(
      'Confirm Delete',
      `Are you sure you want to delete ${this.props.navigation.state.params.ingredientItem.title}?`,
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        { text: 'OK', onPress: () => this.deleteFood() },
      ],
      { cancelable: false },
    );
  }

  render() {
    return (
        <Card title={this.props.navigation.state.params.ingredientItem.title}>
            <Icon
              size={22} 
              containerStyle={styles.icon}
              name="trash-o"
              type="font-awesome"
              color="crimson"
              onPress={this.confirmDelete}
            />
            <View style={styles.modalContent}>
                <Text style={styles.quantityText}>{`Quantity: ${this.state.qty}`}</Text>
                <Button buttonStyle={styles.addbuttonStyle} backgroundColor="lightskyblue" onPress={this.addFood} title="Add"/>
                <Button buttonStyle={styles.removebuttonStyle} backgroundColor="lightskyblue" onPress={this.minusFood} title="Remove"/>
            </View>
        </Card>
    );
  }
}

export default FridgeIngredient;
