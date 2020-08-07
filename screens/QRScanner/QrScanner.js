import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import AsyncStorage from '@react-native-community/async-storage';
import Marker from './CustomMarker';

export default ({navigation}) => {
  const onSuccess = (e) => {
    console.log(e);
  };

  return (
    <View style={styles.qr}>
      <QRCodeScanner
        showMarker={true}
        onRead={onSuccess}
        fadeIn={true}
        customMarker={Marker}
        cameraStyle={styles.cameraContainer}
        topViewStyle={styles.zeroContainer}
        bottomViewStyle={styles.zeroContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  qr: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').height,
  },
  zeroContainer: {
    height: 0,
    flex: 0,
  },
  cameraContainer: {
    height: Dimensions.get('window').height,
  },
});
