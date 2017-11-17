import React, { Component } from 'react';
import axios from 'axios';
import { ActivityIndicator, StyleSheet, Text, View, FlatList } from 'react-native';
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
  },
});

class Fridge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'test Opening the Fridge',
      loading: false,
      data: [
        { title: 'eggs', qty: 5 },
        { title: 'bacon', qty: 2 },
        { title: 'goldfish', qty: 7 },
        { title: 'iPhone X\'s', qty: 1 },
      ],
      testprop: 'Fridge Ingredients',
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
    };
    this.navIngredients = this.navIngredients.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    // const { page, seed } = this.state;
    const url = 'http://198.199.98.149:5000/api/fridge/3';
    this.setState({ loading: true });
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
        this.setState({ error, loading: false });
      });
  };

// Render a header?
renderHeader = () =>
<Text style={[styles.label, styles.sectionHeader]}>{this.state.testprop}</Text>

// Render a footer?
renderFooter = () =>
<Text style={[styles.label, styles.sectionHeader]}></Text>

// Show this when data is empty
renderEmpty = () =>
<Text style={styles.label}> - Nothing to See Here - </Text>

renderSeparator = () =>
<Text style={styles.label}></Text>

// The default function if no Key is provided is index
// an identifiable key is important if you plan on
// item reordering.  Otherwise index is fine
keyExtractor = (item, index) => index

// How many items should be kept im memory as we scroll?
oneScreensWorth = 20

navIngredients = (item) => {
  this.props.navigation.navigate('FridgeIngredientScreen', { ingredientItem: item });
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
    <FlatList
    style={styles.listScreen}
    data={this.state.data}
    renderItem={this.renderIngredient}
    keyExtractor={this.keyExtractor}
    initialNumToRender={this.oneScreensWorth}
    ListHeaderComponent={this.renderHeader}
    ListFooterComponent={this.renderFooter}
    ListEmptyComponent={this.renderEmpty}
    ItemSeparatorComponent={this.renderSeparator}
    />
  );
}
}

export default Fridge;
