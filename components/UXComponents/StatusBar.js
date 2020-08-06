import React from 'react';
import {StatusBar} from 'react-native';

export default StatusBarWhite = () => {
  return (
    <StatusBar
      barStyle="dark-content"
      backgroundColor="transparent"
      animated={true}
      translucent
    />
  );
};

export const StatusBarDark = () => {
  return (
    <StatusBar
      barStyle="light-content"
      backgroundColor="transparent"
      animated={true}
      translucent
    />
  );
};
