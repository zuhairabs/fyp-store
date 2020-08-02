
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, StatusBar, Dimensions, Alert, ActivityIndicator } from 'react-native'
import { TouchableWithoutFeedback, ScrollView } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'

import { Calendar, LocaleConfig } from 'react-native-calendars'

import BookingCard from '../../components/BookingCard/bookingCard'
import StatusBarWhite from '../../components/UXComponents/StatusBar'

LocaleConfig.locales['en'] = {
    monthNames: ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'],
    monthNamesShort: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEPT', 'OCT', 'NOV', 'DEC'],
    dayNames: ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'],
    dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    today: 'Today'
};
LocaleConfig.defaultLocale = 'en';


const Home = ({ navigation }) => {
    Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }
    Date.prototype.previousDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() - days);
        return date;
    }
    const date = new Date();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(date.addDays(1));
    const [maxDate, _setMaxDate] = useState(date.addDays(30));
    const [minDate, _setMinDate] = useState(date.previousDays(30));
    const [today, setToday] = useState(date.getDate());
    const [tomorrow, setTomorrow] = useState((date.addDays(1)).getDate());
    const [markedDate, setMarkedDate] = useState({});
    const [selectedDay, setSelectedDay] = useState(date.getDate());
    const [selectedMonth, setSelectedMonth] = useState(date.getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(date.getFullYear());

    const fetchBookings = (day = new Date()) => {
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
                        date: {
                            day: day.day,
                            month: day.month,
                            year: day.year
                        }
                    }),
                }
                fetch("https://safeqstore.herokuapp.com/store/bookings", requestOptions)
                    .then((res) => {
                        if (res.status === 200)
                            res.json()
                                .then(data => {
                                    setBookings(data.bookings); setLoading(false);
                                })
                        else {
                            Alert.alert("Something went wrong ", res.statusText)
                        }
                    })
            })

    }

    useEffect(() => {
        const day = {
            day: date.getDate(),
            month: date.getUTCMonth() + 1,
            year: date.getUTCFullYear()
        }
        fetchBookings(day);
    }, [])

    const onDayPress = (day) => {
        console.log(day);
        const setData = async () => {
            const selected = day.dateString;
            const data = {}
            data[selected] = {
                selected: true,
                marked: true,
                selectedColor: "#0062FF",
                color: "#fff"
            }
            return data;
        }
        const setstate = async (data) => {
            setMarkedDate(data);
            setSelectedDay(day.day);
        }
        setData().then((data) => {
            setstate(data).then(() => {
                fetchBookings(day);
            })

        })
    }

    return (

        <View style={styles.screenContainer}>
            <StatusBarWhite />
            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 10
                    // justifyContent: "center",
                    // alignItems: "center",
                }}
            >
                <View style={styles.container}>
                    <Calendar style={styles.Calendar}
                        current={current}
                        minDate={minDate}
                        maxDate={maxDate}
                        monthFormat={'MMMM yyyy'}
                        hideExtraDays={true}
                        disableAllTouchEventsForDisabledDays={true}
                        theme={{
                            backgroundColor: "#F1F1F1",
                            calendarBackground: '#F1F1F1',
                            monthTextColor: "#0062FF",
                            textMonthFontSize: 18,
                            'stylesheet.calendar.header': {
                                week: {
                                    marginTop: 5,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    color: "#666666"
                                },

                            },
                            indicatorColor: "#0062FF",
                            arrowColor: "#0062FF",
                            dayTextColor: "#0062FF",
                            selectedDotColor: "#0062FF00",
                            textDayHeaderFontWeight: "bold",
                            todayTextFontWeight: "bold"
                        }}
                        onDayPress={(day) => { onDayPress(day) }}
                        markedDates={markedDate}
                    />
                </View>
                {
                    selectedDay === today
                        ?
                        <View style={styles.tabNavigation}>
                            <View style={styles.tab}>
                                <TouchableWithoutFeedback style={styles.tabNavigationObjectSelected}>
                                    <Text style={styles.tabNavigationTextSelected}>Today</Text>
                                </TouchableWithoutFeedback>
                            </View>
                            <View style={styles.tab}>
                                <TouchableWithoutFeedback style={styles.tabNavigationObject}
                                    onPress={() => {
                                        navigation.navigate("TomorrowBookings")
                                    }}
                                >
                                    <Text style={styles.tabNavigationText}>Tomorrow</Text>
                                </TouchableWithoutFeedback>
                            </View>
                            <View style={styles.tab}>
                                <TouchableWithoutFeedback style={styles.tabNavigationObject}
                                    onPress={() => {
                                        navigation.navigate("WeekBookings")
                                    }}
                                >
                                    <Text style={styles.tabNavigationText}>This Week</Text>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                        :
                        selectedDay === tomorrow
                            ?
                            navigation.navigate("TomorrowBookings")
                            :

                            <View style={styles.selectedDay}>
                                <TouchableWithoutFeedback style={styles.ObjectSelectedDay}>
                                    <Text style={styles.TextSelectedDay}>{selectedDay}-{selectedMonth}-{selectedYear}</Text>
                                </TouchableWithoutFeedback>
                            </View>
                }
                <ScrollView contentContainerStyle={{
                    justifyContent: "center",
                    alignItems: "center",
                }}>

                    {
                        loading
                            ? <View style=
                                {{
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                    height: Dimensions.get('window').height - 100,
                                    width: "100%"
                                }}
                            >
                                <ActivityIndicator size="large" color="#0062FF" />
                            </View>
                            : <View style={styles.results}>
                                {
                                    bookings.length === 0
                                        ?
                                        <View style={{ justifyContent: "center", alignItems: "center", padding: 20 }}>
                                            <Text style={{ color: "#666", fontSize: 16 }}>No bookings </Text>
                                        </View>
                                        :
                                        bookings.map(booking => {
                                            return <BookingCard key={booking._id} booking={booking} navigation={navigation} />
                                        })
                                }

                            </View>
                    }
                </ScrollView>
            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    screenContainer: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: "#FFFFFF",
    },
    container: {
        // width: Dimensions.get('window').width,
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: "center",
    },
    Calendar: {
        borderRadius: 18,
    },
    text: {
        fontSize: 56,
        fontWeight: "bold",
        color: "#0062FF"
    },
    tabNavigation: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingBottom: 0,
        marginTop: 20,
        marginLeft: 20,
        marginBottom: 30,
        backgroundColor: "#FFFFFF",

    },
    tab: {
        // flex: 1,

    },
    tabNavigationObject: {
        alignItems: "flex-start",
    },
    tabNavigationObjectSelected: {
        borderBottomWidth: 3,
        borderColor: "#0062FF",
        alignItems: "flex-start"
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
    },
    selectedDay: {

        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingHorizontal: 20,
        padding: 20,
        paddingBottom: 0,
        marginTop: 10,
        marginBottom: 30,
        backgroundColor: "#FFFFFF",

    },
    ObjectSelectedDay: {
        borderBottomWidth: 3,
        borderColor: "#0062FF",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    TextSelectedDay: {
        fontSize: 18,
        color: "#707070",
        borderBottomWidth: 1,
        borderColor: "#00000000",
        paddingBottom: 10,
        paddingHorizontal: 15,
    }
})


export default Home;