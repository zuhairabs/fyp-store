import React, {useContext, useEffect, createRef, useState} from 'react';
import {Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {GlobalContext} from '../providers/GlobalContext';
import AuthStack from './Stacks/AuthStack';
import MainStack from './Stacks/RootStack';
import messaging from '@react-native-firebase/messaging';
import verifyLogin from '../providers/UserVerification';

export const navigationRef = createRef();
export default () => {
  const {state, dispatch} = useContext(GlobalContext);
  const [initialRoute, setInitialRoute] = useState('Home');

  useEffect(() => {
    verifyLogin().then(
      ({token, user}) => {
        dispatch({type: 'RESTORE_TOKEN', token, user});
      },
      (e) => {
        dispatch({type: 'RESTORE_TOKEN', token: null, user: null});
        console.log(e);
      },
    );
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      console.log(remoteMessage);
      const type = remoteMessage.data.type;
      if (type && type === 'booking-1') {
        console.log(remoteMessage);
        const bookingId = remoteMessage.data.booking;
        let archived = remoteMessage.data.archived;
        let isArchived = archived === 'false' ? false : true;
        if (isArchived) {
          navigationRef.current?.navigate('Home');
        } else if (bookingId) {
          console.log(bookingId);
          navigationRef.current?.navigate('Booking', {bookingId});
        }
      } else {
        navigationRef.current?.navigate('Home');
      }
    });
    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        console.log(remoteMessage);
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          setInitialRoute('Home');
        }
      });
    const message = messaging().onMessage(async (remoteMessage) => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      const type = remoteMessage.data.type;
      if (type && type === 'booking-1') {
        Alert.alert('Upcoming Booking', 'Upcoming booking in next 1 minute');
      } else if (type && type === 'booking-15') {
        Alert.alert('Upcoming Booking', 'Upcoming booking in next 15 minutes');
      } else if (type && type === 'booking-60') {
        Alert.alert('Upcoming Booking', 'Upcoming booking in next 60 minutes');
      } else if (type && type === 'booking-missed') {
        Alert.alert('Missed Booking', 'You missed a booking');
      }
      console.log(remoteMessage);
    });
    return message;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialRoute]);

  const currentStack =
    state.token === null ? (
      <AuthStack state={state} />
    ) : (
      <MainStack initialRouteName={initialRoute} />
    );

  return (
    <NavigationContainer ref={navigationRef}>
      {currentStack}
    </NavigationContainer>
  );
};
