import React from 'react'
import { ButtonProps } from '../../interfaces'
import { BtnContainer, BtnText } from './styles'

const Button = ({ label, onPress }: ButtonProps) => (
	<BtnContainer
		onPress={() => onPress()}
	>
		<BtnText>
			{label}
		</BtnText>
	</BtnContainer>
)

export default Button
