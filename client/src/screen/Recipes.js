import React from 'react';

import { ActivityIndicator, FlatList, ListView, StyleSheet, Text, View } from 'react-native';
import { List, ListItem } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class Recipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: null,
    };
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
      <List>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
            
            />
          )}
        />
      </List>
    );
  }
}

export default Recipes;

