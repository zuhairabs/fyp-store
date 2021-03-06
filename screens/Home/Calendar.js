import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

import {
  monthNames,
  monthNamesShort,
  dayNames,
  dayNamesShort,
} from './CalendarConfig';

LocaleConfig.locales['en'] = {
  monthNames,
  monthNamesShort,
  dayNames,
  dayNamesShort,
  today: 'Today',
};
LocaleConfig.defaultLocale = 'en';

const selectedDayProps = {
  selected: true,
  selectedColor: '#0062FF',
  color: '#fff',
};

const MarkedDayProps = {
  selectedColor: '#0062FF',
  color: '#fff',
};

const getMarkedDays = () => {
  let res = {};
  var d = new Date();
  d.setTime(d.getTime() - d.getTimezoneOffset() * 60 * 1000);
  const today = d.toISOString().split('T')[0];
  res[today] = MarkedDayProps;
  return res;
};

const getDayDisplay = (dateRange) => {
  const start = dateRange[0].getUTCDate();
  const end = dateRange[1].getUTCDate();
  if (start === end) return start;
  else return `${start} - ${end}`;
};

export default ({setDateRange, dateRange}) => {
  const [selectedDate, setSelectedDate] = useState({});

  const onDayPress = (day) => {
    const selected = day.dateString;
    const data = {};
    data[selected] = selectedDayProps;
    setSelectedDate(data);
    setDateRange(day.timestamp);
  };

  useEffect(() => {
    const selected = dateRange[0].toISOString().split('T')[0];
    const data = {};
    data[selected] = selectedDayProps;
    setSelectedDate(data);
  }, [dateRange]);

  return (
    <View style={styles.container}>
      <Calendar
        style={styles.Calendar}
        current={new Date()}
        minDate={new Date().addDays(-2)}
        maxDate={new Date().addDays(31)}
        monthFormat={`${getDayDisplay(dateRange)} MMMM yyyy`}
        hideExtraDays
        disableAllTouchEventsForDisabledDays={true}
        theme={calendarTheme}
        onDayPress={(day) => {
          onDayPress(day);
        }}
        markedDates={{...getMarkedDays(), ...selectedDate}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Calendar: {
    borderRadius: 18,
    height: 380,
  },
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 20,
    justifyContent: 'center',
  },
});

const calendarTheme = {
  backgroundColor: '#f1f1f1',
  calendarBackground: '#f1f1f1',
  monthTextColor: '#0062FF',
  textMonthFontSize: 18,
  'stylesheet.calendar.header': {
    week: {
      marginTop: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      color: '#666',
    },
  },
  indicatorColor: '#0062FF',
  arrowColor: '#0062FF',
  todayTextColor: '#033e96',
  dayTextColor: '#0062FF',
};
