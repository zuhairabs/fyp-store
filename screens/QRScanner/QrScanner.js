import React, {useState} from 'react';
import {StyleSheet, View, Dimensions, Text} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Marker from './CustomMarker';
import Overlay from './Overlays';

export default ({navigation}) => {
  const [currentCamera, switchCamera] = useState('back');
  const onSuccess = (e) => {
    console.log(e);
  };

  const changeCamera = () => {
    if (currentCamera === 'back') switchCamera('front');
    else switchCamera('back');
  };

  return (
    <View style={styles.qr}>
      <QRCodeScanner
        showMarker={true}
        onRead={onSuccess}
        fadeIn={true}
        customMarker={<Marker />}
        cameraStyle={styles.cameraContainer}
        topViewStyle={styles.zeroContainer}
        bottomContent={
          <Overlay currentCamera={currentCamera} changeCamera={changeCamera} />
        }
        cameraType={currentCamera}
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
    flex: 0,
  },
  cameraContainer: {
    height: Dimensions.get('window').height,
  },
});
