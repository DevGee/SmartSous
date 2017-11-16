import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
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
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});

class FridgeIngredient extends Component {
  addFood = () => {
    // Put request
    var resultElement;
    const url = 'http://198.199.98.149:5000/api/fridge/3';
    axios.post(url,
      {
        title: this.props.navigation.state.params.ingredientItem.title,
        qty: this.props.navigation.state.params.ingredientItem.qty + 1
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      
  }

  minusFood =() => {
    // Put request
  }

  render() {
    return (
        <Card title={this.props.navigation.state.params.ingredientItem.title}>
            <View style={styles.modalContent}>
                <Text>{`Quantity: ${this.props.navigation.state.params.ingredientItem.qty}`}</Text>
                <Button onPress={this.addFood} title="Add More" />
                <Button onPress={this.minusFood} title="Subtract" />
            </View>
        </Card>
    );
  }
}

export default FridgeIngredient;
