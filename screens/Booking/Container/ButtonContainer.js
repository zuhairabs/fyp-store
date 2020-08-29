import React from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {buttons, textStyles} from '../../../styles/styles';
import styles from '../Styles';
import {navigationRef} from '../../../Navigation/Navigation';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const VideoIcon = () => (
  <Icon
    name="video-outline"
    size={20}
    color="#FFF"
    style={{paddingHorizontal: 8}}
  />
);

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

const VirtualBookingButton = ({booking}) =>
  booking.status === 'upcoming' ? (
    <Button
      text="Video Call"
      buttonFunction={() =>
        navigationRef.current?.navigate('RTCVideo', {
          channelName: booking.bookingId,
        })
      }
    />
  ) : (
    <DisabledButton text="Video Call" />
  );

export default ({booking}) => (
  <View style={styles.buttonArea}>
    <VirtualBookingButton booking={booking} />
  </View>
);
