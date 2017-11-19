import React, { PureComponent } from 'react';
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
  title: {
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'center',
  },
});

class RecipeDetails extends PureComponent {
  render() {
    const navItemObj = this.props.navigation.state.params.itemRow;
    const imageUrl = navItemObj.pic_url;
    const newUrl = imageUrl.replace('70x70/', '750x750/');

    return (
      <View style={styles.recipeScreen}>
        <Card title={navItemObj.title} titleStyle={styles.title}>
          <ScrollView style={styles.scrollList}>
            <View style={styles.foodPicContainer}>
              <Image style={styles.foodPic} resizeMode='cover' source={{ uri: newUrl }}/>
            </View>
            <View style={styles.modalContent}>
              <Text>{navItemObj.title}</Text>
              <Text>Cook time: {navItemObj.cooktime}</Text>
              <Text>Servings: {navItemObj.servings}</Text>
              <Text>Ingredients: {navItemObj.ingr}</Text>
              <Text>Instructions: {navItemObj.instr}</Text>
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
