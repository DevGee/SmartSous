import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
  textTitle: {
    paddingTop: 15,
    fontSize: 16,
  },
});

class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.quadrantOne}>
            <Icon
              reverse
              raised
              size={36}
              containerStyle={styles.communityFridge}
              name='ios-people'
              type='ionicon'
              onPress={() => this.props.navigation.navigate('ViewCommScreen')}
            />
            <Text style={styles.textTitle}>View Community</Text>
          </View>
          <View style={styles.quadrantTwo}>
            <Icon
              reverse
              raised
              size={36}
              containerStyle={styles.communityFridge}
              name='plus-square-o'
              type='font-awesome'
              onPress={() => this.props.navigation.navigate('MakeCommScreen')}
            />
            <Text style={styles.textTitle}>Make Community</Text>
          </View>
        </View>
        <View style={styles.bottom}>
          <View style={styles.quadrantThree}>
            <Icon
              reverse
              raised
              size={36}
              containerStyle={styles.communityFridge}
              name='group-add'
              type='material-icons'
              onPress={() => this.props.navigation.navigate('JoinCommScreen')}
            />
            <Text style={styles.textTitle}>Join Community</Text>
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
            <Text style={styles.textTitle}>Scan Barcode</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Home;
