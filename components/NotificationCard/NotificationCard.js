import React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'

import ProfilePhoto from './svg/Ellipse.svg'

const NotificationCard = ({ notification }) => {

    return (
        <>
            {
                notification.readStatus
                    ? <View style={styles.container}>
                        <View style={styles.imageContainer}>
                            {
                                notification.user && notification.user.avatar
                                    ?
                                    <Image
                                        source={{
                                            uri: `data:image/gif;base64,${notification.user.avatar}`
                                        }}
                                        style={styles.image}
                                    />
                                    :
                                    // <Icon name="person" size={60} color="#0062FF"  style={styles.image}/>
                                    <ProfilePhoto />
                            }
                        </View>
                        <View style={styles.contentContainer}>
                            <Text style={styles.title}>
                                {notification.text}
                                {/* Novato booked an appointment */}
                            </Text>
                            <Text style={styles.date}>
                                {new Date(notification.generatedTime).toLocaleDateString("en-GB", { year: "2-digit", month: "2-digit", day: "2-digit" })}

                            </Text>
                        </View>
                    </View>
                    :
                    <View style={styles.containerUnread}>
                        <View style={styles.imageContainer}>
                            {

                                notification.user && notification.user.avatar ?
                                    <Image
                                        source={{
                                            uri: `data:image/gif;base64,${notification.user.avatar}`
                                        }}
                                        style={styles.image}
                                    />
                                    :
                                    // <Icon name="person" size={60} color="#0062FF"  style={styles.image}/>
                                    <ProfilePhoto />

                            }
                        </View>
                        <View style={styles.contentContainer}>
                            <Text style={styles.title}>
                                {notification.text}
                                {/* Novato booked an appointment */}
                            </Text>
                            <Text style={styles.date}>
                                {new Date(notification.generatedTime).toLocaleDateString("en-GB", { year: "2-digit", month: "2-digit", day: "2-digit" })}
                                {/* 5 Mins ago */}
                            </Text>
                        </View>
                    </View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    containerUnread: {
        backgroundColor: "#0062FF05",
        padding: 20,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        borderColor: "#ECF0F4",
        borderBottomWidth: 1,
    },
    container: {
        backgroundColor: "#fff",
        padding: 20,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        borderColor: "#ECF0F4",
        borderBottomWidth: 1,
    },
    imageContainer: {
        flex: 2,
        marginRight: 20,
    },
    image: {
        height: 60,
        width: 60,
        borderRadius: 60 / 2,
        overflow: "hidden",
    },
    contentContainer: {
        flex: 8,
        justifyContent: "space-around",
        alignItems: "flex-start"
    },
    title: {
        flex: 3,
        color: "#666",
    },
    date: {
        flex: 1,
        fontSize: 10,
        color: "#666",
        marginTop: 10
    }
})

export default NotificationCard;