import AsyncStorage from '@react-native-community/async-storage';

export default () => {
  return new Promise(async (resolve, reject) => {
    const token = await AsyncStorage.getItem('jwt');
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    if (token && user) {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({
          cred: {
            phone: user.phone,
          },
        }),
      };
      fetch('https://shopout.herokuapp.com/store/verify', requestOptions).then(
        (res) => {
          if (res.status === 200) resolve({token, user});
          else reject(`Token verification returned ${res.status}`);
        },
        (e) => {
          reject(e);
        },
      );
    } else {
      reject('No user logon');
    }
  });
};
