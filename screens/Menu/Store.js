import React, { useState, useEffect } from 'react'
import { View, StyleSheet, StatusBar, Dimensions,Image, Text,Alert, KeyboardAvoidingView } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { ScrollView, TouchableWithoutFeedback,TouchableOpacity } from 'react-native-gesture-handler'
import Svg, { Circle } from 'react-native-svg'

import StatusBarWhite from '../../components/UXComponents/StatusBar'
import NavbarBackButton from '../../components/Header/NavbarBackButton'
import StoreIcon from './svg/Ellipse.svg'

const WINDOW_HEIGHT = Dimensions.get('window').height;

const Store = ({ navigation }) => {    
    const [loading, setLoading] = useState(true)
    const [storeData, setStoreData] = useState({})
    const [headerImage, setHeaderImage] = useState("")
    const [images, setImages] = useState([])

    useEffect(() => {
        const bootstrapper = async () => {
            let user = JSON.parse(await AsyncStorage.getItem("user"))
            let token = await AsyncStorage.getItem("jwt")
            return { user, token }
        }
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
                // console.log(requestOptions)
                fetch("https://safeqstore.herokuapp.com/store/storefetch", requestOptions)
                    .then((res) => {
                        if (res.status === 200)
                            res.json()
                                .then(data => { 
                                    setStoreData(data.store)
                                    setImages(data.store.business.images)
                                    setHeaderImage(data.store.business.images[0])
                                    setLoading(false)
                                    })
                        else {
                            Alert.alert("Something went wrong ", res.statusText);
                        }
                    })
            })
    }, [])
    const changeImage = (image) => {
        setHeaderImage(image)
    }
   


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
                                // headerImage ?
                                //     <Image source={{ uri: `data:image/gif;base64,${headerImage}`}} style={styles.avatar} />
                                //     :
                                    <StoreIcon/>
                            }
                            
                        </View>
                    </View>
                </View>

                <View style={styles.contentContainer}>
                    <View style={styles.tabNavigation}>
                        <View style={styles.tab}>
                            <TouchableWithoutFeedback style={styles.tabNavigationObjectSelected}>
                                <Text style={styles.tabNavigationTextSelected}>Store Details</Text>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.tab}>
                            <TouchableWithoutFeedback style={styles.tabNavigationObject}
                            onPress={() => {
                                    navigation.navigate("Business")
                                }}
                            >
                                <Text style={styles.tabNavigationText}>Business Info</Text>
                            </TouchableWithoutFeedback>
                        </View>
                        
                    </View>
                    <View style={styles.carousel}>
                                        {
                                            images.map(img => {
                                                return <View style={styles.carouselImageContainer}>
                                                    <TouchableOpacity
                                                        style={styles.carouselTouchable}
                                                        onPress={() => {
                                                            changeImage(img)
                                                        }}
                                                    >
                                                        <Image
                                                            source={{ uri: `data:image/gif;base64,${img}` }}
                                                            style={
                                                                headerImage === img ? styles.carouselImageSelected : styles.carouselImage
                                                            }
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                            })
                                        }
                    </View>
                        
                
    
                    <View style = {styles.storedescription}>
                        <Text style={styles.subheading}>
                            Store Description
                        </Text>
                        <View  style={styles.value}>
                            <Text>
                               {storeData.description}
                            </Text>
                        </View>
                    </View>
                    <View style = {styles.storedescription}>
                        <Text style={styles.subheading}>
                            Privilege Benefits
                        </Text>
                        <View  style={styles.value}>
                            <Text>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore
                            
                            </Text>
                        </View>
                    </View>
                    <View style = {styles.storedescription}>
                        <Text style={styles.subheading}>
                            Store Hours
                        </Text>
                        <View  style={styles.value}>
                            <Text>
                                10 Am - 7 Pm
                                
                            </Text>
                        </View>
                    </View>
                    <View style = {styles.storedescription}>
                        <Text style={styles.subheading}>
                            Average Appointment Time
                        </Text>
                        <View  style={styles.value}>
                            <Text>
                                45 Mins  
                            </Text>
                        </View>
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
        marginBottom:40,
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
        paddingHorizontal: 10,
        marginTop: 20,
        marginBottom: 10,
    
    },
    tab: {
        flex: 1,
    },
    tabNavigationObject: {
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#6666666F"
    },
    tabNavigationObjectSelected: {
        borderBottomWidth: 2,
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
        color: "#0062FF",
        borderBottomWidth: 1,
        borderColor: "#00000000",
        paddingBottom: 10,
        paddingHorizontal: 15,
    },
    carousel: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        height: Math.floor(WINDOW_HEIGHT / 9),
        marginTop: 20,
        marginBottom : 30,
    },
    carouselImageContainer: {
        marginHorizontal: 10,
        borderColor: "#66666666",
        borderRadius: 6,
        width : 70,
        height : 70,
        flex: 1,
    },
    carouselTouchable: {
        height: "100%"
    },
    carouselImageSelected: {
        width: undefined,
        height: undefined,
        flex: 1,
        borderRadius: 6,
    },
    carouselImage: {
        width: undefined,
        height: undefined,
        flex: 1,
        opacity: 0.3,
        borderRadius: 6,
    },
    subheading: {
        fontSize: 14,
        color : "#6666666F"
    },
    value : {
        marginTop : 10,
        fontSize: 16,
        color : "#6666666F",
    },
    storedescription : {
        borderBottomWidth : 1,
        borderBottomColor : "#E5E5E5",       
        backgroundColor: "#FFF",
        paddingBottom:20,
        marginBottom: 20,
        marginLeft:10,
        marginRight : 10
 
    },
    buttonArea: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 55,
        marginTop:20,
        
    },
    defaultButton: {
        width: Dimensions.get("window").width - 186,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 23,
        backgroundColor: "#0062FF",
        padding: 10,
    },
    defaultButtonText: {
        color: "#FFF",
        fontSize: 16,
    },
    
})

export default Store;