import React, {useEffect} from 'react';
import {GlobalContextProvider} from './providers/GlobalContext';
import messaging from '@react-native-firebase/messaging';
import AppNavigation from './Navigation/Navigation';

const App = () => {
  messaging()
    .getToken()
    .then((firebaseToken) => {
      console.log('FCM -> ', firebaseToken);
    });

  return (
    <GlobalContextProvider>
      <AppNavigation />
    </GlobalContextProvider>
  );
};

export default App;
