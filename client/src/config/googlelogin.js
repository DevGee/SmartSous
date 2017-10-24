import Expo from 'expo';

async function signInWithGoogleAsync() {
  try {
    const result = await Expo.Google.logInAsync({
      iosClientId: '232265074930-m9t017geinjaib6jn5vqu72ukiva0lhn.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
      return result.accessToken;
    }
    return { cancelled: true };
  }
  catch (e) {
    return { error: true };
  }
}
