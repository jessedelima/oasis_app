import styled from 'styled-components/native'

export const Container = styled.TouchableOpacity`
	position: absolute;
	z-index: 10;
	right: -5px;
	background-color: ${props => props.theme.colors.secondary};
	top: -5px;
	padding: 3px;
	border-radius: 15px;
`
