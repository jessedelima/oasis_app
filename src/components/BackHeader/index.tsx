import React from 'react'
import InterText from '../InterText'
import { Container, BackButtonBox } from './styles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { BackHeaderProps } from '../../interfaces'
import { Platform, Text } from 'react-native'

const BackHeader = ({ label, onClose, boldLabel = '' }: BackHeaderProps) => {
	return (
		<Container style={Platform.OS == "ios" && {paddingVertical: 5}}>
			<BackButtonBox
				onPress={() => onClose()}
				style={Platform.OS == "ios" && {paddingLeft: 5, width: 40, height:40, justifyContent: "center"}}
			>
				<MaterialIcons name='arrow-back' size={25} color='#FFF' />
			</BackButtonBox>
			<InterText style={{ color: '#FFF', fontSize: 15 }}>
				{label}
				<Text style={{ fontWeight: 'bold' }} >{' ' + boldLabel}</Text>
			</InterText>
		</Container>
	)
}

export default BackHeader
