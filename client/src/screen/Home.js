import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';

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
  barCodeButton: {

  },
  top: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  bottom: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  quadrantOne: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: 'lightblue',
  },
  quadrantTwo: {
    flex: 1,
    backgroundColor: 'red',
    alignSelf: 'stretch',
  },
  quadrantThree: {
    flex: 1,
    backgroundColor: 'green',
    alignSelf: 'stretch',
  },
  quadrantFour: {
    flex: 1,
    backgroundColor: 'yellow',
    alignSelf: 'stretch',
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
        <View style={styles.top}>
          <View style={styles.quadrantOne}>
            <Icon
              reverse
              raised
              size={36}
              containerStyle={styles.barCodeButton}
              name='barcode-scan'
              type='material-community'
              onPress={() => this.props.navigation.navigate('BarCodeScreen')}
            />
          </View>
          <View style={styles.quadrantTwo}>
          </View>
        </View>
        <View style={styles.bottom}>
          <View style={styles.quadrantThree}>
          </View>
          <View style={styles.quadrantFour}>
          </View>
        </View>
      </View>
    );
  }
}

export default Home;
