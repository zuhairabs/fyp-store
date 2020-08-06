import React, {useContext, useEffect, createRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {GlobalContext} from '../providers/GlobalContext';
import AuthStack from './Stacks/AuthStack';
import MainStack from './Stacks/RootStack';
import verifyLogin from '../providers/UserVerification';

export const navigationRef = createRef();
export default () => {
  const {state, dispatch} = useContext(GlobalContext);
  useEffect(() => {
    verifyLogin().then(
      ({token, user}) => {
        dispatch({type: 'RESTORE_TOKEN', token, user});
      },
      (e) => {
        dispatch({type: 'RESTORE_TOKEN', token: null, user: null});
        console.log(e);
      },
    );
  }, []);

  const currentStack =
    state.token === null ? <AuthStack state={state} /> : <MainStack />;

  return (
    <NavigationContainer ref={navigationRef}>
      {currentStack}
    </NavigationContainer>
  );
};
