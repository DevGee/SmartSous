import React, { Component } from 'react';
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
  listContainer: {
    backgroundColor: 'white',
  },
  listScreen: {
    paddingTop: 23,
    flex: 1,
  },
  loadingScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class Recipes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: [],
      dataAfter: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
      searchText: '',
      inRecipe: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const { page } = this.state;
    // const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=5`;
    const url = 'http://198.199.98.149:5000/api/rec_names/';
    //this.setState({ loading: true });
    axios.get(url)
      .then((res) => {
        // console.log(res);
        this.setState({
          // data: page === 1 ? res.data.result : [...this.state.data, ...res.data.results],
          data: page === 1 ? res.data : [...this.state.data, ...res.data],
          loading: false,
          refreshing: false,
        });
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  // Set this up when we need to handle infinite scrolling
  /* handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        this.getData();
      },
    );
  }; */

  handleRefresh = () => {
    this.setState({
      refreshing: true,
    }, () => {
      this.getData();
    });
  };

  filterData = (e) => {
    let updatedData = this.state.data.slice();
    let searchText = '';
    updatedData = updatedData.filter((item) => {
      searchText = e.toLowerCase();
      // return item.name.first.toLowerCase().search(searchText) !== -1;
      return item.title.toLowerCase().search(searchText) !== -1;
    });
    this.setState({
      dataAfter: updatedData,
      searchText,
    });
  }

  renderSeparator = () => {
    return (
      <View
        style={styles.separator}
      />
    );
  };

  renderFooter = () => {
    if (!this.state.loading) {
      return null;
    }
    return (
      <View style={styles.footer}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  navRecipes(item) {
    this.props.navigation.navigate('RecipeDetailScreen', { itemRow: item });
  }

  renderRecipe = ({ item }) => {
    const securePicUrl = item.pic_url.replace('http://', 'https://');
    return (
      <RecipeRow
        title={item.title}
        cooktime={item.cooktime}
        servings={item.servings}
        url={securePicUrl}
        onPress={() => this.navRecipes(item)}
      />
    );
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loadingScreen}>
          <ActivityIndicator size="large"/>
        </View>
      );
    }
    return (
      <View style={styles.listScreen}>
        <SearchBar placeholder="Search..." onChangeText={this.filterData} clearIcon lightTheme />
        <FlatList
          disableVirtualization={false}
          data={(this.state.searchText !== '') ? this.state.dataAfter : this.state.data}
          renderItem={this.renderRecipe}
          keyExtractor={item => item.rec_id}
          //ItemSeparatorComponent={this.renderSeparator}
          ListFooterComponent={this.renderFooter}
          // onEndReached={this.handleLoadMore} // Use this for infinite scrolling
          onEndReachedThreshold={1}
          legacyImplementation={true} // Makes it super fast
          enableEmptySections // Disables warning
          removeClippedSubviews={false} // Fixes not rendering witout scroll
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
        />
      </View>
    );
  }
}


export default Recipes;

