import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {COLORS, textStyles} from '../../styles/styles';

export default ({booking}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {booking.user.avatar ? (
          <Image
            source={{
              uri: `data:image/gif;base64,${booking.user.avatar}`,
            }}
            style={styles.image}
          />
        ) : (
          <Icon name="person" size={60} color="#0062FF" style={styles.image} />
        )}
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.heading} numberOfLines={1}>
          {booking.user.firstName} {booking.user.lastName}
        </Text>
        {booking.type === 'virtual' ? (
          <View style={styles.subheading}>
            <Text style={styles.subheadingText}>Video Appointment</Text>
            <Text style={styles.subheadingText}>{booking.status}</Text>
          </View>
        ) : (
          <View style={styles.subheading}>
            <Text style={styles.subheadingText}>Walk-in Appointment</Text>
            <Text style={styles.subheadingText}>
              {booking.visitors > 1
                ? `${booking.status} with ${booking.visitors - 1} others`
                : `${booking.status}`}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: COLORS.BORDER_LIGHT,
    paddingVertical: 10,
  },
  rating: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 2,
    justifyContent: 'space-around',
    width: 80,
    borderRadius: 6,
  },
  imageFiller: {
    flex: 1,
  },
  image: {
    height: undefined,
    width: undefined,
    flex: 4,
    borderRadius: 6,
    resizeMode: 'contain',
  },
  cardContent: {
    flex: 5,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  heading: {
    ...textStyles.paragraphLarge,
    color: COLORS.SECONDARY,
  },
  subheading: {
    paddingVertical: 10,
  },
  subheadingText: {
    ...textStyles.paragraphSmall,
    color: COLORS.SECONDARY,
    textTransform: 'capitalize',
  },
  favouriteIcon: {
    elevation: 5,
    backgroundColor: COLORS.WHITE,
    padding: 10,
    borderRadius: 40 / 2,
    zIndex: 2,
  },
});
