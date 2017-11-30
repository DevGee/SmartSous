import React, { Component } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Avatar, Icon, Text } from 'react-native-elements';
import { LoginManager } from 'react-native-fbsdk';
import axios from 'axios';
import FBLogin from '../components/FBLogin/FBLogin';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 23,
  },
  topContainer: {
    flex: 1,
    backgroundColor: 'lightskyblue',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 23,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  logoutButton: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  name: {
    paddingTop: 30,
  },
});
class Profile extends Component {
  constructor() {
    super();
    this.state = {
      data: [], // Full name, username, email
      image: null,
      name: '',
    };
  }
  componentDidMount() {
    this.getProfileInfo();
  }
  signOut() {
    this.props.navigation.navigate('SignedOut');
    LoginManager.logOut();
  }
  getData() {
    const url = 'test';
    axios.get(url)
      .then((res) => {
        this.setState({
          data: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  getProfileInfo() {
    const url = `https://graph.facebook.com/v2.11/me?fields=name,picture.width(720).height(720)&access_token=${global.ACCESSTOKEN}`;
    axios.get(url)
      .then((res) => {
        this.setState({
          name: res.data.name,
          image: res.data.picture.data.url,
        });
      })
      .catch((err) => {
        Alert.alert(err);
      });
  }
  render() {
    const { image } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <FBLogin navObj={this.props.navigation}/>
          {image && <Avatar
            xlarge
            rounded
            source={{ uri: image }}/>}
          <Text h3 style={styles.name}>{this.state.name}</Text>
        </View>
        <View style={styles.bottomContainer}>
        </View>
      </View>

    );
  }
}

           //<Icon
          // reverse
          // raised
          // size={15}
          // containerStyle={styles.logoutButton}
          // name='exit-to-app'
          // type='MaterialCommunityIcons'
          // onPress={() => this.signOut()}
          // />

export default Profile;
