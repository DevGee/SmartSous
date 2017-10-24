import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
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

class IngredientCard extends Component {
  constructor() {
    super();
    this.state = {
      ingredientVisible: this.props.ingredientVisible,
    };
  }

  setIngredientVisible(ingredientVisible) {
    this.setState({ ingredientVisible });
  }

  renderButton = (text, onPress) => {
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  }

  renderIngredientContent = () => {
    <View style={styles.modalContent}>
      <Text>{this.props.title}</Text>
      <Text>{this.props.qty}</Text>
    </View>
  }
//{this.renderButton('Close', () => this.setRecipeVisible(null))}
  render() {
    return (
      <View style={styles.container}>
        {this.renderIngredientContent}
      </View>
    );
  }
}


export default IngredientCard;