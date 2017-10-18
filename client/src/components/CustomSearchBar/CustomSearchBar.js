import React, { Component } from 'react';
import axios from 'axios';
import { SearchBar } from 'react-native-elements';

class CustomSearchBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      data: this.props.data,
    };
  }

  componentDidUpdate() {
    if (this.state.searchText === '') {
      this.setState({
        data: this.props.data,
      });
    }
  }

  filterData(searchText, recipes) {
    let text = searchText.toLowerCase();

    return filter(recipes, (n) => {
      let note = n.body.toLowerCase();
      return note.search(text) !== -1;
    });
  };

  setSearchText = (e) => {
    let searchText = e.nativeEvent.text;
    this.setState({ searchText });

    let filteredData = this.filterData(searchText, this.data);
    this.setState({
      data: filteredData,
    });
  };
  
  render() {
    return (
      <SearchBar placeholder="Type Here..." onChange={this.setSearchText} lightTheme />
    );
  }
}

export default CustomSearchBar;
