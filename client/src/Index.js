import React from 'react';
import { createRootNavigator } from './config/router';
import { isSignedIn } from './config/auth';

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
      <Layout/>
    );
  }
}

export default Index;
