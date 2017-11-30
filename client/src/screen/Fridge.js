import React, { Component } from 'react';
import axios from 'axios';
import { ActivityIndicator, StyleSheet, Text, View, FlatList } from 'react-native';
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
    height: '80%',
  },
  addHeader: {
    width: '100%',
    zIndex: 1,
  },
});

class Fridge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'test Opening the Fridge',
      loading: false,
      data: [],
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

// How many items should be kept  im memory as we scroll?
oneScreensWorth = 20

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
      <Button style={styles.addHeader} backgroundColor="lightskyblue" onPress={() => this.navAddIngredients()} title="Add"/>
      <FlatList
      data={this.state.data}
      renderItem={this.renderIngredient}
      keyExtractor={this.keyExtractor}
//      ListHeaderComponent={this.renderHeader}
      ListFooterComponent={this.renderFooter}
      //ListEmptyComponent={this.renderEmpty}
      ItemSeparatorComponent={this.renderSeparator}
      onRefresh={this.handleRefresh}
      refreshing={this.state.refreshing}
      />
    </View>
  );
}
}

export default Fridge;
