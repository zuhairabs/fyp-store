import React, { useContext, useEffect, createRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage'
import { GlobalContext } from '../providers/GlobalContext'
import AuthStack from './Stacks/AuthStack'
import MainStack from './Stacks/RootStack'

export const navigationRef = createRef();
export default () => {
    const { state, dispatch } = useContext(GlobalContext)
    useEffect(() => {
        verifyLogin()
            .then((token, user) => {
                dispatch({ type: 'RESTORE_TOKEN', token, user });
            }, e => {
                dispatch({ type: 'RESTORE_TOKEN', token: null, user: null })
                console.log(e)
            })
    }, []);

    return (
        <NavigationContainer ref={navigationRef}>
            {
                state.token === null
                    ? <AuthStack state={state} />
                    : <MainStack />
            }
        </NavigationContainer>
    )
}

const verifyLogin = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const token = await AsyncStorage.getItem('jwt');
            const user = JSON.parse(await AsyncStorage.getItem('user'));

            if (token && user.phone) {
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
                    .then(res => {
                        if (res.status === 200) resolve(token, user)
                        else reject('No user in token');
                    })
            }
        }
        catch (e) {
            reject(e);
        }
    })
}