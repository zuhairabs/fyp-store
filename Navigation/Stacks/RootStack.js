import React from 'react'
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import Home from '../../screens/Home/Home';
import TomorrowBookings from '../../screens/Home/TomorrowBookings';
import WeekBookings from '../../screens/Home/WeekBookings';
import NotificationsFull from '../../screens/Notifications/NotificationsFull';
import Profile from '../../screens/Menu/Profile'
import Store from '../../screens/Menu/Store';
import Business from '../../screens/Menu/Business';
import Support from '../../screens/Misc/Support';
import QrScanner from '../../screens/QRScanner/QrScanner';

import BackButton from '../../components/UXComponents/BackButton';
import RightMenuIcons from '../HeaderIcons/Right'
import Hamburger from '../HeaderIcons/Hamburger'

const HEADER_OPTIONS = {
    headerShown: true,
    headerRightContainerStyle: {
        padding: 20,
    },
    headerLeftContainerStyle: {
        padding: 20,
    },
    headerTitleStyle: {
        fontSize: 26,
        fontWeight: "normal"
    },
}

export default () => (
    <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen
            name="Home"
            component={Home}
            options={{
                title: "Schedule",
                headerLeft: Hamburger,
                headerRight: RightMenuIcons,
                ...HEADER_OPTIONS
            }}
        />
        <Stack.Screen
            name="TomorrowBookings"
            component={TomorrowBookings}
            options={{
                title: "Schedule",
                headerShown: true,
                headerLeft: Hamburger,
                headerRight: RightMenuIcons,
                ...HEADER_OPTIONS
            }}
        />
        <Stack.Screen
            name="WeekBookings"
            component={WeekBookings}
            options={{
                title: "Schedule",
                headerLeft: Hamburger,
                headerRight: RightMenuIcons,
                ...HEADER_OPTIONS
            }}
        />
        <Stack.Screen
            name="Profile"
            component={Profile}
        />
        <Stack.Screen
            name="Store"
            component={Store}
        />
        <Stack.Screen
            name="Support"
            component={Support}
            options={{
                title: "Support",
                headerBackImage: () => {
                    return <BackButton />
                },
                ...HEADER_OPTIONS
            }}
        />
        <Stack.Screen
            name="Business"
            component={Business}
        />
        <Stack.Screen
            name="NotificationsFull"
            component={NotificationsFull}
            options={{
                title: "Notifications",
                ...HEADER_OPTIONS,
                headerBackImage: () => {
                    return <BackButton />
                },
                headerRight: () => (
                    <TouchableOpacity
                        onPress={() => clearNotifications()}
                    >
                        <Text style={{ color: "#6666666F" }}>
                            MARK ALL AS SEEN
                        </Text>
                    </TouchableOpacity>
                ),
            }}
        />
        <Stack.Screen
            name="QrScanner"
            component={QrScanner}
            options={{
                title: "QrScanner",
                ...HEADER_OPTIONS,
                headerBackImage: () => {
                    return <BackButton />
                },
            }}
        />
    </Stack.Navigator>
)