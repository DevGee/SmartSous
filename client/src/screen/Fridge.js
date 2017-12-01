import React, { Component } from 'react';
import axios from 'axios';
import { ActivityIndicator, StyleSheet, View, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import { Metrics, Colors } from '../Containers/Themes';
import IngredientRow from '../components/IngredientRow/IngredientRow';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flex: 1,
    backgroundColor: Colors.windowTint,
    marginVertical: Metrics.smallMargin,
    justifyContent: 'center',
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#000',
    textAlign: 'center',
    marginBottom: Metrics.smallMargin,
  },
  label: {
    textAlign: 'center',
    color: '#000',
  },
  listContent: {
    marginTop: Metrics.baseMargin,
  },
  listScreen: {
    paddingTop: 23,
    flex: 1,
  },
});

class Fridge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      refreshing: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const url = `http://198.199.98.149:5000/api/fridge/${global.USERID}`;
    axios.get(url)
      .then(res => {
        this.setState({
          data: res.data,
          loading: false,
          refreshing: false,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleRefresh = () => {
    this.setState({
      refreshing: true,
    }, () => {
      this.getData();
    });
  };

refreshFunction = () => {
  this.getData();
}

navIngredients = (item) => {
  this.props.navigation.navigate('FridgeIngredientScreen', { ingredientItem: item, refresh: this.refreshFunction });
}

navAddIngredients = () => {
  this.props.navigation.navigate('AddIngredientScreen', { fridge: this.state.data, refresh: this.refreshFunction });
}

renderIngredient = ({ item }) => {
  return (
    <IngredientRow
      title={item.title}
      qty={item.qty}
      onPress={() => this.navIngredients(item)}
    />
  );
}

render() {
  if (this.state.loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }
  return (
    <View style={styles.listScreen}>
      <Button borderRadius={5} backgroundColor="lightskyblue" onPress={() => this.navAddIngredients()} title="Add Ingredient"/>
      <FlatList
        disableVirtualization={false}
        legacyImplementation={true} // Makes it super fast
        enableEmptySections // Disables warning
        removeClippedSubviews={false} // Fixes not rendering witout scroll
        data={this.state.data}
        renderItem={this.renderIngredient}
        keyExtractor={(item, index) => index}
        onRefresh={this.handleRefresh}
        refreshing={this.state.refreshing}
      />
    </View>
  );
}
}

export default Fridge;
