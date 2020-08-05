import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { navigationRef } from '../Navigation'

export default () => (
    <View>
        <TouchableOpacity onPress={() => { navigationRef.current?.navigate("Profile") }}>
            <Icon
                name='menu'
                size={30}
                color='#000'
            />
        </TouchableOpacity>
    </View>
)