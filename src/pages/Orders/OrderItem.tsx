import React from 'react'
import { Text, View } from 'react-native'
import InterText from '../../components/InterText'
import { OrderItemProps } from '../../interfaces'
import { dateFormat, formatPrice } from '../../utils'
import { useNavigation } from '@react-navigation/native'
import Rate from './Rate'
import {
	OrderItemWrapper,
	LeftContainer,
	RightContainer,
	StatusText,
	DetailsBtn,
	DetailsBtnText
} from './styles'

const OrderItem = ({ orderItem }: OrderItemProps) => {
	const navigation = useNavigation()

	const handleGoToDetails = () => {
		navigation.navigate('OrderDetails', {
			orderId: orderItem.id
		})
	}

	return (
		<OrderItemWrapper>
			<LeftContainer>

				<View style={{ marginBottom: 20 }}>
					<InterText style={{ lineHeight: 20 }}>
						Compra referente ao dia
						<Text style={{ fontFamily: 'Inter-Black' }}>
							{` ${dateFormat(orderItem.created_at)}.`}
						</Text>
					</InterText>
				</View>

				<View>
					<InterText style={{ lineHeight: 20 }}>
						Total:
						<Text style={{ fontFamily: 'Inter-Black' }}>
							{` R$ ${formatPrice(orderItem.total)}`}
						</Text>
					</InterText>
				</View>

				{orderItem.orders_status_id === 5 && (
					<Rate
						rating={{
							rating_buy: orderItem.rating_buy,
							rating_delivery: orderItem.rating_delivery,
							rating_app: orderItem.rating_app,
							comment: orderItem.comment,
							average: orderItem.average,
							orders_id: orderItem.id
						}}
						rate={orderItem.average}
						orderId={orderItem.id}
					/>
				)}

			</LeftContainer>

			<RightContainer>

				<InterText>Status:
					<StatusText color={orderItem.color}>
						{` ${orderItem.name}`}
					</StatusText>
				</InterText>

				<DetailsBtn onPress={handleGoToDetails}>
					<DetailsBtnText>Detalhes</DetailsBtnText>
				</DetailsBtn>

			</RightContainer>

		</OrderItemWrapper>
	)
}

export default OrderItem
