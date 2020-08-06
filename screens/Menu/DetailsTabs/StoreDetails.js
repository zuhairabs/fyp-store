import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, Dimensions, Image, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {GlobalContext} from '../../../providers/GlobalContext';
const WINDOW_HEIGHT = Dimensions.get('window').height;
const getUserFromAsyncStorage = async () =>
  JSON.parse(await AsyncStorage.getItem('user'));

export default ({switchTab}) => {
  const {state} = useContext(GlobalContext);
  const [storeData, setStoreData] = useState({});
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (state.user) {
      setStoreData(state.user);
      setImages(state.user.business.images);
    } else
      getUserFromAsyncStorage().then((storedInfo) => {
        setStoreData(storedInfo);
        setImages(storedInfo.business.images);
      });
  }, [state.user]);

  return (
    <View style={styles.contentContainer}>
      <View style={styles.tabNavigation}>
        <View style={styles.tab}>
          <TouchableWithoutFeedback style={styles.tabNavigationObjectSelected}>
            <Text style={styles.tabNavigationTextSelected}>Store Details</Text>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.tab}>
          <TouchableWithoutFeedback
            style={styles.tabNavigationObject}
            onPress={() => {
              switchTab('business');
            }}>
            <Text style={styles.tabNavigationText}>Business Details</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={styles.carousel}>
        {images &&
          images.map((img, index) => {
            return (
              <View key={index} style={styles.carouselImageContainer}>
                <TouchableOpacity style={styles.carouselTouchable}>
                  <Image
                    source={{uri: `data:image/gif;base64,${img}`}}
                    style={styles.carouselImage}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
      </View>

      <View style={styles.description}>
        <Text style={styles.subheading}>Store Description</Text>
        <View style={styles.value}>
          <Text>{storeData.description}</Text>
        </View>
      </View>
      <View style={styles.description}>
        <Text style={styles.subheading}>Store Hours</Text>
        <View style={styles.value}>
          {storeData.active_hours && (
            <Text>
              {storeData.active_hours[0].start} to{' '}
              {storeData.active_hours[0].end}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.description}>
        <Text style={styles.subheading}>Service Time</Text>
        <View style={styles.value}>
          <Text>30 minutes</Text>
        </View>
      </View>
      <View style={styles.description}>
        <Text style={styles.subheading}>Location</Text>
        <View style={styles.value}>
          <Text>{storeData.location_desc}</Text>
        </View>
      </View>
      <View style={styles.description}>
        <Text style={styles.subheading}>Safety Parameters</Text>
        <View style={styles.value}>
          <Text>{storeData.parameters && storeData.parameters[0].title}</Text>
        </View>
      </View>
      <View style={styles.description}>
        <Text style={styles.subheading}>Average Rating</Text>
        <View style={styles.value}>
          <Text>{storeData.avg_rating}</Text>
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
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 10,
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
  carousel: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: Math.floor(WINDOW_HEIGHT / 9),
    marginTop: 20,
    marginBottom: 30,
  },
  carouselImageContainer: {
    marginHorizontal: 10,
    borderColor: '#66666666',
    borderRadius: 6,
    width: 70,
    height: 70,
    flex: 1,
  },
  carouselTouchable: {
    height: '100%',
  },
  carouselImage: {
    width: undefined,
    height: undefined,
    flex: 1,
    borderRadius: 6,
  },
  subheading: {
    fontSize: 14,
    color: '#6666666F',
  },
  value: {
    marginTop: 10,
    fontSize: 16,
    color: '#6666666F',
  },
  description: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    backgroundColor: '#FFF',
    paddingBottom: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
});
