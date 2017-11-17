import React from 'react';
import axios from 'axios';
import { View } from 'react-native';
import { Button, Card, FormLabel, FormInput } from 'react-native-elements';
import { onSignIn } from '../config/auth';
import googleLogin from '../config/googlelogin';

const googleButton = async (navigation) => {
  const result = await googleLogin(); // Access token on success, Object error: true on failure
  //https://developers.google.com/identity/sign-in/web/backend-auth
  // Pass the accessToken by POST request to python backend. Python backend will use
  // Google API client library to validate the token
  // This allows us to authenticate the user on the server and have protected routes
  if (result.error) {
    // Stay same screen
  } else {
    // axios.post('/http://198.199.98.149:5000/api/login', {
    //   accessToken: result,
    // })
    //   .then((response) => {
    //     // Success
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     // Error
    //     console.log(error);
    //   });
    // Move navigate to after post request is a success? Decide
    navigation.navigate('SignedIn');
  }
};

const SignUp = ({ navigation }) => {
  return (
    <View>
      <Card>
        <FormLabel>Email</FormLabel>
        <FormInput/>
        <FormLabel>Password</FormLabel>
        <FormInput/>
        <FormLabel>Confirm Password</FormLabel>
        <FormInput/>

        <Button
          title='SIGN UP'
          onPress={() => navigation.navigate('SignedIn')}
        />
        <Button
          title='Sign In'
          onPress={() => navigation.navigate('SignIn')}
        />
        <Button
          title='Google Login'
          onPress={() => googleButton(navigation)}
        />
      </Card>
    </View>

  );
};

export default SignUp;
