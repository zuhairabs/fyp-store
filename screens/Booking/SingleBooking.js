import React from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import StatusBarWhite from '../../components/UXComponents/StatusBar';
import styles from './Styles';
import Booking from './Booking';

const SingleBooking = (props) => {
  const {booking} = props.route.params;
  return (
    <View style={styles.screenContainer}>
      <StatusBarWhite />
      <ScrollView style={styles.container}>
        <Booking booking={booking} />
      </ScrollView>
    </View>
  );
};

export default SingleBooking;
