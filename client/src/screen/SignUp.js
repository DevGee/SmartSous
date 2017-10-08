import React from 'react';
import { View } from 'react-native';
import { Button, Card, FormLabel, FormInput } from 'react-native-elements';
import { onSignIn } from '../config/auth';

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
      </Card>
    </View>

  );
};

export default SignUp;
