import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  Image,
  Alert,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import {GlobalContext} from '../../providers/GlobalContext';
import {StatusBarDark} from '../../components/UXComponents/StatusBar';
import MenuBackground from '../../components/Backgrounds/MenuBackground';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, textStyles} from '../../styles/styles';

const {width, height} = Dimensions.get('window');

const Profile = ({navigation}) => {
  const {authActions, state} = useContext(GlobalContext);
  const [user, setUser] = useState({});
  const [business, setBusiness] = useState({});

  const getUserFromAsyncStorage = async () =>
    JSON.parse(await AsyncStorage.getItem('user'));

  useEffect(() => {
    if (state.user && state.user.business) {
      setBusiness(state.user.business);
      setUser(state.user);
    } else
      getUserFromAsyncStorage().then(
        (storedUser) => {
          setUser(storedUser);
          setBusiness(storedUser.business);
        },
        (e) => {
          console.log('Exception while fetching user from async storage', e);
        },
      );
  }, [state.user]);

  return (
    <View style={styles.screenContainer}>
      <StatusBarDark />
      <MenuBackground />
      <ScrollView style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <View style={styles.userPhotoContainer}>
              <View style={styles.photo}>
                {business.logo || business.title_image ? (
                  <Image
                    source={{
                      uri: `data:image/gif;base64,${
                        business.logo || business.title_image
                      }`,
                    }}
                    style={styles.avatar}
                  />
                ) : (
                  <Icon name="store" size={60} color="#0062FF" />
                )}
              </View>
            </View>
            <View style={styles.details}>
              <Text style={styles.name}>{business.display_name}</Text>
              <Text style={styles.name}>
                {user.name}, {user.city}
              </Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Details');
              }}
              style={styles.button}>
              <View style={styles.buttonIcon}>
                <Image
                  source={require('./menu-icons/baseline_store_black_48dp.png')}
                  style={styles.buttonIconImage}
                />
              </View>
              <Text style={styles.buttonText}>My Store</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Support');
              }}
              style={styles.button}
              style={styles.button}>
              <View style={styles.buttonIcon}>
                <Image
                  source={require('./menu-icons/help_outline-24px.png')}
                  style={styles.buttonIconImage}
                />
              </View>
              <Text style={styles.buttonText}>Support</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                Alert.alert('Do you want to logout?', '', [
                  {
                    text: 'NO',
                    onPress: () => {},
                    style: 'cancel',
                  },
                  {
                    text: 'YES',
                    onPress: () => {
                      authActions.signOut();
                    },
                    style: 'default',
                  },
                ]);
              }}>
              <View style={styles.buttonIcon}>
                <Image
                  source={require('./menu-icons/logout-black-48dp.png')}
                  style={styles.buttonIconImage}
                />
              </View>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: COLORS.BACKGROUND,
  },
  container: {
    height,
  },
  contentContainer: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  header: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  details: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
    marginVertical: 20,
  },
  name: {
    fontSize: 18,
    color: COLORS.BACKGROUND,
    fontWeight: 'bold',
  },
  number: {
    color: COLORS.BACKGROUND,
    fontWeight: 'bold',
  },
  userPhotoContainer: {
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
    padding: 20,
    marginVertical: 20,
    backgroundColor: COLORS.PRIMARY_TRANSPARENT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    height: 80,
    width: 80,
    borderRadius: 80 / 2,
    backgroundColor: COLORS.BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    flex: 1,
  },
  buttonContainer: {
    marginTop: 50,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: Math.floor(width / 1.5),
  },
  button: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  buttonIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 24,
    width: 24,
  },
  buttonIconImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  buttonText: {
    flex: 8,
    paddingHorizontal: 20,
    ...textStyles.paragraphLarge,
  },
});

export default Profile;
