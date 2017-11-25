import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Icon, Text, Button } from 'react-native-elements';
import { LoginManager } from 'react-native-fbsdk';
import axios from 'axios';
import FBLogin from '../components/FBLogin/FBLogin';
 // import { ImagePicker } from 'expo'; // Use ImagePickerIOS after eject; or react-native-image-picker

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
    backgroundColor: 'grey',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 23,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: 'lightgrey',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  profileImg: {
    height: 200,
    width: 200,
  },
  choosePic: {
    width: '80%',
  },
  logoutButton: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
});
class Profile extends Component {
  constructor() {
    super();
    this.state = {
      data: [], // Full name, username, email
      image: null,
    };
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
  // _pickImg = async () => {
  //   const res = await ImagePicker.launchImageLibraryAsync({
  //     allowsEditing: true,
  //   });
  //   if (!res.cancelled) {
  //     this.setState({
  //       image: res.uri,
  //     });
  //   }
  // }
  render() {
    const { image } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Icon
          reverse
          raised
          size={15}
          containerStyle={styles.logoutButton}
          name='exit-to-app'
          type='MaterialCommunityIcons'
          onPress={() => this.signOut()}
          />
          {image && <Avatar
            xlarge
            rounded
            source={{ uri: image }}/>}
          <Text h3>Full Name</Text>
        </View>
        <View style={styles.bottomContainer}>
          <Button
            style={styles.choosePic}
            title="Choose picture"
            // onPress={this._pickImg}
          />
        </View>
      </View>

    );
  }
}

export default Profile;
