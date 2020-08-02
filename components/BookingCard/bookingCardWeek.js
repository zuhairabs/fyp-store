import React, { useState } from 'react'
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

import Icon from 'react-native-vector-icons/dist/MaterialIcons'
import Cancelled from './cancel.svg'
import CheckCircle from './check_circle.svg'
import Pending from './pending.svg'
import ProfilePhoto from './Ellipse.svg'

const mlist = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const BookingCardWeek = (props) => {
    const [extended, setExtended] = useState(false)

    return (
        <View style={styles.card}>
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    style={styles.mainCard}
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
                                <ProfilePhoto />
                        }

                    </View>
                    <View style={styles.details}>
                        <Text style={styles.header} numberOfLines={1}>
                            {props.booking.user.firstName} {props.booking.user.lastName}
                        </Text>

                        <View style={styles.time}>
                            <Icon name="access-time" size={20} color="#666" />
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
                    <View>
                        <View style={styles.bookingStatusIcon}>
                            {
                                props.booking.status === "upcoming" || props.booking.status === "missed"
                                    ?
                                    <Pending />
                                    :
                                    props.booking.status === "completed"
                                        ?
                                        <CheckCircle />
                                        :
                                        <Cancelled />

                            }
                        </View>
                    </View>
                </TouchableWithoutFeedback>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        width: Dimensions.get("window").width - 40,
        marginBottom: 30,
    },
    container: {
        flex: 1,
        borderRadius: 15,
        backgroundColor: "#fff",
        elevation: 10,
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
        alignItems: "center"
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
        color: "#000000"
    },
    time: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5
    },
    timeText: {
        color: "#666",
        marginLeft: 10,
    },
    bookingStatusIcon: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
    },

})

export default BookingCardWeek;