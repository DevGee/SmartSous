import React from 'react';
import axios from 'axios';
import { ActivityIndicator, TouchableOpacity, FlatList, StyleSheet, Text, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Modal from 'react-native-modal';
import RecipeRow from '../components/RecipeRow/RecipeRow';
import RecipeCard from '../components/RecipeCard/RecipeCard';

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
      dataAfter: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
      searchText: '',
      isModalVisible: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const { page, seed } = this.state;
    // const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=5`;
    const url = `http://198.199.98.149:5000/api/rec_names`;
    axios.get(url)
      .then(res => {
        //console.log(res);
        this.setState({
          // data: page === 1 ? res.data.result : [...this.state.data, ...res.data.results],
          data: page === 1 ? res.data : [...this.state.data, ...res.data],
          loading: false,
          refreshing: false,
        });
      })
      .catch(error => {
        //console.log(error);
      });
  };

  // handleLoadMore = () => {
  //   this.setState(
  //     {
  //       page: this.state.page + 1,
  //     },
  //     () => {
  //       this.getData();
  //     },
  //   );
  // };

  filterData = (e) => {
    let updatedData = this.state.data.slice();
    let searchText = '';
    updatedData = updatedData.filter((item) => {
      searchText = e.nativeEvent.text.toLowerCase();
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

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." onChange={this.filterData} lightTheme />; // Use onChange
  };

  renderFooter = () => {
    if (!this.state.loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  renderRecipeModal = (item) => {
  // return <RecipeCard recipeVisible={this.state.showModal} title={item.title} servings={item.servings}/>;
  }

  navRecipes(item) {
    this.props.navigation.navigate('RecipeDetailScreen', { itemRow: item });
  }

  renderRecipe = ({ item }) => {
    return (
      <RecipeRow
        title={item.title}
        cooktime={item.cooktime}
        servings={item.servings}
        url={item.pic_url}
        onPress={() => this.navRecipes(item)}
      />
    );
  }

  render() {
    return (
      <FlatList
        data={(this.state.searchText !== '') ? this.state.dataAfter : this.state.data}
        renderItem={this.renderRecipe}
        keyExtractor={item => item.rec_id}
        ItemSeparatorComponent={this.renderSeparator}
        ListHeaderComponent={this.renderHeader}
        ListFooterComponent={this.renderFooter}
        // onEndReached={this.handleLoadMore}
        // onEndReachedThreshold={0.01}
      />
    );
  }
}


export default Recipes;

