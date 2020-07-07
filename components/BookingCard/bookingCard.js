import React, { useState } from 'react'
import { Text, View, StyleSheet, Image, Dimensions, Alert } from 'react-native'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'

import Icon from 'react-native-vector-icons/dist/MaterialIcons'
import AsyncStorage from '@react-native-community/async-storage'

const BookingCard = (props) => {
    const mlist = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const [extended, setExtended] = useState(false)

    // const cancelBooking = () => {
    //     const bootstrapper = async () => {
    //         let token = await AsyncStorage.getItem("jwt")
    //         let user = JSON.parse(await AsyncStorage.getItem("user"))
    //         return ({ user, token })
    //     }
    //     bootstrapper()
    //         .then(({ user, token }) => {
    //             let bookId = props.booking._id;
    //             fetch("https://shopout.herokuapp.com/user/booking/cancel", {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     authorization: "Bearer " + token,
    //                 },
    //                 body: JSON.stringify({
    //                     cred: {
    //                         phone: user.phone,
    //                     },
    //                     bookingData: {
    //                         _id: bookId,
    //                         store: props.booking.store,
    //                         user: user._id,
    //                         visitors: props.booking.visitors,
    //                         end: props.booking.end,
    //                         start: props.booking.start
    //                     },
    //                 }),
    //             }).then((res) => {
    //                 if (res.status === 200) {
    //                     Alert.alert("Booking deleted successfully")
    //                 } else {
    //                     Alert.alert(res.statusText);
    //                 }
    //             });
    //         })

    // };

    return (
        <View style={styles.card}>
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    style={styles.mainCard}
                    // onPress={() => { extended ? setExtended(false) : setExtended(true) }}
                >
                    <View style={styles.dateContainer}>
                        <Text style={styles.date}>
                            {new Date(props.booking.start).getUTCDate()}
                        </Text>
                        <Text style={styles.date}>
                            {mlist[new Date(props.booking.start).getUTCMonth()]}
                        </Text>
                    </View>
                    <View style={styles.imageContainer}>
                        {
                            props.booking.user.avatar ?
                                <Image
                                    source={{
                                    uri: `data:image/gif;base64,${props.booking.user.avatar}`
                                    }}
                                    style={styles.image}
                                />
                            :
                                <Icon name="person" size={60} color="#0062FF"  style={styles.image}/>
                        }

                    </View>
                    <View style={styles.details}>
                        <Text style={styles.header} numberOfLines={1}>
                            {props.booking.user.firstName} {props.booking.user.lastName}
                        </Text>

                        <View style={styles.time}>
                            <Icon name="access-time" size={16} color="#666" />
                            <Text style={styles.timeText}>
                                {
                                    new Date(props.booking.start)
                                        .toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
                                        .replace(/(:\d{2}| [AP]M)$/, "")
                                } - {
                                    new Date(props.booking.end)
                                        .toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
                                        .replace(/(:\d{2}| [AP]M)$/, "")
                                }
                            </Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                {/* {
                    extended
                        ? <View style={styles.extension}>
                            <TouchableOpacity
                                onPress={() => {
                                    props.navigation.navigate("SingleBooking", { booking: props.booking._id })
                                }}
                            >
                                <Text style={styles.tabText}>View</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.extensionTab}>
                                <Text style={styles.tabText}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    Alert.alert(
                                        "Are you sure you want to cancel this appointment?",
                                        "",
                                        [
                                            {
                                                text: "No, don't",
                                                onPress: ()=>{},
                                                style: "default"
                                            },
                                            {
                                                text: "Yes, cancel",
                                                onPress: ()=>{
                                                    cancelBooking()
                                                    props.removeBooking(props.booking._id);
                                                    
                                                },
                                                style: "destructive"
                                            }
                                        ]
                                    )
                                }}
                            >
                                <Text style={styles.tabTextDelete}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                        : null
                } */}
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        width: Dimensions.get("window").width - 40,
        marginBottom: 20,
    },
    container: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: "#fff",
        elevation: 5,
        zIndex: 0,
    },
    mainCard: {
        flex: 2,
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
    },
    dateContainer: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
        borderRightWidth: 1,
        borderColor: "#7070702F"
    },
    date: {
        color: "#666",
    },
    imageContainer: {
        flex: 2,
        marginLeft: 20,
        height: 70,
        width: 70,
        justifyContent: "center",
        alignItems: "center",
        
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 70 / 2,
    },
    details: {
        flex: 5,
        padding: 20,
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    header: {
        fontSize: 18,
        color: "#666"
    },
    time: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    timeText: {
        color: "#666",
        marginLeft: 10,
    },
    extension: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        padding: 20,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderTopWidth: 1,
        borderColor: "#7070702F",
        width: "100%",
    },
    extensionTab: {
        flex: 1,
    },
    tabText: {
        color: "#666"
    },
    tabTextDelete: {
        color: "#F30302"
    }
})

export default BookingCard;