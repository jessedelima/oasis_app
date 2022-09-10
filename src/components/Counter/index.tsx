import React from 'react'
import { CounterParams } from '../../interfaces'
import { Wrapper, Button, BtnText, QuantityLabel } from './styles'

const Counter = ({
	quantity,
	add,
	dec,
	small = false,
	allowZero = false
}: CounterParams) => {
	return (
		<Wrapper small={small}>
			<Button
				onPress={() => dec()}
				disabled={allowZero ? quantity <= 0 : quantity <= 1}
			>
				<BtnText>-</BtnText>
			</Button>
			<QuantityLabel>
				{quantity.toString().padStart(2, '0')}
			</QuantityLabel>
			<Button
				onPress={() => add()}
			>
				<BtnText>+</BtnText>
			</Button>
		</Wrapper>
	)
}

export default Counter
