import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import SignUp from '../screen/SignUp';
import SignIn from '../screen/SignIn';
import Home from '../screen/Home';
import Profile from '../screen/Profile';
import Recipes from '../screen/Recipes';
import Fridge from '../screen/Fridge';
import FridgeIngredient from '../screen/FridgeIngredient';
import RecipeDetails from '../screen/RecipeDetails';

import { TabIconIO, TabIconMat, TabIconFA } from '../components/TabIcon/TabIcon';

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
        tabBarIcon: ({ focused, tintColor }) => (
          <TabIconMat
            iconDefault='home-outline'
            iconFocused='home'
            focused={focused}
            tintColor={tintColor}
          />
        ),
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({ focused, tintColor }) => (
          <TabIconFA
            iconDefault='id-card-o'
            iconFocused='id-card'
            focused={focused}
            tintColor={tintColor}
          />
        ),
      },
    },
    Recipes: {
      screen: Recipes,
      navigationOptions: {
        tabBarLabel: 'Recipes',
        tabBarIcon: ({ focused, tintColor }) => (
          <TabIconMat
            iconDefault='bookmark-outline'
            iconFocused='bookmark'
            focused={focused}
            tintColor={tintColor}
          />
        ),
      },
    },
    Fridge: {
      screen: Fridge,
      navigationOptions: {
        tabBarLabel: 'Fridge',
        tabBarIcon: ({ focused, tintColor }) => (
          <TabIconMat
            iconDefault='fridge'
            iconFocused='fridge-filled'
            focused={focused}
            tintColor={tintColor}
          />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      style: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      },
      activeTintColor: 'grey',
      inactiveTintColor: 'black',
    },
  },
);

export const RecipeDetailScreen = StackNavigator(
  {
    Recipes: {
      screen: Recipes,
    },
    RecipeDetails: {
      screen: RecipeDetails,
    },
  },
  {
    mode: 'card',
  },
);

export const FridgeIngredientScreen = StackNavigator(
  {
    Fridge: {
      screen: Fridge,
    },
    FridgeIngredient: {
      screen: FridgeIngredient,
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
      RecipeDetailScreen: {
        screen: RecipeDetails,
        navigationOptions: {
          gesturesEnabled: true,
        },
      },
      FridgeIngredientScreen: {
        screen: FridgeIngredient,
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
