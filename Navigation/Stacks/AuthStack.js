import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
const Stack = createStackNavigator();
import Splash from '../../screens/Authentication/Splash';
import Login from '../../screens/Authentication/Login';
import ResetPassword from './../../screens/Authentication/ResetPassword/ResetPassword';
import Success from '../../screens/Authentication/ResetPassword/Success';

const SCREEN_OPTIONS = {
  headerShown: false,
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

export default ({state}) => {
  if (state.isLoading)
    return (
      <Stack.Navigator screenOptions={SCREEN_OPTIONS}>
        <Stack.Screen name="Splash" component={Splash} />
      </Stack.Navigator>
    );
  else
    return (
      <Stack.Navigator screenOptions={SCREEN_OPTIONS}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="Success" component={Success} />
      </Stack.Navigator>
    );
};
