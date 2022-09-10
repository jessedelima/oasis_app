import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, UserContextData, UserContextProviderProps } from '../interfaces'
import AsyncStorage from '@react-native-async-storage/async-storage'
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { LoginManager, AccessToken } from 'react-native-fbsdk-next'
import services, { setAuthorizationToken } from '../services'
import { decodeJWT } from '../utils'
import { GlobalModalsContext } from './globalModalsContext'
import { InformationsContext } from './informationsContext'
import messaging from '@react-native-firebase/messaging'

export const UserContext = createContext({} as UserContextData)

const UserProvider = ({ children }: UserContextProviderProps) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [userToken, setUserToken] = useState<string | null>(null)
	const [deviceToken, setDeviceToken] = useState<string | null>(null)
	const [user, setUser] = useState <User | null>(null)
	const [orderNotification, setOrderNotification] = useState <number>(0)
	const fullName = user?.name.split(' ')
	const name = fullName ? fullName[0] : ''
	const lastName = fullName ? fullName[fullName?.length - 1] : ''
	const shortName = fullName && fullName?.length > 1 ? `${name} ${lastName}` : name
	const { openLoadingModal, closeLoadingModal, showAlert } = useContext(GlobalModalsContext)
	const { loadInformations, loadAdditionalInformations } = useContext(InformationsContext)

	const fullAddress = user?.adress ? `${user?.adress.street}, ${user?.adress.city}, ${user?.adress.number}` : null

	useEffect(() => {
		GoogleSignin.configure({
			webClientId: '317293557901-v453uobuu37i6d51i9nof5sb28hhqo4o.apps.googleusercontent.com'
		})

		
		
	}, [])

	useEffect(() => {
		isLoading ? openLoadingModal() : closeLoadingModal()
	}, [isLoading])

	const submitLogin = (userId: number) => {
		loadInformations()
		loadAdditionalInformations(userId)
	}

	const logIn = async (newUser: User, token: string) => {
		await setAuthorizationToken(token)
		await AsyncStorage.setItem('@Oasis:User', JSON.stringify(newUser))
		await AsyncStorage.setItem('@Oasis:Token', token)
		setUser(newUser)
		setUserToken(token)
		submitLogin(newUser.id)
	}

	const handleSocialLogin = async (email: string, firebaseUid: string, userName: string) => {
		try {
			const loginResponse = await services.users.login(email, firebaseUid)
			if (loginResponse.error) {
				const registerResponse = await services.users.register(email, userName, firebaseUid)
				if (registerResponse.error) {
					throw new Error('Não foi possível realizar o login')
				} else {
					const token = registerResponse.data
					logIn(decodeJWT(token).usr, token)
					setIsLoading(false)
				}
			} else {
				const token = loginResponse.data
				logIn(decodeJWT(token).usr, token)
				setIsLoading(false)
			}
		} catch (e) {
			setIsLoading(false)
			showAlert('Aconteceu um erro ao efetuar o login', 'Atenção')
		}
	}

	const facebookLogin = async () => {
		setIsLoading(true)
		try {
			const response = await LoginManager.logInWithPermissions(['public_profile', 'email'])
			if (!response.isCancelled) {
				const data = await AccessToken.getCurrentAccessToken()
				const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken)
				const facebookData = await auth().signInWithCredential(facebookCredential)
				if (facebookData.user.email) {
					await handleSocialLogin(facebookData.user.email, facebookData.user.uid, facebookData.user.displayName ?? '')
				} else {
					setIsLoading(false)
					throw new Error('Não foi possível efetuar o login')
				}
			} else {
				setIsLoading(false)
			}
		} catch (e) {
			setIsLoading(false)
			showAlert(e.message ?? 'Aconteceu um erro ao efetuar o login', 'Atenção')
		}
	}

	const clearCacheGoogle = async (token: string) => {
		await GoogleSignin.clearCachedAccessToken(token).then((res)=>
		{
			console.log(res);
		})

		await GoogleSignin.signOut();
	}

	const googleLogin = async () => {
		setIsLoading(true);
		await GoogleSignin.signOut().then(async () => {
			const { idToken } = await GoogleSignin.signIn();

			const googleCredential = auth.GoogleAuthProvider.credential(idToken)
			try {
				const response = await auth().signInWithCredential(googleCredential)
				if (response.user.email) {
					await handleSocialLogin(response.user.email, response.user.uid, response.user.displayName ?? '')
				} else {
					throw new Error('Não foi possível efetuar o login')
				}
			} catch (err) {
				setIsLoading(false)
				showAlert(err.message ?? 'Aconteceu um erro ao efetuar o login', 'Atenção')
			}
		}).catch((err) => {
			setIsLoading(false)
			showAlert(err.message ?? 'Aconteceu um erro ao efetuar o login', 'Atenção')
		})
		
	}

	const logOut = async () => {
		setUser(null)
		await AsyncStorage.removeItem('@Oasis:User')
	}

	const getInitialData = async () => {
		const dataUser = await AsyncStorage.getItem('@Oasis:User')
		const tokenTemp = await AsyncStorage.getItem('@Oasis:Token')
		if (dataUser && tokenTemp) {
			const userTemp = JSON.parse(dataUser)
			await setAuthorizationToken(tokenTemp)
			const tempDeviceToken = await messaging().getToken()
			setUserToken(tokenTemp)
			setUser(userTemp)
			submitLogin(userTemp.id)
			setDeviceToken(tempDeviceToken) 

			if(userTemp && tempDeviceToken){
				services.users.registerDevice(tempDeviceToken);
			}
				
		}
	}

	const changeOrderNotification = (orderId: number) => {
		setOrderNotification(orderId);
	}

	const getOrderNotification = () => {
		return orderNotification;		
	}

	useEffect(() => {
		getInitialData()
	}, [])

	return (
		<UserContext.Provider
			value={{
				isLogged: !!user && !!userToken,
				user,
				deviceToken,
				logIn,
				shortName,
				fullAddress,
				logOut,
				googleLogin,
				facebookLogin,
				changeOrderNotification,
				getOrderNotification
			}}
		>
			{children}
		</UserContext.Provider>
	)
}

export default UserProvider
