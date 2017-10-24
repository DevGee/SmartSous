import React, { Component } from 'react';
import { Image, StyleSheet, ScrollView, Text, TouchableOpacity, View } from 'react-native';
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

class TestScreen extends Component {
  constructor() {
    super();
    this.state = {
      test: 'test',
      isModalVisible: false,
    };
  }
  static navigationOptions = {
    title: 'Second Screen',
  };

  renderButton = (text, onPress) => {
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  }
  
  render() {
    let imageUrl = this.props.navigation.state.params.itemRow.pic_url;
    let newUrl = imageUrl.replace('70x70/', '750x750/');
    console.log(newUrl);

    return (
      <Card title={this.props.navigation.state.params.itemRow.title}>
        <ScrollView style={{ height: 525 }}>
          <View style={{ width: 300, height: 200 }}>
            <Image style={{ width: '100%', height: '100%' }} resizeMode='cover' source={{ uri: newUrl }}/>
          </View>
          <View style={styles.modalContent}>
            <Text>{this.props.navigation.state.params.itemRow.title}</Text>
            <Text>Cook time: {this.props.navigation.state.params.itemRow.cooktime}</Text>
            <Text>Servings: {this.props.navigation.state.params.itemRow.servings}</Text>
            <Text>Ingredients: {this.props.navigation.state.params.itemRow.ingr}</Text>
            <Text>Instructions: {this.props.navigation.state.params.itemRow.instr}</Text>
          </View>
        </ScrollView>
      </Card>
    );
  }
}

export default RecipeDeta;
