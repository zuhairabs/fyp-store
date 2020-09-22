import AsyncStorage from '@react-native-community/async-storage';
import {Post} from '../api/http';

export default () => {
  return new Promise(async (resolve, reject) => {
    const token = await AsyncStorage.getItem('jwt');
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    if (token && user) {
      const body = JSON.stringify({
        cred: {
          phone: user.phone,
        },
      });
      Post('auth/verify', body, token)
        .then(() => resolve({token, user}))
        .catch((e) => reject(`Token verification returned ${res.status}`));
    } else {
      reject('No user logon');
    }
  });
};
