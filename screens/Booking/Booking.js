import React, { useContext } from 'react';
import {View} from 'react-native';

import styles, {WINDOW_HEIGHT} from './Styles';
import DetailsCard from './Container/DetailsCard';
import ButtonContainer from './Container/ButtonContainer';
import PersonCard from '../../components/PersonCard/PersonCard';
import {GlobalContext} from '../../providers/GlobalContext';

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
  
  const {state} = useContext(GlobalContext);

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
          <View style={{height: WINDOW_HEIGHT / 3}} />
        </View>
        {booking.type === 'virtual' && <ButtonContainer booking={booking} data={state} />}
      </View>
    </View>
  );
};
