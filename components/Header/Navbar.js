import React from 'react';
import {View, StyleSheet} from 'react-native';

import ShopOutLogo from './svg/shopout.svg';

const Navbar = () => (
  <View style={Styles.navbarOnlyLogo}>
    <View style={Styles.navbarLogo}>
      <ShopOutLogo width={80} height={60} />
    </View>
  </View>
);

const Styles = StyleSheet.create({
  navbarOnlyLogo: {
    paddingHorizontal: 20,
    paddingTop: 5,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  navbarLogo: {
    flex: 3,
    marginLeft: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});

export default Navbar;
