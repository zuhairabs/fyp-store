import React from 'react'
import { StatusBar } from 'react-native'

export default StatusBarWhite = () => {
    return (
        <StatusBar
            barStyle="dark-content"
            backgroundColor="#fff00000"
            animated={true}
            translucent
            style={styles.StatusBar}
        />
    )
}