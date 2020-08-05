import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { navigationRef } from '../Navigation'
import NotificationIcon from '../../styles/public/res/svg/notifications.svg'
import QrCodeIcon from '../../styles/public/res/svg/qr_code.svg'

export default () => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', height: 26 }}>
        <TouchableOpacity
            onPress={() => navigationRef.current?.navigate("NotificationsFull")}
            style={{ marginRight: 15 }}
        >
            <NotificationIcon />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigationRef.current?.navigate("QrScanner")}>
            <QrCodeIcon />
        </TouchableOpacity>
    </View>
)