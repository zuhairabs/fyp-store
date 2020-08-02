import React, { useState } from 'react'
import { View, StyleSheet, StatusBar, Dimensions, Text, KeyboardAvoidingView } from 'react-native'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Svg, { Circle } from 'react-native-svg'

import StatusBarWhite from '../../components/UXComponents/StatusBar'
import NavbarBackButton from '../../components/Header/NavbarBackButton'

import StoreIcon from './Ellipse.svg'
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
                                // headerImage ?
                                //     <Image source={{ uri: `data:image/gif;base64,${headerImage}`}} style={styles.avatar} />
                                //     :
                                <StoreIcon />
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
                    <View style={styles.businessdescription}>
                        <Text style={styles.subheading}>
                            Store ID
                        </Text>
                        <View style={styles.value}>
                            <Text>
                                1234567890
                            </Text>
                        </View>
                    </View>
                    <View style={styles.businessdescription}>
                        <Text style={styles.subheading}>
                            Contact Number
                        </Text>
                        <View style={styles.value}>
                            <Text>
                                +91 9876543210
                            </Text>
                        </View>
                    </View>
                    <View style={styles.businessdescription}>
                        <Text style={styles.subheading}>
                            Address
                        </Text>
                        <View style={styles.value}>
                            <Text>
                                Kenilworth Mall, Linking Road, Bandra West,
                                Mumbai, Maharashtra 400050
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
        paddingHorizontal: 30,
        paddingVertical: 0,
        marginTop: 20,
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
        marginTop: 0,
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
        // paddingHorizontal: 10,
        marginTop: 20,
        marginBottom: 30,
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

    subheading: {
        // marginLeft: 10,
        fontSize: 14,
        color: "#6666666F"
    },
    value: {
        // marginLeft : 10,
        marginTop: 10,
        fontSize: 16,
        color: "#6666666F",
        paddingRight: 20,



    },
    businessdescription: {
        borderBottomWidth: 1,
        borderBottomColor: "#E5E5E5",
        backgroundColor: "#FFF",
        paddingBottom: 20,
        marginBottom: 20

    },
    buttonArea: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // width: "10%",
        marginBottom: 55,
        marginTop: 20,

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
        // textTransform: "uppercase",
        // fontWeight: "bold"
    },

})

export default Store;