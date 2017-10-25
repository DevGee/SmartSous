import React from 'react';
import { View } from 'react-native';
import { Button, Card, FormLabel, FormInput } from 'react-native-elements';
import { onSignIn } from '../config/auth';
import googleLogin from '../config/googlelogin';

const googleButton = async (navigation) => {
  const result = await googleLogin(); // Access token on success, Object error: true on failure
  if (result.error) {
    // Stay same screen
  } else {
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
