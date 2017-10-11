import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Card, ListItem } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});

class RecipeCard extends Component {
  render() {
    return (
      <Card containerStyle={styles.container} >
        <Text>{this.props.title}</Text>
        <Text>{this.props.time}</Text>
        <Text>{this.props.size}</Text>
        <Text>{this.props.type}</Text>
        <Image source={this.props.imageurl}/>
      </Card>
    );
  }
}

export default RecipeCard;
