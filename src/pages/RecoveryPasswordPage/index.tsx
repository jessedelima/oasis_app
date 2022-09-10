import React, { useContext, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
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

const RecoveryPassword = ({ navigation }: PagesProps) => {
	const { showAlert, openLoadingModal, closeLoadingModal } = useContext(GlobalModalsContext)
	const [email, setEmail] = useState('')

	const close = () => {
		navigation.goBack()
	}

	const recoveryPassword = async () => {
		openLoadingModal();
		if (email && validateEmail(email)) {
			const response = await services.users.recoveryPassword(email);
			closeLoadingModal();
			if (!response.error) {
				showAlert('Uma senha de recuperação foi enviada ao seu e-mail', 'Atenção')
				setEmail('');
			} else {
				console.log(response.error.message)
				showAlert(response.error.message ?? 'Ocorreu um erro ao recuperar sua senha', 'Atenção')
			}
			closeLoadingModal();
		} else {
			closeLoadingModal();
			showAlert('Insira um e-mail válido', 'Atenção')
		}
	}

	return (
		<Container>
			<View style={{ paddingHorizontal: 10, paddingTop: 10 }}>

				<View style={{ width: '15%' }}>
					<BackButton position='relative' onPress={() => close()} />
				</View>

				<Title>
					Recuperar{' '}
					<Text style={{ fontWeight: 'bold' }}>senha</Text>
				</Title>

				<Form>
					<Input
						marginTop={10}
						label='E-Mail'
						placeholder='seuemail@email.com'
						autoCapitalize='none'
						keyboardType='email-address'
						value={email}
						setValue={setEmail}
					/>
				</Form>
				<View style={{ alignSelf: 'flex-end', marginTop: 15 }}>
					<Button onPress={recoveryPassword} label='CONTINUAR' />
				</View>
			</View>
			<Footer>
				<LargeButton
					labelText='Fazer Login'
					onPress={() => navigation.goBack()}
				/>
			</Footer>
		</Container>
	)
}

export default RecoveryPassword
