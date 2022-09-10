import styled from 'styled-components/native'

export const BtnContainer = styled.TouchableOpacity`
	background-color: ${props => props.theme.colors.main};
	padding: 15px 30px;
	border-radius: 10px;
`

export const BtnText = styled.Text`
	font-family: 'Inter-Bold';
	color: #FFF;
`
