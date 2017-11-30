import React, { Component } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Avatar, Text } from 'react-native-elements';
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
    bottom: 0,
    padding: 10,
    paddingBottom: 30,
  },
  name: {
    paddingTop: 30,
  },
  topTag: {
    paddingTop: 50,
    fontSize: 16,
  },
  tags: {
    fontSize: 16,
    paddingTop: 12,
  },
});
class Profile extends Component {
  constructor() {
    super();
    this.state = {
      data: null, // comm_id, comm_pw, num_ingr, num_comm_ingr
      image: null,
      name: '',
    };
  }

  componentDidMount() {
    this.getProfileInfo();
    this.intervalID = setInterval(() => this.getAccInfo(), 1000);
    this.getAccInfo();
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  getAccInfo() {
    const url = `http://198.199.98.149:5000/api/acct_info/${global.USERID}`;
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
    const { image, data } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          {image && <Avatar
            xlarge
            rounded
            source={{ uri: image }}/>}
          <Text h3 style={styles.name}>{this.state.name}</Text>
        </View>
        <View style={styles.bottomContainer}>
        {data && <View><Text style={styles.topTag}>Fridge: {this.state.data.num_ingr} items</Text></View>}
        {data && <View><Text style={styles.tags}>Community Fridge: {this.state.data.num_comm_ingr} items</Text></View>}
        {data && <View><Text style={styles.tags}>Community Name: {this.state.data.comm_name}</Text></View>}
        {data && <View><Text style={styles.tags}>Community ID: {this.state.data.comm_id}</Text></View>}
        {data && <View><Text style={styles.tags}>Community Password: {this.state.data.comm_pw}</Text></View>}
          <View style={styles.logoutButton}>
            <FBLogin navObj={this.props.navigation}/>
          </View>
        </View>
      </View>

    );
  }
}

export default Profile;
