import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, StatusBar, Dimensions, Image, Alert } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'

import { GlobalContext } from '../../providers/GlobalContext'

import StatusBarWhite from '../../components/UXComponents/StatusBar'
import MenuBackground from '../../components/Backgrounds/MenuBackground'

import StoreIcon from './svg/Ellipse.svg'

const Profile = ({ navigation }) => {
    const { authActions } = useContext(GlobalContext);
    const [user, setUser] = useState({})

    useEffect(() => {
        const bootstraper = async () => {
            let storedUser = JSON.parse(await AsyncStorage.getItem("user"))
            return storedUser
        }
        bootstraper()
            .then((storedUser) => {
                setUser(storedUser);
            })
    }, [])

    return (
        <View style={styles.screenContainer}>
            <StatusBarWhite />
            <MenuBackground />
            <ScrollView style={styles.container}>

                <View style={styles.contentContainer}>

                    <View style={styles.header}>
                        <View style={styles.userPhotoContainer}>
                            <View style={styles.photo}>
                                {
                                    user.avatar ?
                                        <Image source={{ uri: `data:image/gif;base64,${user.avatar}` }} style={styles.avatar} />
                                        :
                                        <StoreIcon />
                                }
                            </View>
                        </View>
                        <View style={styles.details}>
                            <Text style={styles.name}>{user.name}</Text>
                            <Text style={styles.name}>{user.location_desc},{user.city}</Text>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("Store");
                            }}
                            style={styles.button}
                        >
                            <View style={styles.buttonIcon}>
                                <Image source={require('./menu-icons/baseline_store_black_48dp.png')} style={styles.buttonIconImage} />
                            </View>
                            <Text style={styles.buttonText}>My Store</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("Support");
                            }}
                            style={styles.button}
                            style={styles.button}
                        >
                            <View style={styles.buttonIcon}>
                                <Image source={require('./menu-icons/help_outline-24px.png')} style={styles.buttonIconImage} />
                            </View>
                            <Text style={styles.buttonText}>Support</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                Alert.alert(
                                    "Do you want to logout?",
                                    "",
                                    [
                                        {
                                            text: "NO",
                                            onPress: () => { },
                                            style: "cancel"
                                        },
                                        {
                                            text: "YES",
                                            onPress: () => { authActions.signOut() },
                                            style: "default"
                                        }
                                    ]
                                )
                            }}
                        >
                            <View style={styles.buttonIcon}>
                                <Image source={require('./menu-icons/logout-black-48dp.png')} style={styles.buttonIconImage} />
                            </View>
                            <Text style={styles.buttonText}>Logout</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: "#FFF",
    },
    container: {
        height: Dimensions.get('window').height
    },
    contentContainer: {
        paddingHorizontal: 20,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    header: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    details: {
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: 20,
        marginVertical: 20,
    },
    name: {
        fontSize: 18,
        color: "#FFF",
        fontWeight: "bold",
    },
    number: {
        color: "#FFF",
        fontWeight: "bold",

    },
    userPhotoContainer: {
        height: 100,
        width: 100,
        borderRadius: 100 / 2,
        // elevation: 3,
        padding: 20,
        marginVertical: 20,
        backgroundColor: "#FFFFFF2F",
        justifyContent: "center",
        alignItems: "center"
    },
    photo: {
        height: 80,
        width: 80,
        borderRadius: 80 / 2,
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
    buttonContainer: {
        marginTop: 50,
        justifyContent: "space-around",
        alignItems: "center",
        width: Math.floor(Dimensions.get("window").width / 1.5),
        // borderWidth: 1,
    },
    button: {
        marginVertical: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    buttonIcon: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 24,
        width: 24
    },
    buttonIconImage: {
        width: 24,
        height: 24,
        resizeMode: "contain"
    },
    buttonText: {
        flex: 8,
        paddingHorizontal: 20,
        fontSize: 18,
    },
})

export default Profile