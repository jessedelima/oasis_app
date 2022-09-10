import React from 'react'
import { formatPrice } from '../../utils'
import { FloatPriceText, Wrapper } from './FloatPriceStyles'

const FloatPrice = ({ price }: {price: number}) => {
	return (
		<Wrapper>
			<FloatPriceText>{`R$ ${formatPrice(price)}`}</FloatPriceText>
		</Wrapper>
	)
}

export default FloatPrice
