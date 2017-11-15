import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 23,
  },
});

class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
        title="Camera"
        onPress={() => this.props.navigation.navigate('BarCodeScreen')}
        />
      </View>
    );
  }
}

export default Home;
