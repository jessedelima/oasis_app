import styled from 'styled-components/native'

export const Container = styled.TouchableOpacity`
	background-color: ${props => props.theme.colors.secondary};
	padding: 20px 25px;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	bottom: 0;
`

export const Label = styled.Text`
	font-size: 18px;
	color: #FFF;
	font-family: 'Inter-Regular';
`
