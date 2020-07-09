import 'react-native-gesture-handler';
import * as React from 'react';
import { Alert, Text,View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import  AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const Stack = createStackNavigator();

import * as StorageService from './storageService'


import Login from './components/screens/Login';
import SignUp from './components/screens/SignUp';
import Splash from './components/screens/Splash';
import Home from './components/screens/Home';
import Profile from './components/screens/Profile'
import NotificationsFull from './components/screens/NotificationsFull';
import BackButton from './components/UXComponents/BackButton';
import Store from './components/screens/Store';
import Business from './components/screens/Business';
import Support from './components/screens/Support';
import QrScanner from './components/screens/QrScanner';
import LeftHeader from './components/Header/LeftHeader'





import {AuthContext} from './components/context'
import { TouchableOpacity } from 'react-native-gesture-handler';

const App = () => {
  console.disableYellowBox = true;

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            token: action.token,
            user: action.user,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            signedIn: true,
            token: action.token,
            user: action.user,
          };
        case 'SIGN_OUT':
          try {
            AsyncStorage.removeItem("jwt")
            AsyncStorage.removeItem("user")
          }
          catch (e) {
            console.error(error)
          }
          return {
            ...prevState,
            signedIn: false,
            token: null,
            user: null
          };
      }
    },
    {
      isLoading: true,
      signedIn: false,
      token: null,
      user: null
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        let token = await AsyncStorage.getItem("jwt");
        let user = await AsyncStorage.getItem("user");

        if (user) user = JSON.parse(user)

        if (token && user.phone) {
          try {
            const requestOptions = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                authorization: "Bearer " + token,
              },
              body: JSON.stringify({
                cred: {
                  phone: user.phone,
                },
              }),
            }
           
            fetch('https://safeqstore.herokuapp.com/store/verify', requestOptions)
              .then(response => {
                if (response.status === 200)
                  dispatch({ type: 'RESTORE_TOKEN', token: token, user: user });
                else {
                  response.json()
                    .then(data => {
                      console.log(data)
                      dispatch({ type: 'RESTORE_TOKEN', token: null, user: null })
                    })
                }
              })
          }
          catch (e) {
            console.error(e)
          }
        }
        else {
          console.log("No user in async storage")
          dispatch({ type: 'RESTORE_TOKEN', token: null, user: null })
        }

      }
      catch (e) {
        console.error(e)
        console.log("Restoring session failed")
        dispatch({ type: 'RESTORE_TOKEN', token: null, user: null })
      }
    };
    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (userData) => {
        return new Promise(resolve => {
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              cred: {
                phone: userData.phone,
                password: userData.password
              },
            }),
          };

          try {
            fetch("https://safeqstore.herokuapp.com/store/login", requestOptions).then((response) => {
              if (response.status === 200) {
                response
                  .json()
                  .then((data) => {
                    AsyncStorage.setItem("jwt", data.token.toString());
                    AsyncStorage.setItem("user", JSON.stringify(data.store))
                    dispatch({ type: 'SIGN_IN', token: data.token.toString(), user: data.store });
                    resolve(true);
                  })
              } else {
                if (response.status === 500)
                  resolve([false, "Internal Server Error"]);
                else if (response.status === 404) {
                  resolve([false, "Invalid phone number or password"]);
                }
                else {
                  resolve([false, "Server error please try again later"]);
                }
              }
            });
          }
          catch (e) {
            resolve([false, "Can not login right now, please check your internet connection and try again"]);
          }
        })

      },

      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async userData => {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userData: {
              firstName: userData.firstName,
              lastName: userData.lastName,
              phone: userData.phone,
              password: userData.password,
              email: userData.email
            },
          }),
        };

        try {
          fetch("https://safeqstore.herokuapp.com/store/signup", requestOptions)
            .then(response => {
              if (response.status === 200) {
                response
                  .json()
                  .then((data) => {
                    AsyncStorage.setItem("jwt", data.token.toString());
                    AsyncStorage.setItem("user", JSON.stringify(data.user))
                    dispatch({ type: 'SIGN_IN', token: data.token.toString(), user: data.user });
                  })
              } else {
                if (response.status === 500) Alert.alert("Internal Server Error");
                else if (response.status === 404) Alert.alert("Try logging in")
                else Alert.alert("Unknown server error");
              }
            });
        }
        catch (e) {
          Alert.alert("Something went wrong")
        }
      }
    }), [])

  const clearNotifications = async() =>{
    const markRead = async()=>{
      let user = JSON.parse(await AsyncStorage.getItem("user"));
      user.notificaitons.forEach(notification => {notification.readStatus = true});
      return user
    }
    markRead().then(user=>{
      AsyncStorage.setItem("user", user)
    })
  }

  const LeftMenuIcon = ({navigation}) => 
    <View>
      <TouchableOpacity >
        <Icon 
          name='menu' 
          size={25} 
          color='#000'
          onPress={()=> Alert.alert("Profile clicked")}
        />
      </TouchableOpacity> 
    </View>  
  
  

  const RightMenuIcon = ({navigation}) =>
  {
  return (
  <View style= {{flexDirection : 'row',}}>
    <TouchableOpacity>
      <Icon 
        name='bell-outline' 
        size={25} 
        color='#3333ff' 
        style={{ paddingLeft: 15, width: 40 }}
        onPress={() => Alert.alert("Notification button clicked")}
      />
    </TouchableOpacity> 
    <TouchableOpacity >
      <Icon 
        name='qrcode-scan' 
        size={25} 
        color='#3333ff' 
        style={{ paddingLeft: 15}}
        onPress={() => Alert.alert("Qr Scanner button clicked")}
        // onPress={() => {
        //   navigation.navigate("QrScanner")
        // }}
      />
    </TouchableOpacity> 
  </View>  
  )
  }

  
  
  


  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{
            headerShown: false
          }}
        >
          {state.isLoading ?
            (
              <Stack.Screen
                name="Splash"
                component={Splash}
              />
            ) : (
              state.token === null ? (
                <>
                  <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                      animationTypeForReplace: state.loggedIn ? 'push' : 'pop',
                    }}
                  />
                  <Stack.Screen
                    name="SignUp"
                    component={SignUp}
                    options={{
                      animationEnabled: false
                    }}
                  />
                </>
              ) : (
                  <>
                    <Stack.Screen
                      name="Home" 
                      component={Home} 
                      options={{
                        title : "Schedule",
                        headerShown : true,
                        headerLeft : LeftMenuIcon,
                        headerLeftContainerStyle: {
                          padding: 20,
                        },
                        headerRight : RightMenuIcon,
                        headerRightContainerStyle: {
                          padding: 20,  
                        },

                      }}
                      
                    
                     />
                    <Stack.Screen
                      name="Profile"
                      component={Profile}
                    />
                    <Stack.Screen
                      name="Store"
                      component={Store}
                    />
                    <Stack.Screen
                      name="Support"
                      component={Support}
                      options={{
                        title: "Support",
                        headerShown: true,
                        headerBackImage: () => {
                          return <BackButton />
                        },
                        headerLeftContainerStyle: {
                          padding: 20,
                        },
                      }}
                    />
                    <Stack.Screen
                      name="Business"
                      component={Business}
                    />
                    <Stack.Screen
                      name="NotificationsFull"
                      component={NotificationsFull}
                      options={{
                        title: "Notifications",
                        headerShown: true,
                        headerLeft: () => {
                          return <BackButton />
                        },
                        headerLeftContainerStyle: {
                          padding: 20,
                        },
                        headerRight: () => (
                          <TouchableOpacity
                            onPress={() => clearNotifications()}
                          >
                            <Text style={{
                              color: "#6666666F"
                            }}>
                              MARK ALL AS SEEN
                            </Text>
                          </TouchableOpacity>
                        ),
                        headerRightContainerStyle: {
                          padding: 20,
                        }
                      }}
                    />
                    {/* <Stack.Screen
                      name="QrScanner"
                      component={QrScanner}
                      options={{
                        title: "QrScanner",
                        headerShown: true,
                        headerLeft: () => {
                          return <BackButton />
                        },
                        headerLeftContainerStyle: {
                          padding: 20,
                        },
                      }}
                    /> */}
                    {/* <Stack.Screen
                      name="Home" 
                      component={Home} 
                      options={{
                        title : "Schedule",
                        headerShown : true,
                        headerLeft : LeftMenuIcon,
                        headerLeftContainerStyle: {
                          padding: 20,
                        },
                        headerRight : RightMenuIcon,
                        headerRightContainerStyle: {
                          padding: 20,  
                        },

                      }}
                      
                    
                     /> */}
                   
                    
                  </>
                )
            )}
          
        </Stack.Navigator>
      </NavigationContainer>
      </AuthContext.Provider>  
  );
}

export default App;