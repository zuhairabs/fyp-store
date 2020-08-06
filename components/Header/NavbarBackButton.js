import React from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

import LeftArrow from './svg/left-arrow';
import LeftArrowWhite from './svg/left-arrow-white';
import {navigationRef} from '../../Navigation/Navigation';
const NavbarBackButton = (props) => {
  return (
    <View style={Styles.navbar}>
      <TouchableWithoutFeedback
        onPress={() => {
          navigationRef.current?.goBack();
        }}
        style={Styles.navbarLogo}>
        {props.color === 'white' ? (
          <LeftArrowWhite width={24} height={60} />
        ) : (
          <LeftArrow width={24} height={60} />
        )}
      </TouchableWithoutFeedback>

      {props.header ? (
        <View style={Styles.navbarHeader}>
          <Text style={Styles.navbarHeaderText}>{props.header}</Text>
        </View>
      ) : null}
    </View>
  );
};

const Styles = StyleSheet.create({
  navbar: {
    height: 70,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#0062FF',
  },
  navbarLinks: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  navbarLogo: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: Dimensions.get('screen').width / 20,
  },
  navbarHeaderText: {
    marginLeft: Dimensions.get('screen').width / 20,
    fontSize: 20,
  },
});

export default NavbarBackButton;
