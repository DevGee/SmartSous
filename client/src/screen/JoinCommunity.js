import React, { Component } from 'react';
import axios from 'axios';
import { StyleSheet, View } from 'react-native';
import { Button, Card, FormInput, FormLabel } from 'react-native-elements';

const styles = StyleSheet.create({
  makeButton: {
    paddingTop: 15,
  },
});

class MakeCommunity extends Component {
  constructor() {
    super();
    this.state = {
      commID: '',
      pass: '',
    };
  }

  submitComm = () => {
    const url = 'http://198.199.98.149:5000/api/join_comm/';
    axios.post(url,
      {
        userID: global.USERID,
        commID: this.state.commID,
        password: this.state.pass,
      })
      .then((res) => {
        this.props.navigation.goBack();
      })
      .catch((err) => {

      });
  }

  render() {
    return (
      <View>
        <Card>
          <FormLabel>Community ID</FormLabel>
          <FormInput onChangeText={(commID) => this.setState({ commID })}></FormInput>
          <FormLabel>Passphrase</FormLabel>
          <FormInput onChangeText={(pass) => this.setState({ pass })}></FormInput>
          <Button
            style={styles.makeButton}
            title="Join"
            onPress={() => this.submitComm()}
          />
        </Card>
      </View>
    );
  }
}

export default MakeCommunity;
