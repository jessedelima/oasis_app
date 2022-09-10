import React from 'react'
import { Image } from 'react-native'
import { HeaderWrapper } from './styles'

const Header: React.FC = () => {
	return (
		<HeaderWrapper>
			<Image source={require('../../assets/images/logo.png')}/>
		</HeaderWrapper>
	)
}

export default Header
