import React, { Component } from 'react';
import { Image, StyleSheet, ScrollView, Text, View } from 'react-native';
import { Icon, Card } from 'react-native-elements';

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
  icon: {
    position: 'absolute',
    top: 0,
    left: -1,
  },
  recipeScreen: {
    paddingTop: 10,
  },
  scrollList: {
    height: 545,
  },
  foodPicContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    width: '100%',
    height: 200,
  },
  foodPic: {
    width: '100%',
    height: '100%',
  },
});

class RecipeDetails extends Component {
  render() {
    const imageUrl = this.props.navigation.state.params.itemRow.pic_url;
    const newUrl = imageUrl.replace('70x70/', '750x750/');

    return (
      <View style={styles.recipeScreen}>
        <Card title={this.props.navigation.state.params.itemRow.title}>
          <ScrollView style={styles.scrollList}>
            <View style={styles.foodPicContainer}>
              <Image style={styles.foodPic} resizeMode='cover' source={{ uri: newUrl }}/>
            </View>
            <View style={styles.modalContent}>
              <Text>{this.props.navigation.state.params.itemRow.title}</Text>
              <Text>Cook time: {this.props.navigation.state.params.itemRow.cooktime}</Text>
              <Text>Servings: {this.props.navigation.state.params.itemRow.servings}</Text>
              <Text>Ingredients: {this.props.navigation.state.params.itemRow.ingr}</Text>
              <Text>Instructions: {this.props.navigation.state.params.itemRow.instr}</Text>
            </View>
          </ScrollView>
          <Icon name="close"
            size={22} containerStyle={styles.icon}
            onPress={() => this.props.navigation.goBack()}
          />
        </Card>
      </View>
    );
  }
}

export default RecipeDetails;
