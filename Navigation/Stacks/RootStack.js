import React from 'react';
import {Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
const Stack = createStackNavigator();

import Home from '../../screens/Home/Home';
import NotificationsFull from '../../screens/Notifications/NotificationsFull';
import Profile from '../../screens/Menu/Profile';
import Support from '../../screens/Misc/Support';
import QrScanner from '../../screens/QRScanner/QrScanner';
import RTCVideo from '../../screens/RTCVideo/RTCVideo';

import BackButton from '../../components/UXComponents/BackButton';
import RightMenuIcons from '../HeaderIcons/Right';
import Hamburger from '../HeaderIcons/Hamburger';
import Details from '../../screens/Menu/Details';
import SingleBooking from '../../screens/Booking/SingleBooking';

const HEADER_OPTIONS = {
  headerShown: true,
  headerRightContainerStyle: {
    padding: 20,
  },
  headerLeftContainerStyle: {
    padding: 20,
  },
  headerTitleStyle: {
    fontSize: 24,
    fontWeight: 'normal',
  },
};

const SCREEN_OPTIONS = {
  headerShown: false,
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

export default ({initialRouteName}) => (
  <Stack.Navigator
    screenOptions={SCREEN_OPTIONS}
    initialRouteName={initialRouteName}>
    <Stack.Screen
      name="Home"
      component={Home}
      options={{
        title: 'Schedule',
        headerLeft: Hamburger,
        headerRight: RightMenuIcons,
        ...HEADER_OPTIONS,
      }}
    />
    <Stack.Screen
      name="Booking"
      component={SingleBooking}
      options={{
        title: 'Schedule',
        headerBackImage: () => {
          return <BackButton />;
        },
        ...HEADER_OPTIONS,
      }}
    />
    <Stack.Screen name="RTCVideo" component={RTCVideo} />
    <Stack.Screen
      name="Profile"
      options={{
        gestureDirection: 'horizontal-inverted',
      }}
      component={Profile}
    />
    <Stack.Screen
      name="Details"
      options={{
        gestureDirection: 'horizontal-inverted',
      }}
      component={Details}
    />
    <Stack.Screen
      name="Support"
      component={Support}
      options={{
        title: 'Support',
        headerBackImage: () => {
          return <BackButton />;
        },
        ...HEADER_OPTIONS,
      }}
    />
    <Stack.Screen
      name="NotificationsFull"
      component={NotificationsFull}
      options={{
        title: 'Notifications',
        ...HEADER_OPTIONS,
        headerBackImage: () => {
          return <BackButton />;
        },
        headerRight: () => (
          <TouchableOpacity onPress={() => clearNotifications()}>
            <Text style={{color: '#6666666F'}}>MARK ALL AS SEEN</Text>
          </TouchableOpacity>
        ),
      }}
    />
    <Stack.Screen name="QrScanner" component={QrScanner} />
  </Stack.Navigator>
);
