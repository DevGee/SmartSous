import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import SignUp from '../screen/SignUp';
import Home from '../screen/Home';
import Profile from '../screen/Profile';
import Recipes from '../screen/Recipes';
import Fridge from '../screen/Fridge';
import FridgeIngredient from '../screen/FridgeIngredient';
import AddIngredient from '../screen/AddIngredient';
import FridgeCommunity from '../screen/FridgeCommunity';
import FridgeCommIngredient from '../screen/FridgeCommIngredient';
import AddCommIngredient from '../screen/AddCommIngredient';
import RecipeDetails from '../screen/RecipeDetails';
import Scanner from '../screen/Scanner';
import MakeCommunity from '../screen/MakeCommunity';
import JoinCommunity from '../screen/JoinCommunity';

import { TabIconMat, TabIconFA } from '../components/TabIcon/TabIcon';

export const SignedOut = StackNavigator({
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: 'SmartSous',
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
      activeTintColor: 'lightskyblue',
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
    mode: 'modal',
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
    mode: 'modal',
  },
);

export const AddIngredientScreen = StackNavigator(
  {
    Fridge: {
      screen: Fridge,
    },
    AddIngredient: {
      screen: AddIngredient,
    },
  },
  {
    mode: 'modal',
  },
);

export const FridgeCommIngredientScreen = StackNavigator(
  {
    ViewComm: {
      screen: FridgeCommunity,
    },
    FridgeCommIngredient: {
      screen: FridgeCommIngredient,
    },
  },
  {
    mode: 'modal',
  },
);

export const AddCommIngredientScreen = StackNavigator(
  {
    ViewComm: {
      screen: FridgeCommunity,
    },
    AddCommIngredient: {
      screen: AddCommIngredient,
    },
  },
  {
    mode: 'modal',
  },
);

export const BarCodeScreen = StackNavigator(
  {
    Home: {
      screen: Home,
    },
    BarCode: {
      screen: Scanner,
    },
  },
  {
    mode: 'card',
  },
);

export const MakeCommScreen = StackNavigator(
  {
    Home: {
      screen: Home,
    },
    MakeComm: {
      screen: MakeCommunity,
    },
  },
  {
    mode: 'modal',
  },
);

export const JoinCommScreen = StackNavigator(
  {
    Home: {
      screen: Home,
    },
    MakeComm: {
      screen: JoinCommunity,
    },
  },
  {
    mode: 'modal',
  },
);

export const ViewCommScreen = StackNavigator(
  {
    Home: {
      screen: Home,
    },
    ViewComm: {
      screen: FridgeCommunity,
    },
  },
  {
    mode: 'modal',
  },
);

export const createRootNavigator = (signedIn = false) => {
  return StackNavigator(
    {
      SignedIn: {
        screen: SignedIn,
        navigationOptions: {
          gesturesEnabled: false,
          header: null,
        },
      },
      SignedOut: {
        screen: SignedOut,
        navigationOptions: {
          gesturesEnabled: false,
          header: null,
        },
      },
      BarCodeScreen: {
        screen: Scanner,
        navigationOptions: {
          title: 'Barcode Scanner',
          gesturesEnabled: true,
        },
      },
      RecipeDetailScreen: {
        screen: RecipeDetails,
        navigationOptions: {
          gesturesEnabled: false,
          header: null,
        },
      },
      FridgeIngredientScreen: {
        screen: FridgeIngredient,
        navigationOptions: {
          gesturesEnabled: true,
        },
      },
      AddIngredientScreen: {
        screen: AddIngredient,
        navigationOptions: {
          title: 'Add Ingredient',
          gesturesEnabled: true,
        },
      },
      FridgeCommIngredientScreen: {
        screen: FridgeCommIngredient,
        navigationOptions: {
          gesturesEnabled: true,
        },
      },
      AddCommIngredientScreen: {
        screen: AddCommIngredient,
        navigationOptions: {
          title: 'Add Community Ingredient',
          gesturesEnabled: true,
        },
      },
      MakeCommScreen: {
        screen: MakeCommunity,
        navigationOptions: {
          title: 'Make Community',
          gesturesEnabled: true,
        },
      },
      JoinCommScreen: {
        screen: JoinCommunity,
        navigationOptions: {
          title: 'Join Community',
          gesturesEnabled: true,
        },
      },
      ViewCommScreen: {
        screen: FridgeCommunity,
        navigationOptions: {
          title: 'Community Fridge',
          gesturesEnabled: true,
        },
      },
    },
    {
      mode: 'card',
      headerMode: 'screen',
      initialRouteName: signedIn ? 'SignedIn' : 'SignedOut',
    },
  );
};
