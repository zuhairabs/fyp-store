import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Calendar} from 'react-native-calendars';

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

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
  const today = new Date().toISOString().split('T')[0];
  res[today] = MarkedDayProps;
  return res;
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
        monthFormat={'MMMM yyyy'}
        hideExtraDays={true}
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
  },
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
  },
});

const calendarTheme = {
  backgroundColor: '#f6f6f6',
  calendarBackground: '#f6f6f6',
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
