import React from 'react'
import { SocialLoginButtonProps } from '../../interfaces'
import { Container, TitleText } from './SocialLoginButtonStyles'
import CommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const SocialLoginBtn = ({ type, bgColor, textColor, iconColor, onPress }: SocialLoginButtonProps) => {
	const getIcon = () => {
		return type.toLowerCase()
	}

	return (
		<Container onPress={onPress} bgColor={bgColor}>
			<CommunityIcons name={getIcon()} size={23} color={iconColor} />
			<TitleText textColor={textColor}>
				{`Entrar com ${type}`}
			</TitleText>
		</Container>
	)
}

export default SocialLoginBtn
