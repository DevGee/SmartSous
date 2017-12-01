import React from 'react';
import axios from 'axios';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import FBLogin from '../components/FBLogin/FBLogin';

const styles = StyleSheet.create({
  container: {
    height: 500,
    justifyContent: 'center',
  },
  card: {
    height: '50%',
  },
  picStyle: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',

  },
  loginChild: {
    alignItems: 'center',
  },
});

const SignUp = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Card
        containerStyle={styles.card}
        image={require('../images/PancakesHomePic.jpeg')}>
        <View style={styles.loginChild}>
          <Text style={{ marginBottom: 20 }}>
            The solution to making a quick meal
          </Text>
          <FBLogin navObj={navigation}/>
        </View>
      </Card>
    </View>
  );
};

export default SignUp;
