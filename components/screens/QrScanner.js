import React, { Component } from 'react';
 
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View,
  Alert
} from 'react-native';
 
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import AsyncStorage from '@react-native-community/async-storage'


import StatusBarWhite from '../UXComponents/StatusBar'

const ScanScreen = ({navigation}) => {

    const bootstrapper = async () => {
        let user = JSON.parse(await AsyncStorage.getItem("user"))
        let token = await AsyncStorage.getItem("jwt")
        return { user, token }
    }
    const onSuccess = e => {
           
            bootstrapper()
                .then(({ user, token }) => {
                    const requestOptions = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            authorization: "Bearer " + token,
                        },
                        body: JSON.stringify({
                            cred: {
                                phone: user.phone,
                            },
                        }),
                    }
                    fetch(e.data, requestOptions)
                        .then((res) => {
                            if (res.status === 200){
                               Alert.alert("Scanned Successfully");
                               navigation.navigate("Home");
                            }
                            else {
                                Alert.alert("Something went wrong ", res.statusText);
                                navigation.navigate("Home")
                            }
                        })
                })
                .catch((err)=>{
                    console.log(err.message);
                    Alert.alert("Something went wrong.Please try again");
                    navigation.navigate("Home")
                })
    };
 

    return (
        <>
        <StatusBarWhite />

        <View style ={styles.qr}>
            <QRCodeScanner
                // ref={(node) => {scanner = node }}
                showMarker={true}
                onRead = {onSuccess} 
                cameraStyle = {{marginTop:10}}
               
            />
        </View>  
        </>
    );
}
 
const styles = StyleSheet.create({
 qr : {
    flex : 1,  
    alignContent : "center",
    justifyContent : "center",
 },
 
});
 
export default ScanScreen;