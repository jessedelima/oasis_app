import styled from 'styled-components/native'

interface Props {
	small: boolean
}

export const Wrapper = styled.View<Props>`
	align-items: center;
	width: ${props => props.small ? '50%' : '100%'};
	flex-direction: row;
	justify-content: ${props => props.small ? 'space-between' : 'space-evenly'};
`

export const Button = styled.TouchableOpacity`
	background-color: ${props => props.theme.colors.main};
	padding: 10px 15px;
	min-width: 10px;
	border-radius: 5px;
`

export const BtnText = styled.Text`
	font-size: 15px;
	font-weight: bold;
	color: #FFF;
`

export const QuantityLabel = styled.Text`
	font-weight: bold;
	font-size: 20px;
	font-family: 'Inter-Bold';
`
