import React, { Component } from 'react';
import { Button, Image, StyleSheet, ScrollView, Text, View } from 'react-native';
import { Card } from 'react-native-elements';

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

    render() {

        return (
            <Card title={this.props.navigation.state.params.ingredientItem.title}>
                <View style={styles.modalContent}>
                    <Text>{`Quantity: ${this.props.navigation.state.params.ingredientItem.qty}`}</Text>
                    <Button title="Add More" />
                    <Button title="Subtract" />
                </View>
            </Card>
        );

    }
  }

  export default FridgeIngredient;