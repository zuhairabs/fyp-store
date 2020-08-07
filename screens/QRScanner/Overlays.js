import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {navigationRef} from '../../Navigation/Navigation';
import ShopOutWhite from './svg/ShopOutWhite';
const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;

export default ({currentCamera, changeCamera}) => {
  return (
    <>
      <View style={styles.bottomView}>
        <Text style={styles.bottomText}>
          Align the QR code within the frame to complete the appointment
        </Text>
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

    // backgroundColor: 'rgba(0,0,0,0.1)',
  },
  iconTouchable: {
    padding: 8,
    alignItems: 'center',
  },
  bottomView: {
    width: 240,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 8,
    borderRadius: 6,
  },
  bottomText: {color: '#FFF', textAlign: 'center'},
});
