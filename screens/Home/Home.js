import React, {useState, useEffect, useContext} from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import StatusBarWhite from '../../components/UXComponents/StatusBar';
import DefaultCalendar from './Calendar';
import BookingList from './BookingList';
import {GlobalContext} from '../../providers/GlobalContext';
import {Post} from '../../api/http';

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

export default () => {
  const {state} = useContext(GlobalContext);

  const [tabData, setTabData] = useState(defaultTabData);
  const [selectedTab, setSelectedTab] = useState(0);
  const [dateRange, setDateRange] = useState([today, today]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const changeTab = (index) => {
    if (index !== selectedTab) {
      setLoading(true);
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
    }
  };

  const selectDateFromCalendar = (day) => {
    const date = new Date(day);
    const newDateRange = [date, date];
    if (newDateRange !== dateRange) {
      setLoading(true);
      setDateRange(newDateRange);
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
    }
  };

  const fetchBookings = () => {
    const body = JSON.stringify({
      cred: {
        phone: state.user.phone,
      },
      start: dateRange[0],
      end: dateRange[1],
    });
    Post('book/bookings/range', body, state.token).then((data) => {
      setBookings(data.bookings);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchBookings();
  }, [dateRange]);

  return (
    <View style={{backgroundColor: '#FFF'}}>
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
