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

import StatusBarWhite from '../UXComponents/StatusBar'

 
// class ScanScreen extends Component {
//   onSuccess = e => {
//     // Linking.openURL(e.data).catch(err =>
//     //   console.error('An error occured', err)
//     // );
//     Alert.alert("QR Scanned Successfully");
//     navigation.navigate("Home");
//   };
const ScanScreen = ({navigation}) => {
    const onSuccess = e => {
        //     // Linking.openURL(e.data).catch(err =>
        //     //   console.error('An error occured', err)
        //     // );
        // useEffect(() => {
        //     const bootstrapper = async () => {
        //         let user = JSON.parse(await AsyncStorage.getItem("user"))
        //         let token = await AsyncStorage.getItem("jwt")
        //         return { user, token }
        //     }
        //     bootstrapper()
        //         .then(({ user, token }) => {
        //             const requestOptions = {
        //                 method: "POST",
        //                 headers: {
        //                     "Content-Type": "application/json",
        //                     authorization: "Bearer " + token,
        //                 },
        //                 body: JSON.stringify({
        //                     cred: {
        //                         phone: user.phone,
        //                     },
        //                 }),
        //             }
        //             // console.log(requestOptions)
        //             fetch(e.data, requestOptions)
        //                 .then((res) => {
        //                     if (res.status === 200){
        //                        Alert.alert("Scanned Successfully");
        //                        navigation.navigate("Home");
        //                     }
        //                     else {
        //                         Alert.alert("Something went wrong ", res.statusText);
        //                     }
        //                 })
        //         })
        // }, [])

        Alert.alert("QR Scanned Successfully");
        // navigation.navigate("Home");
    };
 
//   render() {
    return (
        <>
        <StatusBarWhite />

        <View style ={styles.qr}>
            <QRCodeScanner
                onRead = {onSuccess} 
                cameraStyle = {{marginTop:10}}
                // topContent = {
                //     <Text  style={styles.centerText}>Scan the qr code </Text>
                // }
                // flashMode={RNCamera.Constants.FlashMode.torch}
            />
        </View>  
        </>
    );
//   }
}
 
const styles = StyleSheet.create({
 qr : {
    flex : 1,  
    alignContent : "center",
    justifyContent : "center",
 },
 
});
 
// AppRegistry.registerComponent('default', () => ScanScreen);
export default ScanScreen;