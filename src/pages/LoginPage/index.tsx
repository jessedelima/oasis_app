import React, { useContext, useState } from 'react'
import { ScrollView, Text, View, Platform } from 'react-native'
import { GlobalModalsContext } from '../../contexts/globalModalsContext'
import { UserContext } from '../../contexts/userContext'
import SocialLoginBtn from './SocialLoginButton'
import BackButton from '../../components/BackButton'
import Button from '../../components/Button'
import Input from '../../components/Input'
import LargeButton from '../../components/LargeButton'
import CheckBoxInput from '../../components/Checkbox'
import { Container, Title, CreateAccountText, CreateAccountBtn, LogoImage } from './styles'
import { decodeJWT, validateEmail } from '../../utils'
import { PagesProps } from '../../interfaces'
import services from '../../services'

const Login = ({ navigation }: PagesProps) => {
	const [keyboardIsOpen, setKeyboardIsOpen] = useState(false)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const { showAlert, openLoadingModal, closeLoadingModal } = useContext(GlobalModalsContext)
	const { logIn, googleLogin, facebookLogin } = useContext(UserContext)

	const hideForgotPassword = () => {
		setKeyboardIsOpen(true)
	}

	const showForgotPassword = () => {
		setKeyboardIsOpen(false)
	}

	const close = () => {
		navigation.goBack()
	}

	const validateForm = (isAuthLogin: boolean = false) => {
		if (!isAuthLogin && !validateEmail(email)) return { error: true, message: 'Por favor, preencha um E-Mail válido' }
		if (!isAuthLogin && password.length <= 0) return { error: true, message: 'Por favor, preencha uma senha válida' }

		return { error: false, message: null }
	}

	const handleSocialAuth = async (type: 'Facebook' | 'Google') => {
		const { error, message } = validateForm(true)
		if (!error) {
			if (type === 'Facebook') facebookLogin()
			if (type === 'Google') googleLogin()
		} else {
			showAlert(message || 'Ocorreu um erro ao realizar o Login')
		}
	}

	const loginUser = async () => {
		openLoadingModal()
		const response = await services.users.login(email, password)
		
		if (!response.error) {
			const decodedToken = decodeJWT(response.data).usr
			logIn(decodedToken, response.data)
			setEmail('')
			setPassword('')
			closeLoadingModal()
		} else {
			closeLoadingModal()
			const message = response.error.message.includes('credenciais') 
				? 'Credenciais incorretas' 
			
				: response.error.message;
			if(Platform.OS == "ios"){
				setTimeout(() => showAlert( message || 'Ocorreu um erro ao realizar o Login'), 500)
			} else {
				showAlert( message || 'Ocorreu um erro ao realizar o Login')
			}
			
		}
	}

	return (
		<Container>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View>
					<BackButton onPress={close} />
					<LogoImage source={require('../../assets/images/logo.png')} />
				</View>
				<Title>
					{'Bem vindo ao '}
					<Text style={{ fontFamily: 'Inter-Bold' }}>
						Pit Stop Oasis.
					</Text>
				</Title>

				<View style={{ marginHorizontal: 20 }}>
					<Input
						marginTop={10}
						label='E-Mail'
						placeholder='seunome@email.com'
						onFocus={hideForgotPassword}
						onBlur={showForgotPassword}
						value={email}
						setValue={setEmail}
						autoCapitalize='none'
						keyboardType='email-address'
					/>

					<Input
						marginTop={10}
						isPassword
						label='Senha'
						placeholder='********'
						isSecure
						onFocus={hideForgotPassword}
						onBlur={showForgotPassword}
						value={password}
						setValue={setPassword}
						autoCapitalize='none'
					/>

					<View style={{ alignSelf: 'flex-end', marginTop: 10 }}>
						<Button label='ENTRAR' onPress={loginUser} />
					</View>

					<SocialLoginBtn
						type='Facebook'
						bgColor="#1877F2"
						textColor='#FFF'
						iconColor='#FFF'
						onPress={() => handleSocialAuth('Facebook')}
					/>

					<SocialLoginBtn
						type='Google'
						bgColor="#DB4437"
						textColor='#FFF'
						iconColor='#FFF'
						onPress={() => handleSocialAuth('Google')}
					/>

					{
						Platform.OS === 'ios' &&
							<SocialLoginBtn
								type='Apple'
								bgColor="#000"
								textColor='#FFF'
								iconColor='#FFF'
								onPress={() => {}}
							/>
					}

					<CreateAccountBtn
						onPress={() => {
							navigation.navigate('Register')
						}}
					>
						<CreateAccountText>
							Não possui cadastro?
						</CreateAccountText>

						<CreateAccountText style={{ fontWeight: 'bold' }}>
							CRIAR CONTA!
						</CreateAccountText>
					</CreateAccountBtn>

				</View>
			</ScrollView>
			{!keyboardIsOpen && (
				<View style={{ bottom: 0, justifyContent: 'flex-end' }}>
					<LargeButton labelText='Esqueceu a senha' onPress={() => navigation.navigate('RecoveryPassword')} />
				</View>
			)}

		</Container>
	)
}

export default Login
