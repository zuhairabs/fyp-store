import React, {useState, useContext, createRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
  Alert,
  Linking,
  ActivityIndicator,
} from 'react-native';
import {
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native-gesture-handler';
import Modal from 'react-native-modalbox';

import {GlobalContext} from '../../providers/GlobalContext';

import StatusBarWhite from '../../components/UXComponents/StatusBar';
import SecondaryBackground from '../../components/Backgrounds/SecondaryBackground';
import {buttons, COLORS, textStyles} from '../../styles/styles';
import Navbar from '../../components/Header/Navbar';

const {height} = Dimensions.get('window');

const Login = ({navigation}) => {
  const {authActions} = useContext(GlobalContext);

  const phoneInput = createRef();
  const passwordInput = createRef();

  const [phone, setPhone] = useState();
  const [password, setPassword] = useState('');

  const [error, setError] = useState('Unknown error');
  const loadingModal = createRef();
  const errorModal = createRef();

  const validatePhone = () => {
    if (phone) {
      let phoneno = /^\d{3,10}$/;
      if (phone.match(phoneno)) return true;
    }
    return false;
  };

  const handleSubmit = async () => {
    if (validatePhone()) {
      loadingModal.current.open();
      let res = await authActions.signIn({phone: phone, password: password});
      if (res[0] === false) {
        loadingModal.current.close();
        setError(res[1]);
        errorModal.current.open();
      }
    } else Alert.alert('Please enter a valid 10 digit mobile number');
  };

  return (
    <View style={styles.screenContainer}>
      <Modal
        ref={loadingModal}
        useNativeDriver={false}
        style={styles.bottomModal}
        position={'bottom'}
        swipeToClose={false}
        backdropPressToClose={false}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, marginHorizontal: 20}}>Logging In</Text>
          <ActivityIndicator size="large" color="#0062FF" />
        </View>
      </Modal>

      <Modal
        ref={errorModal}
        useNativeDriver={false}
        style={styles.bottomModal}
        position={'bottom'}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, marginHorizontal: 20}}>{error}</Text>
        </View>
      </Modal>

      <StatusBarWhite />
      <SecondaryBackground />

      <ScrollView style={styles.container}>
        <Navbar type="locked" />
        <View
          style={styles.contentContainer}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.tabNavigation}>
            <TouchableOpacity style={styles.tabNavigationObjectSelected}>
              <Text style={styles.tabNavigationText}>Login</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.tabNavigationObject} onPress={() => { navigation.navigate("SignUp") }}>
                            <Text style={styles.tabNavigationText}>Register</Text>
                        </TouchableOpacity> */}
          </View>
          <View style={styles.form}>
            <TextInput
              style={styles.textInput}
              placeholder="Phone Number"
              keyboardType="numeric"
              value={phone}
              onChangeText={(value) => {
                setPhone(value);
              }}
              ref={phoneInput}
              onSubmitEditing={() => {
                passwordInput.current.focus();
              }}
              blurOnSubmit={false}
              returnKeyType="next"
            />
            <TextInput
              style={styles.textInput}
              placeholder="Password"
              autoCompleteType="password"
              secureTextEntry
              passwordRules
              onChangeText={(value) => {
                setPassword(value);
              }}
              ref={passwordInput}
              onSubmitEditing={() => {
                handleSubmit();
              }}
              blurOnSubmit={true}
              returnKeyType="done"
            />
          </View>
          <View style={styles.buttonArea}>
            <TouchableOpacity
              style={buttons.roundedPrimaryButton}
              onPress={() => {
                handleSubmit();
              }}>
              <Text style={textStyles.roundedButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.forgotPassword}>
            <TouchableOpacity>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.terms}>
            <Text style={styles.termsText}>
              By clicking Login, you acknowledge to reading & agreement to our
              <Text
                style={{color: COLORS.PRIMARY}}
                onPress={() => {
                  Linking.openURL('https://shopout.co.in/policy.html');
                }}>
                {' '}
                Terms of Use
              </Text>{' '}
              and
              <Text style={{color: COLORS.PRIMARY}}> Privacy Policy</Text>.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomModal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  screenContainer: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    height,
    backgroundColor: COLORS.WHITE,
  },
  contentContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  tabNavigation: {
    marginTop: 70,
    marginBottom: 20,
    paddingHorizontal: 20,
    marginLeft: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  tabNavigationObject: {
    borderBottomWidth: 1,
    borderColor: COLORS.PRIMARY,
  },
  tabNavigationObjectSelected: {
    borderBottomWidth: 3,
    borderColor: COLORS.PRIMARY,
  },
  tabNavigationText: {
    borderBottomWidth: 1,
    color: COLORS.PRIMARY,
    borderColor: COLORS.TRANSPARENT,
    paddingBottom: 10,
    paddingHorizontal: 15,
    ...textStyles.paragraphLargeBold,
  },
  form: {
    flex: 2,
    width: '100%',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  textInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.BORDER_LIGHT,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: COLORS.WHITE,
  },
  buttonArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 100,
  },
  forgotPassword: {
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: COLORS.PRIMARY,
    ...textStyles.paragraphSmall,
  },
  terms: {
    marginTop: 50,
    marginBottom: 160,
    paddingHorizontal: 45,
  },
  termsText: {
    textAlign: 'center',
    color: COLORS.SECONDARY,
    ...textStyles.paragraphSmall,
  },
});

export default Login;
