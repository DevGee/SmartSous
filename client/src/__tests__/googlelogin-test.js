import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import onLoginPress from '../config/googlelogin';

it('google login with async/await (return error: true)', async () => {
  expect.assertions(1);
  const data = await onLoginPress();
  expect(data).toEqual({"error": true });
});

