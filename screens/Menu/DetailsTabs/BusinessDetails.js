import React, {useState, useEffect, useContext} from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {GlobalContext} from '../../../providers/GlobalContext';
import styles from './Styles';
const getUserFromAsyncStorage = async () =>
  JSON.parse(await AsyncStorage.getItem('user'));

export default ({switchTab}) => {
  const {state} = useContext(GlobalContext);
  const [storeData, setStoreData] = useState({});

  useEffect(() => {
    if (state.user) setStoreData(state.user);
    else
      getUserFromAsyncStorage().then((storedInfo) => {
        setStoreData(storedInfo);
      });
  }, [state.user]);

  return (
    <View style={styles.contentContainer}>
      <View style={styles.tabNavigation}>
        <View style={styles.tab}>
          <TouchableWithoutFeedback
            style={styles.tabNavigationObject}
            onPress={() => {
              switchTab('store');
            }}>
            <Text style={styles.tabNavigationText}>Store Details</Text>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.tab}>
          <TouchableWithoutFeedback style={styles.tabNavigationObjectSelected}>
            <Text style={styles.tabNavigationTextSelected}>
              Business Details
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={styles.description}>
        <Text style={styles.subheading}>Store ID</Text>
        <View style={styles.value}>
          <Text>2233894</Text>
        </View>
      </View>
      <View style={styles.description}>
        <Text style={styles.subheading}>Contact Number</Text>
        <View style={styles.value}>
          <Text>+91 {storeData.phone}</Text>
        </View>
      </View>
      <View style={styles.description}>
        <Text style={styles.subheading}>Email</Text>
        <View style={styles.value}>
          <Text>{storeData.business ? storeData.business.email : null}</Text>
        </View>
      </View>
      <View style={styles.description}>
        <Text style={styles.subheading}>Address</Text>
        <View style={styles.value}>
          <Text>
            Kenilworth Mall, Linking Road, Bandra West, Mumbai, Maharashtra
            400050
          </Text>
        </View>
      </View>
    </View>
  );
};
