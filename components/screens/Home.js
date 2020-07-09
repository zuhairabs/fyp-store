
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet,StatusBar,Button, Dimensions, Alert,ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/dist/Feather'
import { TouchableWithoutFeedback, TouchableHighlight, TouchableOpacity, ScrollView } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'
import {AuthContext} from '../context'

import { Calendar, LocaleConfig } from 'react-native-calendars'

import StatusBarWhite from '../UXComponents/StatusBar'
import BookingCard from '../BookingCard/bookingCard'

LocaleConfig.locales['en'] = {
    monthNames: ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'],
    monthNamesShort: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEPT', 'OCT', 'NOV', 'DEC'],
    dayNames: ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'],
    dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    today: 'Today'
};
LocaleConfig.defaultLocale = 'en';




const Home = ({navigation}) =>{
    

    Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }
    const date = new Date();
    // console.log(date.getDate());
    // console.log(date.getHours());
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(date.addDays(1));
    const [today,setToday]=useState(date.getDate());
    const [markedDate, setMarkedDate] = useState({});
    const [selectedDay, setSelectedDay] = useState(date.getDate());
    const [selectedMonth, setSelectedMonth] = useState(date.getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(date.getFullYear());

    // console.log({current});
    // console.log({selectedDay})
    // console.log({selectedMonth});

    useEffect(() => {
        const bootstrapper = async () => {
            let user = JSON.parse(await AsyncStorage.getItem("user"))
            let token = await AsyncStorage.getItem("jwt")
            return { user, token }
        }
        bootstrapper()
            .then(({ user, token }) => {
                // console.log({selectedDay});
                // console.log({selectedMonth});
                // console.log({selectedYear});
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
                        // date : selectedDate
                        date : {
                            day : selectedDay,
                            month : selectedMonth,
                            year : selectedYear
                        }
                    }),
                }
                // console.log(requestOptions)
                fetch("https://safeqstore.herokuapp.com/store/bookings", requestOptions)
                    .then((res) => {
                        if (res.status === 200)
                            res.json()
                                .then(data => { setBookings(data.bookings); setLoading(false);
                                    // console.log(data.bookings);
                                   
                                })
                        else {
                            Alert.alert("Something went wrong ", res.statusText)
                        }
                    })
            })
    }, [])
    const onDayPress = (day) => {
        console.log(day);
        // console.log(day.day)
        const selected = day.dateString;
        // console.log(selected);
        // setCurrent(selected);
        const data = {}
        data[selected] = {
            selected: true,
            marked: true,
            selectedColor: "#0062FF",
            color: "#fff"
        }
        setMarkedDate(data);
        setSelectedDay(day.day);
        setSelectedYear(day.year);
        // console.log({selectedDay})
        setSelectedMonth(day.month);
        //  console.log({selectedMonth});
        // console.log({selectedMonth});
        const bootstrapper = async () => {
            let user = JSON.parse(await AsyncStorage.getItem("user"))
            let token = await AsyncStorage.getItem("jwt")
            return { user, token }
        }
        bootstrapper()
            .then(({ user, token }) => {
                // console.log({selectedDay});
                // console.log({selectedMonth});
                // console.log({selectedYear});
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
                        // date : selectedDate
                        date : {
                            day : selectedDay,
                            month : selectedMonth,
                            year : selectedYear
                        }
                    }),
                }
                // console.log(requestOptions)
                fetch("https://safeqstore.herokuapp.com/store/bookings", requestOptions)
                    .then((res) => {
                        if (res.status === 200)
                            res.json()
                                .then(data => { setBookings(data.bookings); setLoading(false);
                                    // console.log(data.bookings);
                                   
                                })
                        else {
                            Alert.alert("Something went wrong ", res.statusText)
                        }
                    })
            })

    }

    // const removeBooking = (_id) =>{
    //     let temp = bookings
    //     let i = temp.indexOf(_id)
    //     if(i > -1)
    //         temp.splice(i)
    //     console.log("Removed booking", _id)
    //     setBookings(temp)
    // }
    const {signOut} = React.useContext(AuthContext);
    return (

        <View style={styles.screenContainer}>
            <StatusBarWhite />
            <ScrollView
                // style={styles.container}
                contentContainerStyle={{
                    justifyContent: "center",
                    alignItems: "center",
                }}

            >

                <View style = {styles.container}>
                    <Calendar style={styles.Calendar}
                        current={current}    
                        monthFormat={'dd MMMM yyyy'}                              
                        hideExtraDays={true}
                        disableAllTouchEventsForDisabledDays={true}
                        theme={{
                        backgroundColor: "#F1F1F1",
                        monthTextColor: "#0062FF",
                        textMonthFontSize: 18,

                        indicatorColor: "#0062FF",
                        arrowColor: "#0062FF",

                        dayTextColor: "#0062FF",
                        selectedDotColor: "#0062FF00",
                        textDayHeaderFontWeight: "bold",
                        }}
                        onDayPress={(day) => { onDayPress(day) }}
                        markedDates={markedDate}
                    />
                </View>
                {
                    today === selectedDay 
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
                                        Alert.alert("Bookings for tomorrow")

                                        }}
                                    >
                                        <Text style={styles.tabNavigationText}>Tomorrow</Text>
                                    </TouchableWithoutFeedback>
                                </View>
                                <View style={styles.tab}>
                                    <TouchableWithoutFeedback style={styles.tabNavigationObject}
                                        onPress = {()=>{Alert.alert("Bookings for this week")}}
                                    >
                                        <Text style={styles.tabNavigationText}>This Week</Text>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        :
                            <View style={styles.selectedDay}>
                            <TouchableWithoutFeedback style={styles.ObjectSelectedDay}>
                                <Text style={styles.TextSelectedDay}>{selectedDay}-{selectedMonth}-{selectedYear}</Text>
                            </TouchableWithoutFeedback>
                        </View>           
                }   
                <ScrollView  contentContainerStyle={{
                    justifyContent: "center",
                    alignItems: "center",
                }}>

                    {
                        loading
                            ? <View style=
                                {{
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: Dimensions.get('window').height - 100,
                                    width: "100%"
                                }}
                             >
                                <ActivityIndicator size="large" color="#0062FF" />
                                </View>
                            : <View style={styles.results}>
                                {
                                    bookings.map(booking => {
                                        return <BookingCard key={booking._id} booking={booking} navigation={navigation}  />
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
        backgroundColor: "#F8F9FD",
        // justifyContent: "center",
        // alignItems: "center",
    },
    container: {
        width: Dimensions.get('window').width,
        flex:1,
        backgroundColor : "#F8F9FD",
       
        // justifyContent: "center",
        // alignItems: "center"
    },
    body: {
        flex: 7,
        backgroundColor: "#FFF",
        marginTop: 20,
    },
    text: {
        fontSize: 56,
        fontWeight: "bold",
        color: "#0062FF"
    },
    tabNavigation: {
        // width: "100%",
        flex : 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingHorizontal: 20,
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
        borderBottomWidth: 3,
        borderColor: "#0062FF",
        alignItems: "center"
    },
    tabNavigationText: {
        fontSize: 14,
        color: "#6666666F",
        borderBottomWidth: 1,
        borderColor: "#00000000",
        paddingBottom: 10,
        paddingHorizontal: 15,
    },
    tabNavigationTextSelected: {
        fontSize: 14,
        color: "#707070",
        borderBottomWidth: 1,
        borderColor: "#00000000",
        paddingBottom: 10,
        paddingHorizontal: 15,
    },
    selectedDay : {
        flex : 1,
        padding : 10,
        justifyContent : "flex-start",
        alignItems : "flex-start",
        // flexDirection : "row",
        // paddingHorizontal: 20,
        // marginTop: 20,
        // marginBottom: 30,

    },
    ObjectSelectedDay:{
        borderBottomWidth: 3,
        borderColor: "#0062FF",
        // alignItems: "center",
        justifyContent : "flex-start",
        alignItems : "flex-start",
    },
    TextSelectedDay : {
        fontSize: 18,
        color: "#707070",
        borderBottomWidth: 1,
        borderColor: "#00000000",
        paddingBottom: 10,
        paddingHorizontal: 15,
    }
})


export default Home;