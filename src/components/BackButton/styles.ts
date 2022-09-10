import styled from 'styled-components/native'

export const ButtonContainer = styled.TouchableOpacity`
	z-index: 10;
	top: 15px;
	left: 10px;
	background-color: ${props => props.theme.colors.main};
	padding: 12px;
	border-radius: 15px;
	justify-content: center;
	align-items: center;
`
