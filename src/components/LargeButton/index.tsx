import React from 'react'
import { LargeButtonParams } from '../../interfaces'
import { Container, Label } from './styles'
import MaterialCommunity from 'react-native-vector-icons/MaterialIcons'

const LargeButton = ({ labelText, onPress }: LargeButtonParams) => {
	return (
		<>
			<Container
				onPress={() => onPress()}
				activeOpacity={0.7}
			>
				<Label>{labelText}</Label>
				<MaterialCommunity name='arrow-forward' color={'#FFF'} size={30} />
			</Container>
		</>
	)
}

export default LargeButton
