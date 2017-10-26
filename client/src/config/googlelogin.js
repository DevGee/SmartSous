import Expo from 'expo';

signInWithGoogleAsync = async () => {
  try {
    const result = await Expo.Google.logInAsync({
      iosClientId: '232265074930-m9t017geinjaib6jn5vqu72ukiva0lhn.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });

    //console.log(result);

    if (result.type === 'success') {
      return result.accessToken;
    }
    return { cancelled: true };
  } catch (e) {
    //console.log(e);
    return { error: true };
  }
};

export default onLoginPress = async () => {
  const result = await signInWithGoogleAsync();
  // If there is no result.error or result.cancelled, the user is logged in
  // do something with the result.
  //console.log(result);
  return result;
};
