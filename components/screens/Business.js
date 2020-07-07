import React, { useState, useEffect } from 'react'
import { View, StyleSheet, StatusBar, Dimensions,Image, Text,Alert, Keyboard, KeyboardAvoidingView, ToastAndroid } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { ScrollView, TouchableWithoutFeedback, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import Svg, { Circle } from 'react-native-svg'
import Icon from 'react-native-vector-icons/dist/MaterialIcons'

import StatusBarWhite from '../UXComponents/StatusBar'
import NavbarBackButton from '../Header/NavbarBackButton'
import ProfileBackground from '../UXComponents/ProfileBackground'

const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('screen').height;

const Store = ({ navigation }) => {

    
    const [loading, setLoading] = useState(true)
    const [storeData, setStoreData] = useState({})
    const [headerImage, setHeaderImage] = useState("")
    const [images, setImages] = useState([])

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
    //             fetch("https://shopout.herokuapp.com/store/storefetch", requestOptions)
    //                 .then((res) => {
    //                     if (res.status === 200)
    //                         res.json()
    //                             .then(data => { 
    //                                 setStoreData(data.store)
    //                                 setImages(data.store.business.images)
    //                                 setHeaderImage(data.store.business.images[0])
    //                                 setLoading(false)
    //                                 })
    //                     else {
    //                         Alert.alert("Something went wrong ", res.statusText);
    //                     }
    //                 })
    //         })
    // }, [])
   


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.screenContainer}
        >
            <StatusBarWhite />
            {/* <ProfileBackground /> */}

            <Svg viewBox="0 0 600 600" height="150%" width="150%" style={styles.circleTop}>
                <Circle cx="300"
                    cy="300"
                    r="300"
                    fill="#0062FF" />
            </Svg>

            <ScrollView
                style={styles.container}
            stickyHeaderIndices={[0]}
            >
                <NavbarBackButton color="white" navigation={navigation} />

                <View style={styles.header}>
                    <View style={styles.userPhotoContainer}>
                        <View style={styles.photo}>
                            {
                                headerImage ?
                                    <Image source={{ uri: `data:image/gif;base64,${headerImage}`}} style={styles.avatar} />
                                    :
                                    <Image source={require('./menu-icons/baseline_store_black_48dp.png')}  />
                            }
                            
                        </View>
                    </View>
                </View>

                <View style={styles.contentContainer}>
                    <View style={styles.tabNavigation}>
                        
                        <View style={styles.tab}>
                            <TouchableWithoutFeedback style={styles.tabNavigationObject}
                            onPress={() => {
                                    navigation.navigate("Store")
                                }}
                            >
                                <Text style={styles.tabNavigationText}>Store</Text>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.tab}>
                            <TouchableWithoutFeedback style={styles.tabNavigationObjectSelected}>
                                <Text style={styles.tabNavigationTextSelected}>Business Info</Text>
                            </TouchableWithoutFeedback>
                        </View>
                        
                    </View>
                </View>
                <View style = {styles.businessdescription}>
                    <Text style={styles.subheading}>
                        Business Type
                    </Text>
                    <View  style={styles.value}>
                        <Text>
                            Sole Proprietorship                         
                        </Text>
                    </View>
                </View>
                <View style = {styles.businessdescription}>
                    <Text style={styles.subheading}>
                        Store ID
                    </Text>
                    <View  style={styles.value}>
                        <Text>
                            1234567890                           
                        </Text>
                    </View>
                </View>
                <View style = {styles.businessdescription}>
                    <Text style={styles.subheading}>
                        Contact Number
                    </Text>
                    <View  style={styles.value}>
                         <Text>
                            +91 9876543210                            
                        </Text>
                    </View>
                </View>
                <View style = {styles.businessdescription}>
                    <Text style={styles.subheading}>
                        Address
                    </Text>
                    <View  style={styles.value}>
                        <Text>
                        Kenilworth Mall, Linking Road, Bandra West,
                        Mumbai, Maharashtra 400050                            
                        </Text>
                    </View>
                </View>
                

            </ScrollView>

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: "#FFF",
    },
    container: {
        height: Dimensions.get('window').height,
    },
    contentContainer: {
        paddingHorizontal: 20,
        paddingVertical: 0,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF"
    },
    circleTop: {
        position: "absolute",
        top: "-79%",
        left: "-25%",
    },
    header: {
        justifyContent: "center",
        alignItems: "center",
    },
    userPhotoContainer: {
        height: 133,
        width: 133,
        borderRadius: 140 / 2,
        padding: 20,
        marginTop : 0,
        marginBottom: 0,
        backgroundColor: "#FFFFFF2F",
        justifyContent: "center",
        alignItems: "center",
    },
    photo: {
        height: 120,
        width: 120,
        borderRadius: 120 / 2,
        backgroundColor: "#FFF",
        justifyContent: "center",
        alignItems: "center"
    },
    
    avatar: {
        width: undefined,
        height: undefined,
        flex: 1,
        resizeMode: "contain",
    },
    tabNavigation: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 10,
    },
    tab: {
        flex : 1,
    },
    tabNavigationObject: {
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#6666666F"
    },
    tabNavigationObjectSelected: {
        borderBottomWidth: 3,
        borderColor: "#0062FF",
        alignItems: "center"
    },
    tabNavigationText: {
        fontSize: 18,
        color: "#6666666F",
        borderBottomWidth: 1,
        borderColor: "#00000000",
        paddingBottom: 10,
        paddingHorizontal: 15,
    },
    tabNavigationTextSelected: {
        fontSize: 18,
        color: "#707070",
        borderBottomWidth: 1,
        borderColor: "#00000000",
        paddingBottom: 10,
        paddingHorizontal: 15,
    },
    
    subheading: {
        marginLeft: 20,
        fontSize: 14,
        color : "#6666666F"
    },
    value : {
        marginLeft : 20,
        marginTop : 10,
        fontSize: 16,
        color : "#6666666F",
        
        
    },
    businessdescription : {
        padding : 10,
        borderBottomWidth : 1,
        borderBottomColor : "#6666666F",     
        backgroundColor: "#FFF"
   
    }
    
})

export default Store;