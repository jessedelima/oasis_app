import { SafeAreaView, Text } from 'react-native'
import React from 'react'
import IonIcons from 'react-native-vector-icons/Ionicons'
import { DescriptionText } from './styles'
import Button from '../../components/Button'
import { PagesProps } from '../../interfaces'

const Login = ({ navigation }: PagesProps) => {
	return (
		<SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

			<IonIcons name='sad-outline' size={150} />

			<DescriptionText>
				{'Você ainda não possui uma conta, para continuar comprando '}
				<Text style={{ fontWeight: 'bold' }}>Crie uma conta gŕatis.</Text>
			</DescriptionText>

			<Button
				label='Criar uma conta agora!'
				onPress={() => navigation.navigate('Login') }
			/>

		</SafeAreaView>
	)
}

export default Login
