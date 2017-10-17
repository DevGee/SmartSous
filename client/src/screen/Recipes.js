import React from 'react';

import { ActivityIndicator, FlatList, ListView, StyleSheet, Text, View } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import RecipeRow from '../components/RecipeRow/RecipeRow';
import axios from 'axios';

class Recipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isLoadingMore: false,
      data: null,
      dataAfter : '',
    };
  }
  getData() {
    axios.get('http://198.199.98.149:5000/api/test')
    .then((response) => {
      console.log(response.data);
      this.setState({
        text: response.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }
  getMoreData() {

  }
  componentDidMount() {

  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large"/>
        </View>
      );
    }
    return (
      // ListView vs ScrollView vs FlatList; FlatList better
      // <ListView
      //   dataSource={this.state.data}
      //   renderRow={rowData => <Text>{rowData}</Text>}
      // />
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <RecipeRow title= time= size= type=/>
          )}
          onEndReached={() =>
            this.setState({ isLoadingMore: true }, () => this.getMoreData())}
            ListFooterComponent={() => {
              return ();
            }}
          keyExtractor={(item, index) => index}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 1,
    backgroundColor: '#607D8B',
    width: '100%',
  },
});

export default Recipes;

