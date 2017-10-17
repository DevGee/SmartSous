import React from 'react';
import axios from 'axios';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import RecipeRow from '../components/RecipeRow/RecipeRow';


const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: '86%',
    backgroundColor: '#CED0CE',
    marginLeft: '14%',
  },
  footer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#CED0CE',
  },
});

class Recipes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=5`;
    this.setState({ loading: true });
    axios.get(url)
      .then(res => {
        this.setState({
          data: page === 1 ? res.data.results : [...this.state.data, ...res.data.results],
          loading: false,
          refreshing: false,
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({ error, loading: false });
      });
  };

  handleLoadMore = () => {
    this.setState({
      page: this.state.page + 1,
    },
    () => {
      this.getData();
    },
    );
  };

  filterData(searchText, recipes) {
    let text = searchText.toLowerCase();
    return filter(recipes, (n) => {
      let note = n.body.toLowerCase();
      return note.search(text) !== -1;
    });
  };

  setSearchText = (e) => {
    let searchText = e.nativeEvent.text;
  };

  renderSeparator = () => {
    return (
      <View
        style={styles.separator}
      />
    );
  };

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme />; // Use onChange
  };

  renderFooter = () => {
    if (!this.state.loading) return null;
    return (
      <View
        style={styles.footer}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };
  
  renderRecipe = ({ item }) => {
    return (
      <RecipeRow
        firstname={item.name.first}
        email={item.email}
      />
    );
  }

  render() {
    return (
      <FlatList
        data={this.state.data}
        renderItem={this.renderRecipe}
        keyExtractor={item => item.email}
        ItemSeparatorComponent={this.renderSeparator}
        ListHeaderComponent={this.renderHeader}
        ListFooterComponent={this.renderFooter}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={0.1}
      />
    );
  }
}


export default Recipes;

