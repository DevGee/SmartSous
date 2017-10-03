import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './screen/Main';


class Index extends React.Component {
  constructor() {
    super();
    this.name = 'Steven';
  }
  render() {
    return (
      <Main/>
    );
  }
}

export default Index;
