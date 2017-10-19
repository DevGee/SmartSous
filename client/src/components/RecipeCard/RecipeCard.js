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

class RecipeCard extends Component {
  constructor() {
    super();
    this.state = {
      recipeVisible: this.props.recipeVisible,
    };
  }

  setRecipeVisible(recipeVisible) {
    this.setState({ recipeVisible });
  }

  renderButton = (text, onPress) => {
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  }

  renderRecipeContent = () => {
    <View style={styles.modalContent}>
      <Text>{this.props.title}</Text>
      <Text>{this.props.servings}</Text>
      <Text>{this.props.cooktime}</Text>
      <Text>{this.props.ingr}</Text>
      <Text>{this.props.instr}</Text>
    </View>
  }
//{this.renderButton('Close', () => this.setRecipeVisible(null))}
  render() {
    return (
      <View style={styles.container}>
        {this.renderRecipeContent}
      </View>
    );
  }
}


export default RecipeCard;
