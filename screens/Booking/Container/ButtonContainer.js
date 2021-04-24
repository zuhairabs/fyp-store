import React from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {buttons, textStyles} from '../../../styles/styles';
import styles from '../Styles';
import {navigationRef} from '../../../Navigation/Navigation';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {PostBaseRoute} from '../../../api/http';

const VideoIcon = () => (
  <Icon name="video-outline" size={24} color="#FFF" style={{padding: 8}} />
);

const dialCall = (booking, data) => {
  const body = JSON.stringify({
    user: {
      _id: booking.user._id,
    },
    cred: {
      phone: data.user.phone,
    },
    channelName: booking.bookingId,
  });
  PostBaseRoute('rtc-video/register/dial', body, data.token).then(
    (response) => {
      console.log(response);
    },
  );
  console.log(body);
};

const missedCall = (booking, data) => {
  const body = JSON.stringify({
    user: {
      _id: booking.user._id,
    },
  });
  PostBaseRoute('rtc-video/register/missedCall', body, data.token).then(
    (response) => {
      console.log(response);
    },
  );
  console.log(body);
};

const handleClick = (booking, data) => {
  dialCall(booking, data);
  setTimeout(() => missedCall(booking, data), 15000);
  navigationRef.current?.navigate('RTCVideo', {
    channelName: booking.bookingId,
  });
};

export const Button = ({text, buttonFunction}) => (
  <TouchableOpacity
    style={buttons.roundedPrimaryButton}
    onPress={() => buttonFunction()}>
    <VideoIcon />
    <Text style={{...textStyles.roundedButtonText}}>{text}</Text>
  </TouchableOpacity>
);

export const DisabledButton = ({text}) => (
  <TouchableOpacity style={buttons.primaryButtonDisabled} disabled>
    <VideoIcon />
    <Text style={{...textStyles.roundedButtonText}}>{text}</Text>
  </TouchableOpacity>
);

const VirtualBookingButton = ({booking, data}) =>
  booking.status === 'upcoming' || booking.status === 'completed' ? (
    <Button
      text="Video Call"
      buttonFunction={() => handleClick(booking, data)}
    />
  ) : (
    <DisabledButton text="Video Call" />
  );

export default ({booking, data}) => (
  <View style={styles.buttonArea}>
    <VirtualBookingButton booking={booking} data={data} />
  </View>
);
