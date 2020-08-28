import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {navigationRef} from '../../Navigation/Navigation';
import Cancelled from './svg/cancel.svg';
import CheckCircle from './svg/check_circle.svg';
import Pending from './svg/pending.svg';

import styles from './Styles';

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
        <TouchableOpacity
          style={styles.touchableCard}
          onPress={() => {
            navigationRef.current?.navigate('Booking', {booking});
          }}>
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
              {booking.type === 'virtual' ? (
                <Icon name="video-outline" size={20} color="#666" />
              ) : (
                <Icon name="walk" size={20} color="#666" />
              )}
              <Text style={styles.timeText}>
                {start} - {end}
              </Text>
            </View>
          </View>
          <TouchableWithoutFeedback style={styles.bookingStatusIcon}>
            {booking.status === 'upcoming' || booking.status === 'missed' ? (
              <Pending />
            ) : booking.status === 'completed' ? (
              <CheckCircle />
            ) : (
              <Cancelled />
            )}
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </View>
    </View>
  );
};
