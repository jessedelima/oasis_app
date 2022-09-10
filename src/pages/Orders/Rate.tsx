import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { RateProps } from '../../interfaces'
import { RateContainer, RateContainerText } from './styles'
import { useNavigation } from '@react-navigation/native'

const Rate = ({ rate, orderId, rating }: RateProps) => {
	const navigation = useNavigation()

	return (
		<RateContainer
			onPress={() => navigation.navigate('Evaluate', {
				isRated: rate !== null,
				orderId,
				rating
			})}
			isRated={rate !== null }
		>
			<RateContainerText>{rate ?? 'Avaliar Pedido'}</RateContainerText>
			{
				rate !== null && (
					<MaterialIcons style={{ marginLeft: 5 }} name='star' color='#FFF' />
				)
			}
		</RateContainer>
	)
}

export default Rate
