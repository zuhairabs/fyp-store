import React from 'react';
import {View} from 'react-native';

import styles from './Styles';
import DetailsCard from './Container/DetailsCard';
import ButtonContainer from './Container/ButtonContainer';
import PersonCard from '../../components/PersonCard/PersonCard';

export default ({booking}) => {
  const formatTimeString = (date) => {
    return new Date(date)
      .toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
      .replace(/(:\d{2}| [AP]M)$/, '');
  };

  const getDetailsTime = () => {
    const start = formatTimeString(booking.start);
    const end = formatTimeString(booking.end);
    return `${start} - ${end}`;
  };

  const getDetailsDate = () => new Date(booking.start).toDateString();

  return (
    <View style={styles.contentContainer}>
      <PersonCard booking={booking} />
      <View style={styles.bookingData}>
        <View style={styles.cardContainer}>
          <DetailsCard
            title="Appointment Time"
            text={getDetailsTime()}
            icon={booking.type === 'virtual' ? 'video-outline' : 'walk'}
          />
          <DetailsCard
            title="Appointment Date"
            text={getDetailsDate()}
            icon="calendar"
          />
        </View>
        <View style={styles.qrContainer}>
          <View style={{height: 200}} />
        </View>
        {booking.type === 'virtual' && <ButtonContainer booking={booking} />}
      </View>
    </View>
  );
};
