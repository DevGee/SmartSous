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
      name: '',
      pass: '',
    };
  }

  submitComm = () => {
    const url = 'http://198.199.98.149:5000/api/create_comm/';
    axios.post(url,
      {
        userID: global.USERID,
        name: this.state.name,
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
          <FormLabel>Community Name</FormLabel>
          <FormInput onChangeText={(name) => this.setState({ name })}></FormInput>
          <FormLabel>Passphrase</FormLabel>
          <FormInput onChangeText={(pass) => this.setState({ pass })}></FormInput>
          <Button
            style={styles.makeButton}
            title="Make"
            onPress={() => this.submitComm()}
          />
        </Card>
      </View>
    );
  }
}

export default MakeCommunity;
