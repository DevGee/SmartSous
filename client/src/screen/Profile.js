import React, { Component } from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';
import { ImagePicker } from 'expo'; // Use ImagePickerIOS after eject; or react-native-image-picker

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 23,
  },
  pickProfilePic: {

  },
  profileImg: {
    height: 200,
    width: 200,
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
  _pickImg = async () => {
    let res = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });
    if (!res.cancelled) {
      this.setState({
        image: res.uri,
      });
    }
  }
  render() {
    let { image } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <Text>Full Name</Text>
        </View>
        <Button
          title='Logout'
          onPress={() => this.signOut()}
         />
        <View style={styles.pickProfilePic}>
          <Button
            title="Choose picture"
            onPress={this._pickImg}
          />
          {image && <Image style={styles.profileImg} source={{ uri: image }}/>}
        </View>
      </View>

    );
  }
}

export default Profile;
