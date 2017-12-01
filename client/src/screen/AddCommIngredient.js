import React, { Component } from 'react';
import axios from 'axios';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Button, Card, Slider, FormLabel, FormInput } from 'react-native-elements';

const styles = StyleSheet.create({
  submitButton: {
    paddingTop: 15,
  },
});

class AddCommIngredient extends Component {
  constructor() {
    super();
    this.state = {
      value: 1,
      name: '',
    };
  }

  submitFood = () => {
    const url = 'http://198.199.98.149:5000/api/comm_fridge_add/';
    const fridgeItems = this.props.navigation.state.params.fridge;
    let flag = true;
    for (const item in fridgeItems) {
      if (fridgeItems[item].title === this.state.name) {
        flag = false;
        break;
      }
    }
    if (flag) {
      this.submitFoodRequest(url);
    } else {
      Alert.alert(
        'Item is already in the fridge!',
        this.state.name,
        [
          { text: 'OK', onPress: () => this.props.navigation.goBack() },
        ],
        { cancelable: false },
      );
    }
  }

  submitFoodRequest(url) {
    axios.post(url,
      {
        userID: global.USERID,
        title: this.state.name,
        qty: this.state.value,
      })
      .then((res) => {
        this.props.navigation.state.params.refresh();
        this.props.navigation.goBack();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <View>
        <Card>
          <FormLabel>Ingredient Name</FormLabel>
          <FormInput onChangeText={(name) => this.setState({ name })}/>
          <Slider
            onValueChange={(value) => this.setState({ value })}
            minimumValue={1}
            maximumValue={99}
            step={1}
          />
          <Text>Quantity: {this.state.value}</Text>
          <Button
            style={styles.submitButton}
            title='Submit'
            onPress={() => this.submitFood()}
          />
        </Card>
      </View>
    );
  }
}

export default AddCommIngredient;
