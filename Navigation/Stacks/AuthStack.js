import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import Splash from '../../screens/Authentication/Splash';
import Login from '../../screens/Authentication/Login';
import SignUp from '../../screens/Authentication/SignUp';

const SCREEN_OPTIONS = { headerShown: false }

export default ({ state }) => {
    if (state.isLoading)
        return (
            <Stack.Navigator screenOptions={SCREEN_OPTIONS}>
                <Stack.Screen
                    name="Splash"
                    component={Splash}
                />
            </Stack.Navigator>
        )
    else
        return (
            <Stack.Navigator screenOptions={SCREEN_OPTIONS}>
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                        animationTypeForReplace: state.loggedIn ? 'push' : 'pop',
                    }}
                />
                <Stack.Screen
                    name="SignUp"
                    component={SignUp}
                />
            </Stack.Navigator>
        )
};