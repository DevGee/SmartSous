import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import Profile from '../screen/Profile';

test('renders correctly', () => {
  const tree = renderer.create(<Profile/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
