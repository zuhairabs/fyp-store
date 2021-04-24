import React, {useState, useEffect, useContext} from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import StatusBarWhite from '../../components/UXComponents/StatusBar';
import styles from './Styles';
import Booking from './Booking';
import {GlobalContext} from './../../providers/GlobalContext';
import LoadingContainer from './Container/LoadingContainer';
import {PostBaseRoute} from '../../api/http';

const upcomingUri = 'store/book/bookings/single';

const SingleBooking = (props) => {
  const {state} = useContext(GlobalContext);

  var bookingData = props.route.params.booking;
  const _id = props.route.params.bookingId;

  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState({});

  useEffect(() => {
    if (bookingData) {
      console.log(bookingData);
      console.log('Bookingdata is present');
      setBooking(bookingData);
      setLoading(false);
    } else if (_id) {
      setLoading(true);
      console.log('id for fetching booking -> ', _id);
      console.log('Bookingdata is not present');
      const cred = {phone: state.user.phone};
      const token = state.token;
      const body = JSON.stringify({
        cred,
        bookingData: {
          _id,
        },
      });
      const uri = upcomingUri;
      PostBaseRoute(uri, body, token).then((data) => {
        setBooking(data.booking);
        setLoading(false);
      });
    }
  }, [_id]);

  return (
    <View style={styles.screenContainer}>
      <StatusBarWhite />
      <ScrollView style={styles.container}>
        {loading ? <LoadingContainer /> : <Booking booking={booking} />}
      </ScrollView>
    </View>
  );
};

export default SingleBooking;
