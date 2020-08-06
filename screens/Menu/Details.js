import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Svg, {Circle} from 'react-native-svg';

import StoreDetails from './DetailsTabs/StoreDetails';
import BusinessDetails from './DetailsTabs/BusinessDetails';
import {StatusBarDark} from '../../components/UXComponents/StatusBar';
import NavbarBackButton from '../../components/Header/NavbarBackButton';
import {GlobalContext} from '../../providers/GlobalContext';

const WINDOW_HEIGHT = Dimensions.get('window').height;

const BackgroundSvg = () => (
  <Svg
    viewBox="0 0 600 600"
    height="150%"
    width="150%"
    style={styles.circleTop}>
    <Circle cx="300" cy="300" r="300" fill="#0062FF" />
  </Svg>
);

export default ({navigation}) => {
  const {state} = useContext(GlobalContext);
  const [selectedTab, switchTab] = useState('store');
  const [store, setStore] = useState({});
  const [business, setBusiness] = useState({});

  const getUserFromAsyncStorage = async () =>
    JSON.parse(await AsyncStorage.getItem('user'));

  useEffect(() => {
    if (state.user && state.user.business) {
      setStore(state.user);
      setBusiness(state.user.business);
    } else {
      getUserFromAsyncStorage().then(
        (storedInfo) => {
          setStore(storedInfo);
          setBusiness(storedInfo.business);
        },
        (e) => {
          console.log('Exception while fetching user from async storage', e);
        },
      );
    }
  }, [state.user]);

  return (
    <View style={styles.screenContainer}>
      <StatusBarDark />

      <BackgroundSvg />

      <ScrollView style={styles.container} decelerationRate="fast">
        <NavbarBackButton color="white" navigation={navigation} />

        <View style={styles.header}>
          <View style={styles.userPhotoContainer}>
            <View style={styles.photo}>
              {business.title_image ? (
                <Image
                  source={{
                    uri: `data:image/gif;base64,${business.title_image}`,
                  }}
                  style={styles.avatar}
                />
              ) : (
                <Icon name="store" size={80} color="#0062FF" />
              )}
            </View>
          </View>
        </View>

        <View style={styles.contentContainer} stickyHeaderIndices={[0]}>
          {selectedTab === 'store' ? (
            <StoreDetails switchTab={switchTab} />
          ) : (
            <BusinessDetails switchTab={switchTab} />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#FFF',
  },
  container: {
    height: WINDOW_HEIGHT,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 0,
    marginTop: 70,
    marginBottom: 40,
    backgroundColor: '#FFF',
  },
  circleTop: {
    position: 'absolute',
    top: '-79%',
    left: '-25%',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  userPhotoContainer: {
    height: 140,
    width: 140,
    borderRadius: 140 / 2,
    padding: 20,
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: '#FFFFFF2F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    height: 120,
    width: 120,
    borderRadius: 120 / 2,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
    flex: 1,
  },
});
