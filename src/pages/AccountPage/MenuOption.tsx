import React from 'react'
import { MenuOtionProps } from '../../interfaces'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Wrapper, Label } from './MenuOptionStyles'

const MenuOption = ({ label, iconName, onPress }: MenuOtionProps) => {
	return (
		<Wrapper
			onPress={() => onPress()}
		>
			<MaterialIcons
				name={iconName}
				color='rgba(8, 8, 8, 0.5)'
				size={22}
				style={{ marginRight: 10 }}
			/>
			<Label>{label}</Label>
		</Wrapper>
	)
}

export default MenuOption
