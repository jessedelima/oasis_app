import React, { useContext } from 'react'
import { SafeAreaView, Text } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Button from '../../components/Button'
import { UserContext } from '../../contexts/userContext'
import { DescriptionText } from './styles'

interface EmptyListOrdersProps {
	isLoading: boolean;
	onPress: () => void;
}

const EmptyOrdersList = ({ isLoading, onPress }: EmptyListOrdersProps) => {
	const { shortName } = useContext(UserContext)
	return (
		<SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			{
				!isLoading && (
					<>
						<MaterialIcons name='wallet-giftcard' size={120} />
						<DescriptionText>
							Você ainda não realizou nenhum pedido,
							<Text style={{ fontWeight: 'bold' }}>
								{` ${shortName}.`}
							</Text>
						</DescriptionText>

						<Button label='Começar a comprar agora' onPress={onPress} />
					</>
				)
			}
		</SafeAreaView>
	)
}

export default EmptyOrdersList
