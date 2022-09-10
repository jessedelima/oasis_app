import React from 'react'
import styled from 'styled-components/native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { ButtonSearchParams } from '../../interfaces'

export const Wrapper = styled.TouchableOpacity`
	flex: 1;
	border-radius: 5px;
	background-color: ${props => props.theme.colors.main};
	height: 90%;
	align-self: center;
`

export const IconBox = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`

const Button = ({ iconName, onSubmit }: ButtonSearchParams) => {
	return (
		<Wrapper activeOpacity={0.5} onPress={() => onSubmit()}>
			<IconBox>
				<MaterialIcons name={iconName} color='#FFF' size={25} />
			</IconBox>
		</Wrapper>
	)
}

export default Button
