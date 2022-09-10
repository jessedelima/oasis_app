import React from 'react'
import InterText from '../InterText'
import { OrderBoxProps } from '../../interfaces'
import { TitleText, OrderBoxWrapper } from './styles'

const OrderBox = ({ title, value }: OrderBoxProps) => (
	<OrderBoxWrapper>
		<TitleText>{title}:</TitleText>
		<InterText>{value}</InterText>
	</OrderBoxWrapper>
)

export default OrderBox
