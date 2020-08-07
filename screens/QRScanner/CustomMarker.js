import React from 'react';
import {View, StyleSheet} from 'react-native';

export default () => (
  <View style={styles.container}>
    <View style={{...styles.boxTopLeft, ...styles.box}} />
    <View style={{...styles.boxTopRight, ...styles.box}} />
    <View style={{...styles.boxBottomLeft, ...styles.box}} />
    <View style={{...styles.boxBottomRight, ...styles.box}} />
  </View>
);

const OFFSET = -2;
const BORDER_WIDTH = 4;

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: 300,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  box: {
    borderColor: '#0062FF',
    height: 50,
    width: 50,
    position: 'absolute',
  },
  boxTopLeft: {
    borderTopWidth: BORDER_WIDTH,
    borderLeftWidth: BORDER_WIDTH,
    top: OFFSET,
    left: OFFSET,
  },
  boxTopRight: {
    borderTopWidth: BORDER_WIDTH,
    borderRightWidth: BORDER_WIDTH,
    top: OFFSET,
    right: OFFSET,
  },
  boxBottomLeft: {
    borderBottomWidth: BORDER_WIDTH,
    borderLeftWidth: BORDER_WIDTH,
    bottom: OFFSET,
    left: OFFSET,
  },
  boxBottomRight: {
    borderBottomWidth: BORDER_WIDTH,
    borderRightWidth: BORDER_WIDTH,
    bottom: OFFSET,
    right: OFFSET,
  },
});
