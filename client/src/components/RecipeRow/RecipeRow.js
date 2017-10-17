import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Card, ListItem } from 'react-native-elements';


class RecipeRow extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text>Image Here</Text>
        </View>
        <View>
          <Text>{this.props.title}</Text>
          <Text>{this.props.time}</Text>
          <Text>{this.props.size}</Text>
          <Text>{this.props.type}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  title: {

  },
  subtitle: {

  },
});

export default RecipeRow;
