import React from 'react'
import { Container } from './RemoveItemIconStyles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { RemoveItemIconProps } from '../../interfaces/index'

const RemoveItemIcon = ({ onClick }: RemoveItemIconProps) => {
	return (
		<Container
			onPress={() => onClick()}
		>
			<MaterialIcons name='close' color={'#FFF'} size={18} />
		</Container>
	)
}

export default RemoveItemIcon
