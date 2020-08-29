import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommunityICon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {navigationRef} from '../../Navigation/Navigation';
import ShopOutWhite from './svg/ShopOutWhite';

const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;

export default ({currentCamera, changeCamera, completeBooking}) => {
  const [bookingId, setBookingId] = useState('');
  return (
    <>
      <View style={styles.bottomView}>
        <Text style={styles.bottomText}>
          Align the QR code within the frame to complete the appointment
        </Text>
      </View>
      <View style={styles.bottomView}>
        <CommunityICon name="qrcode-edit" size={16} color="#FFF" />
        <TextInput
          style={styles.textInput}
          placeholder="Type your code here"
          placeholderTextColor="#FFF"
          onChangeText={(val) => {
            setBookingId(val);
          }}
          onSubmitEditing={() => {
            completeBooking(bookingId);
          }}
        />
      </View>
      <View style={styles.container}>
        <TouchableWithoutFeedback
          style={styles.iconTouchable}
          onPress={() => {
            navigationRef.current?.goBack();
          }}>
          <Icon name="close" size={24} color="#FFF" />
        </TouchableWithoutFeedback>
        <View style={styles.iconTouchable}>
          <ShopOutWhite height={70} />
        </View>
        <TouchableWithoutFeedback
          style={styles.iconTouchable}
          onPress={() => {
            changeCamera();
          }}>
          {currentCamera === 'front' ? (
            <Icon name="camera-front" size={24} color="#FFF" />
          ) : (
            <Icon name="camera-rear" size={24} color="#FFF" />
          )}
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH,
    height: 70,
    position: 'absolute',
    bottom: WINDOW_HEIGHT / 1.2,
    zIndex: 5,

    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconTouchable: {
    padding: 8,
    alignItems: 'center',
  },
  bottomView: {
    width: 280,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginTop: 30,
    padding: 8,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomText: {color: '#FFF', textAlign: 'center'},
  textInput: {
    color: '#FFF',
    textAlign: 'left',
    padding: 8,
  },
});
