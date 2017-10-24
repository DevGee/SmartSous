import React from 'react';
import { View } from 'react-native';
import { Button, Card, FormLabel, FormInput } from 'react-native-elements';
import { onSignIn } from '../config/auth';

const SignIn = ({ navigation }) => {
  return (
    <View>
      <Card>
        <FormLabel>Email</FormLabel>
        <FormInput/>
        <FormLabel>Password</FormLabel>
        <FormInput/>

        <Button
          title='Enter'
          onPress={() => navigation.navigate('SignedIn')}
        />
      </Card>
    </View>
  );
};

export default SignIn;
