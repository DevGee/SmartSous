import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import Home from '../screen/Home';

test('renders correctly', () => {
  const tree = renderer.create(<Home/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
