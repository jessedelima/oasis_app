import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
	background-color: ${props => props.theme.colors.main};
	flex: 1;
`

export const Box = styled.View`
	background: #FFF;
	border-radius: 10px;
	padding: 15px 15px;
	margin-bottom: 20px;
`

export const Content = styled.View`
	padding: 15px 25px;
`

export const TitleText = styled.Text`
	font-family: 'Inter-Bold';
	font-size: 14px;
`
