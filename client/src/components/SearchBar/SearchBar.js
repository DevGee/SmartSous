import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements';
import axios from 'axios';

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      isLoading: false,
    };
  }
  componentDidMount() {

  }
  getData() {
    axios.get('http://198.199.98.149:5000')
      .then((response) => {
        console.log(response.data);
        this.setState({
          data: response,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <SearchBar
        onChangeText={this.state.data}
        placeholder='Search'
      />
      
    );
  }
}

export default SearchBar;
