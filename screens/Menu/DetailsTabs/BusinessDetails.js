import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {GlobalContext} from '../../../providers/GlobalContext';
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
            <Text style={styles.tabNavigationText}>Store</Text>
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
      <View style={styles.businessdescription}>
        <Text style={styles.subheading}>Store ID</Text>
        <View style={styles.value}>
          <Text>2233894</Text>
        </View>
      </View>
      <View style={styles.businessdescription}>
        <Text style={styles.subheading}>Contact Number</Text>
        <View style={styles.value}>
          <Text>+91 {storeData.phone}</Text>
        </View>
      </View>
      <View style={styles.businessdescription}>
        <Text style={styles.subheading}>Email</Text>
        <View style={styles.value}>
          <Text>{storeData.business.email}</Text>
        </View>
      </View>
      <View style={styles.businessdescription}>
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

const styles = StyleSheet.create({
  tabNavigation: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  tab: {
    flex: 1,
  },
  tabNavigationObject: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#6666666F',
  },
  tabNavigationObjectSelected: {
    borderBottomWidth: 2,
    borderColor: '#0062FF',
    alignItems: 'center',
  },
  tabNavigationText: {
    fontSize: 18,
    color: '#6666666F',
    borderBottomWidth: 1,
    borderColor: '#00000000',
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
  tabNavigationTextSelected: {
    fontSize: 18,
    color: '#0062FF',
    borderBottomWidth: 1,
    borderColor: '#00000000',
    paddingBottom: 10,
    paddingHorizontal: 15,
  },

  subheading: {
    fontSize: 14,
    color: '#6666666F',
  },
  value: {
    marginTop: 10,
    fontSize: 16,
    color: '#6666666F',
    paddingRight: 20,
  },
  businessdescription: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    backgroundColor: '#FFF',
    paddingBottom: 20,
    marginBottom: 20,
  },
});
