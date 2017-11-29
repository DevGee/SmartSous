import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { LoginManager } from 'react-native-fbsdk';

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
    zIndex: 1,
  },
  barCodeButton: {

  },
  communityFridge: {

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
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: 'lightskyblue',
  },
  quadrantThree: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: 'lightskyblue',
  },
  quadrantFour: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: 'lightblue',
  },
});

class Home extends React.Component {
  signOut() {
    this.props.navigation.navigate('SignedOut');
    LoginManager.logOut();
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
          </View>
          <View style={styles.quadrantTwo}>
            <Icon
              reverse
              raised
              size={36}
              containerStyle={styles.communityFridge}
              name='ios-people'
              type='ionicon'
              onPress={() => {}}
            />
          </View>
        </View>
        <View style={styles.bottom}>
          <View style={styles.quadrantThree}>
          </View>
          <View style={styles.quadrantFour}>
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
        </View>
      </View>
    );
  }
}

export default Home;
