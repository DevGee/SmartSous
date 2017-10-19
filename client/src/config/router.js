import { Platform, StatusBar } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import SignUp from '../screen/SignUp';
import SignIn from '../screen/SignIn';

import Home from '../screen/Home';
import Profile from '../screen/Profile';
import Recipes from '../screen/Recipes';
import Fridge from '../screen/Fridge';
import TestScreen from '../screen/TestScreen';

export const SignedOut = StackNavigator({
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: 'Sign Up',
    },
  },
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: 'Sign In',
    },
  },
});

export const SignedIn = TabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Home',
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: 'Profile',
      },
    },
    Recipes: {
      screen: Recipes,
      navigationOptions: {
        tabBarLabel: 'Recipes',
      },
    },
    Fridge: {
      screen: Fridge,
      navigationOptions: {
        tabBarLabel: 'Fridge',
      },
    },
  },
  {
    tabBarOptions: {
      style: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      },
    },
  },
);

export const RecipeDetails = StackNavigator(
  {
    Recipes: {
      screen: Recipes,
    },
    RecipeDetails: {
      screen: TestScreen,
    },
  },
  {
    mode: 'card',
  },
);

export const createRootNavigator = (signedIn = false) => {
  return StackNavigator(
    {
      SignedIn: {
        screen: SignedIn,
        navigationOptions: {
          gesturesEnabled: false,
        },
      },
      SignedOut: {
        screen: SignedOut,
        navigationOptions: {
          gesturesEnabled: false,
        },
      },
      RecipeDetails: {
        screen: TestScreen,
        navigationOptions: {
          gesturesEnabled: true,
        },
      },
    },
    {
      headerMode: 'none',
      mode: 'modal',
      initialRouteName: signedIn ? 'SignedIn' : 'SignedOut',
    },
  );
};
