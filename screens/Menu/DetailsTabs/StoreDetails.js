import React, {useState, useEffect, useContext} from 'react';
import {View, Image, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {GlobalContext} from '../../../providers/GlobalContext';
import styles from './Styles';
const getUserFromAsyncStorage = async () =>
  JSON.parse(await AsyncStorage.getItem('user'));

const SafetyElement = ({item}) => (
  <View style={styles.safetyElement}>
    <Icon name="check" size={12} color="#4DEB96" />
    <Text style={styles.safetyElementText}>{item.title}</Text>
  </View>
);

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
          <View style={styles.safetyContainer}>
            {storeData.parameters && (
              <FlatList
                data={storeData.parameters}
                renderItem={({item}) => <SafetyElement item={item} />}
                numColumns={2}
              />
            )}
          </View>
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
