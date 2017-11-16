import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import IconIo from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 23,
  },
  logoutButton: {
    position: 'absolute',
    right: 0,
    top: 23,
  },
});

class Home extends React.Component {
  signOut() {
    this.props.navigation.navigate('SignedOut');
  }

  render() {
    return (
      <View style={styles.container}>
        <Icon
          reverse
          raised
          size={15}
          containerStyle={styles.logoutButton}
          name='exit-to-app'
          type='MaterialCommunityIcons'
          onPress={() => this.signOut()}
        />
        <Icon
          reverse
          raised
          size={36}
          name='barcode-scan'
          type="material-community"
          onPress={() => this.props.navigation.navigate('BarCodeScreen')}
        />
      </View>
    );
  }
}

export default Home;
