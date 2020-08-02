import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';

import MenuIcon from './svg/menu-black'

const Menu = ({ navigation }) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate("Profile")} >
            <MenuIcon />
        </TouchableOpacity>
    )
}
export default Menu;
