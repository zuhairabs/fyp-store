import React, {useState} from 'react';
import {Text, View, StyleSheet, Image, Dimensions} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

import Cancelled from './svg/cancel.svg';
import CheckCircle from './svg/check_circle.svg';
import Pending from './svg/pending.svg';

const monthList = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const formatDate = (date) => {
  return new Date(date)
    .toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
    .replace(/(:\d{2}| [AP]M)$/, '');
};

export default ({booking}) => {
  const start = formatDate(booking.start);
  const end = formatDate(booking.end);

  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <TouchableWithoutFeedback style={styles.mainCard}>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>
              {new Date(booking.start).getUTCDate()}
            </Text>
            <Text style={styles.date}>
              {monthList[new Date(booking.start).getUTCMonth()]}
            </Text>
          </View>

          <View style={styles.imageContainer}>
            {booking.user.avatar ? (
              <Image
                source={{
                  uri: `data:image/gif;base64,${booking.user.avatar}`,
                }}
                style={styles.image}
              />
            ) : (
              <Icon
                name="person"
                size={60}
                color="#0062FF"
                style={styles.image}
              />
            )}
          </View>
          <View style={styles.details}>
            <Text style={styles.header} numberOfLines={1}>
              {booking.user.firstName} {booking.user.lastName}
            </Text>

            <View style={styles.time}>
              <Icon name="access-time" size={20} color="#666" />
              <Text style={styles.timeText}>
                {start} - {end}
              </Text>
            </View>
            <View style={styles.time}>
              <Icon name="person" size={20} color="#666" />
              <Text style={styles.timeText}>{booking.visitors}</Text>
            </View>
            {booking.assistance && (
              <View style={styles.time}>
                <Icon name="check" size={20} color="#666" />
                <Text style={styles.timeText}>Need assistance</Text>
              </View>
            )}
            {booking.type === 'virtual' && (
              <View style={styles.time}>
                <Icon name="videocam" size={20} color="#666" />
                <Text style={styles.timeText}>Virtual</Text>
              </View>
            )}
          </View>
          <View>
            <View style={styles.bookingStatusIcon}>
              {booking.status === 'upcoming' || booking.status === 'missed' ? (
                <Pending />
              ) : booking.status === 'completed' ? (
                <CheckCircle />
              ) : (
                <Cancelled />
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get('window').width - 40,
    marginTop: 20,
  },
  container: {
    flex: 1,
    borderRadius: 15,
    backgroundColor: '#fff',
    elevation: 10,
    zIndex: 0,
  },
  mainCard: {
    flex: 2,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  dateContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: '#7070702F',
    padding: 8,
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
  imageContainer: {
    flex: 2,
    marginLeft: 20,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
  },
  details: {
    flex: 5,
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  header: {
    color: '#000',
  },
  time: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 5,
  },
  timeText: {
    color: '#666',
    marginLeft: 8,
    fontSize: 12,
  },
  bookingStatusIcon: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
