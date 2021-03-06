import React from 'react';
import IconMat from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFA from 'react-native-vector-icons/FontAwesome';

export const TabIconFA = ({ focused, iconDefault, iconFocused, tintColor }) => {
  return (
    <IconFA
      name={focused ? iconFocused : iconDefault}
      size={28}
      style={{ color: tintColor }}
    />
  );
};

export const TabIconMat = ({ focused, iconDefault, iconFocused, tintColor }) => {
  return (
    <IconMat
      name={focused ? iconFocused : iconDefault}
      size={28}
      style={{ color: tintColor }}
    />
  );
};
