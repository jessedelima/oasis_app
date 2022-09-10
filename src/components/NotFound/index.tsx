import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { NotFoundContainer, Text } from './styles'

const NotFound = () => {
	return (
		<NotFoundContainer>
			<MaterialCommunityIcons name='emoticon-sad-outline' size={100} />
			<Text>Aah que pena! Não encontramos nenhum produto!</Text>
		</NotFoundContainer>
	)
}

export default NotFound
