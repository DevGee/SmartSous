import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import axios from 'axios';
import { getUserID } from '../config/auth';


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
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});

class FridgeIngredient extends Component {
  state = {
    qty: this.props.navigation.state.params.ingredientItem.qty,
  };
  addFood = () => {
    // Put request
    const url = 'http://198.199.98.149:5000/api/fridge/3';
    axios.put(url,
      {
        userID: global.USERID,
        qty: this.props.navigation.state.params.ingredientItem.qty + 1,
        title: this.props.navigation.state.params.ingredientItem.title, 
      })
      .then(function (response) {
        this.setState({
          qty: this.state.qty + 1,
        });
      })
      .catch(function (error) {
      });
  }

  minusFood = () => {
    // Put request
  }

  render() {
    return (
        <Card title={this.props.navigation.state.params.ingredientItem.title}>
            <View style={styles.modalContent}>
                <Text>{`Quantity: ${this.props.navigation.state.params.ingredientItem.qty}`}</Text>
                <Text>{this.state.qty}</Text>
                <Button onPress={this.addFood} title="Add More" />
                <Button onPress={this.minusFood} title="Subtract" />
            </View>
        </Card>
    );
  }
}

export default FridgeIngredient;
