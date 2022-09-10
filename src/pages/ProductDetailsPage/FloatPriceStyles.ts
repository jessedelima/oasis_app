import styled from 'styled-components/native'

export const Wrapper = styled.View`
	background-color: ${props => props.theme.colors.secondary};
	position: absolute;
	bottom: -15px;
	left: 15px;
	padding: 10px 20px;
	border-radius: 10px;
`

export const FloatPriceText = styled.Text`
	color: #FFF;
	font-family: 'Inter-Bold';
	font-size: 20px;
`
