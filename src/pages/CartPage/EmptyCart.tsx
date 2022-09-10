import React from 'react'
import { Container, DescriptionText } from './EmptyCartStyles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Button from '../../components/Button'

const EmptyCart = () => {
	const navigation = useNavigation()

	return (
		<Container>
			<MaterialIcons name='shopping-cart' size={130} />
			<DescriptionText>
				Seu
				<Text
					style={{ fontFamily: 'Inter-Bold' }}>
					{' carrinho está vazio '}
				</Text>
				no momento, comece a adicionar produtos
			</DescriptionText>
			<Button
				onPress={() => navigation.navigate('Home')}
				label='Começar a comprar agora'
			/>
		</Container>
	)
}

export default EmptyCart
