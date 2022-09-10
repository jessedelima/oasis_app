import styled from 'styled-components/native'

export const Container = styled.View`
	flex-direction: row;
	margin: 5px 10px 5px 0px;
	justify-content: space-between;
	align-items: center;
	padding-right: 10px;
`

export const LabelWrapper = styled.View`
	background-color: ${props => props.theme.colors.main};
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
	padding: 5px 10px;
`

export const LabelText = styled.Text`
	font-family: 'Inter-Regular';
	color: #000;
`
