import React from 'react'
import { View,Alert} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';


import MenuIcon from './menu-black.svg'

const Menu = ({navigation}) => {
    return (    
        <TouchableOpacity onPress={()=> navigation.navigate("Profile")} >
            <MenuIcon />
        </TouchableOpacity> 
        
        
        
    )
}
export default Menu;
