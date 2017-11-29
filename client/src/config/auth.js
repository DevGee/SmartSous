import axios from 'axios';
import { AccessToken } from 'react-native-fbsdk';

global.USERID = null;

export const getUserID = () => {
  AccessToken.getCurrentAccessToken()
    .then((data) => {
      if (data) {
        global.USERID = data.userID;
      }
    })
    .catch((err) => {
      // Catch promise rejection error
    });
};
