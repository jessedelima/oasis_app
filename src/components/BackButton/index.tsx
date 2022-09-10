import React from 'react'
import { ButtonContainer } from './styles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { BackButtonProps } from '../../interfaces'

const BackButton = ({ onPress, position = 'absolute' }: BackButtonProps) => {
	return (
		<ButtonContainer
			onPress={() => onPress()}
			style={{ position: position }}
		>
			<MaterialIcons name='arrow-back' color='#FFF' size={25} />
		</ButtonContainer>
	)
}

export default BackButton
