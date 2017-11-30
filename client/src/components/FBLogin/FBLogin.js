import React, { Component } from 'react';
import { Alert, View } from 'react-native';
import { AccessToken, LoginButton } from 'react-native-fbsdk';

class FBLogin extends Component {
  componentWillMount() {
    AccessToken.getCurrentAccessToken()
      .then((data) => {
        if (data) {
          this.props.navigation.navigate('SignedIn'); 
        }
      })
      .catch((err) => {
        // Catch promise rejection error
      });
  }
  signOut() {
    this.props.navObj.navigate('SignedOut');
  }
  render() {
    return (
        <LoginButton
          onLoginFinished={
            (err, res) => {
              if (err) {
                // Alert.alert(`Login has error: ${res.error}`);
              } else if (res.isCancelled) {
                // Login is cancelled
              } else {
                AccessToken.getCurrentAccessToken()
                  .then((data) => {
                    // Maybe POST request for accessToken; data.userID
                    global.USERID = data.userID;
                    global.ACCESSTOKEN = data.accessToken;
                    this.props.navObj.navigate('SignedIn');
                  })
                  .catch((err) => {
                    // Handling promise rejection error  
                  });
              }
            }
          }
          onLogoutFinished={() => this.signOut()}
        />
    );
  }
}

export default FBLogin;
