import React, { useContext, useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native'
import { GlobalModalsContext } from '../../contexts/globalModalsContext'
import { UserContext } from '../../contexts/userContext'
import { decodeJWT, validateEmail } from '../../utils'
import BackButton from '../../components/BackButton'
import Button from '../../components/Button'
import CheckBoxInput from '../../components/Checkbox'
import Input from '../../components/Input'
import LargeButton from '../../components/LargeButton'
import { Container, Footer, Form, Title } from './styles'
import { PagesProps } from '../../interfaces'
import services from '../../services'

const RegisterModal = ({ navigation }: PagesProps) => {
	const { showAlert, openLoadingModal, closeLoadingModal } = useContext(GlobalModalsContext)
	const { logIn } = useContext(UserContext)
	const [termsAccepted, setTermsAccepted] = useState(false)
	const [older18, setOlder18] = useState(false)
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		loading ? openLoadingModal('Aguarde...') : closeLoadingModal()
	}, [loading])

	const close = () => {
		navigation.goBack()
	}

	const validateForm = () => {
		if (name.length <= 0) return { error: true, message: 'Por favor, preencha seu nome' }
		if (!validateEmail(email)) return { error: true, message: 'Por favor, preencha um E-Mail válido' }
		if (password.length <= 0) return { error: true, message: 'Por favor, preencha uma senha válida' }
		if (!termsAccepted) return { error: true, message: 'Aceite os termos de uso para prosseguir' }
		if (!older18) return { error: true, message: 'Você deve ter mais que 18 anos para usar o aplicativo' }

		return { error: false, message: null }
	}

	const handleLogin = async () => {
		setLoading(true)
		const { error, message } = validateForm()
		if (!error) {
			try {
				const response = await services.users.register(email, name, password)
				if (!response.error) {
					const token = response.data
					logIn(decodeJWT(token).usr, token)
				} else {
					showAlert(response.error.message)
				}
				setLoading(false)
			} catch (e) {
				setLoading(false)
				showAlert(message || 'Não foi possível realizar o Login, tente novamente mais tarde')
			}
		} else {
			setLoading(false)
			showAlert(message || 'Não foi possível realizar o Login')
		}
	}

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{ flex: 1 }}
		>
		<Container>
			<View style={{ paddingHorizontal: 10, paddingTop: 10 }}>

				<View style={{ width: '15%' }}>
					<BackButton position='relative' onPress={() => close()} />
				</View>

				<Title>
					Faça um {''}
					<Text style={{ fontWeight: 'bold' }}>Cadastro</Text>
				</Title>

				<Form>
					<Input
						label='Nome'
						placeholder='Digite seu nome aqui'
						value={name}
						setValue={setName}
					/>
					<Input
						marginTop={10}
						label='E-Mail'
						placeholder='seuemail@email.com'
						autoCapitalize='none'
						keyboardType='email-address'
						value={email}
						setValue={setEmail}
					/>
					<Input
						marginTop={10}
						label='Senha'
						placeholder='********'
						isSecure
						isPassword
						value={password}
						setValue={setPassword}
						autoCapitalize='none'
					/>
				</Form>
				<CheckBoxInput
					value={older18}
					setValue={setOlder18}
					label='Eu concordo que tenho mais que'
					boldLabel='18 anos'
				/>
				{Platform.OS == "ios" && <View style={{marginTop: 15}}></View>}
				<CheckBoxInput
					value={termsAccepted}
					setValue={setTermsAccepted}
					label='Li e concordo com os'
					boldLabel='Termos de Uso'
					onPress={() => navigation.navigate('TermsOfService')}
				/>
				<View style={{ alignSelf: 'flex-end', marginTop: 15 }}>
					<Button onPress={handleLogin} label='CONTINUAR' />
				</View>
			</View>
			<Footer>
				<LargeButton
					labelText='Fazer Login'
					onPress={() => navigation.goBack()}
				/>
			</Footer>
		</Container>
		</KeyboardAvoidingView>
	)
}

export default RegisterModal
