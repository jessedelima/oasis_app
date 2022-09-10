import React from 'react'
import { View } from 'react-native'
import InterBoldText from '../../components/InterBoldText'
import { OrderProductItemProps } from '../../interfaces'
import { formatPrice } from '../../utils'
import {
	OrderProductWrapper,
	ItemDescription,
	ImageBox,
	ProductImage,
	BottomContent,
	ItemNameText,
	ItemDescriptionText
} from './OrderProductItemStyles'

const OrderProductItem = ({ item }: OrderProductItemProps) => {
	return (
		<OrderProductWrapper>
			<ImageBox>
				<ProductImage
					source={{ uri: item.photo }}
					resizeMode='contain'
				/>
			</ImageBox>

			<ItemDescription>
				<View>
					<ItemNameText numberOfLines={2}>{item.product_name}</ItemNameText>
					<ItemDescriptionText numberOfLines={2}>{item.description}</ItemDescriptionText>
				</View>

				<BottomContent>
					<InterBoldText style={{ fontSize: 16 }}>{Math.floor(item.amount)}x</InterBoldText>
					<InterBoldText style={{ fontSize: 16 }}>R$ {formatPrice(item.price * item.amount)}</InterBoldText>
				</BottomContent>
			</ItemDescription>
		</OrderProductWrapper>
	)
}

export default OrderProductItem
