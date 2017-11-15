import React from 'react';
import { StyleSheet } from 'react-native';
import { createRootNavigator } from './config/router';
import { isSignedIn } from './config/auth';

const styles = StyleSheet.create({
  mainScreen: {
    marginTop: 23,
  },
});

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkSignIn: false,
    };
  }
  render() {
    const Layout = createRootNavigator(this.state.signedIn);
    return (
      <Layout style={styles.mainScreen}/>
    );
  }
}

export default Index;
