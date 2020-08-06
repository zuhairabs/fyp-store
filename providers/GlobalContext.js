import React, {createContext, useReducer, useMemo} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const GlobalContext = createContext();

export const GlobalContextProvider = (props) => {
  const [state, dispatch] = useReducer(
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
            AsyncStorage.removeItem('jwt');
            AsyncStorage.removeItem('user');
          } catch (e) {
            console.error(error);
          }
          return {
            ...prevState,
            signedIn: false,
            token: null,
            user: null,
          };
      }
    },
    {
      isLoading: true,
      signedIn: false,
      token: null,
      user: null,
    },
  );

  const authActions = useMemo(
    () => ({
      signIn: async (userData) => {
        return new Promise((resolve) => {
          const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              cred: {
                phone: Number(userData.phone),
                password: userData.password,
              },
            }),
          };

          try {
            fetch(
              'https://shopout.herokuapp.com/store/login',
              requestOptions,
            ).then((response) => {
              if (response.status === 200) {
                response.json().then(async (data) => {
                  await AsyncStorage.setItem('jwt', data.token.toString());
                  await AsyncStorage.setItem(
                    'user',
                    JSON.stringify(data.store),
                  );
                  dispatch({
                    type: 'SIGN_IN',
                    token: data.token.toString(),
                    user: data.store,
                  });
                  resolve(true);
                });
              } else {
                if (response.status === 500)
                  resolve([false, 'Internal Server Error']);
                else if (response.status === 404) {
                  resolve([false, 'Invalid phone number or password']);
                } else {
                  resolve([false, 'Server error please try again later']);
                }
              }
            });
          } catch (e) {
            resolve([
              false,
              'Can not login right now, please check your internet connection and try again',
            ]);
          }
        });
      },

      signOut: () => dispatch({type: 'SIGN_OUT'}),
      signUp: async (userData) => {
        const requestOptions = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            userData: {
              firstName: userData.firstName,
              lastName: userData.lastName,
              phone: userData.phone,
              password: userData.password,
              email: userData.email,
            },
          }),
        };

        try {
          fetch(
            'https://shopout.herokuapp.com/store/signup',
            requestOptions,
          ).then((response) => {
            if (response.status === 200) {
              response.json().then((data) => {
                AsyncStorage.setItem('jwt', data.token.toString());
                AsyncStorage.setItem('user', JSON.stringify(data.user));
                dispatch({
                  type: 'SIGN_IN',
                  token: data.token.toString(),
                  user: data.user,
                });
              });
            } else {
              if (response.status === 500) Alert.alert('Internal Server Error');
              else if (response.status === 404) Alert.alert('Try logging in');
              else Alert.alert('Unknown server error');
            }
          });
        } catch (e) {
          Alert.alert('Something went wrong');
        }
      },
    }),
    [],
  );

  return (
    <GlobalContext.Provider value={{authActions, state, dispatch}}>
      {props.children}
    </GlobalContext.Provider>
  );
};

// consumer as a higher order component
export const withGlobalContext = (ChildComponent) => (props) => (
  <GlobalContext.Consumer>
    {(context) => <ChildComponent {...props} global={context} />}
  </GlobalContext.Consumer>
);
