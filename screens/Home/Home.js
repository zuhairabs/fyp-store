import React, {useState, useEffect} from 'react';
import {View, StyleSheet, StatusBar, Alert} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import StatusBarWhite from '../../components/UXComponents/StatusBar';
import DefaultCalendar from './Calendar';
import BookingList from './BookingList';

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

var d = new Date();
d.setTime(d.getTime() - d.getTimezoneOffset() * 60 * 1000);
const today = d;
const defaultTabData = [
  {
    title: 'today',
    date: today,
  },
  {
    title: 'tomorrow',
    date: today.addDays(1),
  },
  {
    title: 'this week',
    date: today.addDays(7),
  },
];

export default ({navigation}) => {
  const [tabData, setTabData] = useState(defaultTabData);
  const [selectedTab, setSelectedTab] = useState(0);
  const [dateRange, setDateRange] = useState([today, today]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const changeTab = (index) => {
    setSelectedTab(index);
    let title = tabData[index].title;
    switch (title) {
      case 'today':
        setDateRange([today, today]);
        return;
      case 'tomorrow':
        setDateRange([today.addDays(1), today.addDays(1)]);
        return;
      case 'this week':
        setDateRange([today, today.addDays(7)]);
        return;
    }
  };

  const selectDateFromCalendar = (day) => {
    const date = new Date(day);
    setDateRange([date, date]);
    if (date.getUTCDate() === today.getUTCDate()) {
      setTabData(defaultTabData);
      setSelectedTab(0);
    } else if (date.getUTCDate() === today.addDays(1).getUTCDate()) {
      setTabData(defaultTabData);
      setSelectedTab(1);
    } else {
      setTabData([
        {
          title: date.toDateString(),
          date: date,
        },
      ]);
      setSelectedTab(0);
    }
  };

  const fetchBookings = (day = new Date()) => {
    const bootstrapper = async () => {
      let user = JSON.parse(await AsyncStorage.getItem('user'));
      let token = await AsyncStorage.getItem('jwt');
      return {user, token};
    };
    bootstrapper().then(({user, token}) => {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({
          cred: {
            phone: user.phone,
          },
          date: {
            day: day.day,
            month: day.month,
            year: day.year,
          },
        }),
      };
      fetch(
        'https://safeqstore.herokuapp.com/store/bookings',
        requestOptions,
      ).then((res) => {
        if (res.status === 200)
          res.json().then((data) => {
            setBookings(data.bookings);
            setLoading(false);
          });
        else {
          Alert.alert('Something went wrong ', res.statusText);
        }
      });
    });
  };

  useEffect(() => {
    const date = new Date();
    const day = {
      day: date.getDate(),
      month: date.getUTCMonth() + 1,
      year: date.getUTCFullYear(),
    };
    fetchBookings(day);
  }, []);

  return (
    <View
      style={{
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: '#FFF',
      }}>
      <StatusBarWhite />
      <ScrollView>
        <DefaultCalendar
          setDateRange={selectDateFromCalendar}
          dateRange={dateRange}
        />
        <BookingList
          tabData={tabData}
          changeTab={changeTab}
          selectedTab={selectedTab}
          bookings={bookings}
          loading={loading}
        />
      </ScrollView>
    </View>
  );
};
