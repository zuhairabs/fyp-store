import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ToastAndroid,
  KeyboardAvoidingView,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {Post} from '../../api/http';
import {GlobalContext} from '../../providers/GlobalContext';
import Overlay from './Overlays';
import Marker from './CustomMarker';

export default ({navigation}) => {
  const {state} = useContext(GlobalContext);
  const [currentCamera, switchCamera] = useState('back');

  const onRead = async (results) => {
    const data = await JSON.parse(results.data);
    if (data.bookingId || data._id) {
      const body = JSON.stringify({
        booking_id: data.bookingId,
        cred: {
          phone: state.user.phone,
        },
      });
      Post('store/scanqr', body, state.token).then(
        () => {
          ToastAndroid.show('Booking completed', ToastAndroid.SHORT);
          navigation.navigate('Home');
        },
        (e) => {
          ToastAndroid.show(e, ToastAndroid.SHORT);
        },
      );
    } else ToastAndroid.show('Invalid QR code', ToastAndroid.SHORT);
  };

  const changeCamera = () => {
    if (currentCamera === 'back') switchCamera('front');
    else switchCamera('back');
  };

  return (
    <KeyboardAvoidingView style={styles.qr}>
      <QRCodeScanner
        showMarker={true}
        onRead={onRead}
        fadeIn={true}
        customMarker={<Marker />}
        cameraStyle={styles.cameraContainer}
        topViewStyle={styles.zeroContainer}
        bottomContent={
          <Overlay currentCamera={currentCamera} changeCamera={changeCamera} />
        }
        cameraType={currentCamera}
      />
    </KeyboardAvoidingView>
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
    flex: 0,
  },
  cameraContainer: {
    height: Dimensions.get('window').height,
  },
});
