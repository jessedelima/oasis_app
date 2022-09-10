import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
	flex: 1;
	background-color: #E5E5E5;
`

export const LabelText = styled.Text`
	font-family: 'Inter-Regular';
	font-weight: 700;
	font-size: 24px;
	padding: 20px 20px 40px 20px;
`

export const Box = styled.View`
	background-color: ${props => props.theme.colors.main};
	flex: 6;
	border-top-left-radius: 25px;
	border-top-right-radius: 25px;
	padding: 15px 30px;
	justify-content: space-between;
`

export const Row = styled.Text`
	margin: 10px 0px;
`

export const DescriptionText = styled.Text`
	color: #FFF;
	font-family: 'Inter-Regular';
	font-weight: 700;
	font-size: 24px;
`

export const OrderCodeText = styled.Text`
	color: #000;
	font-family: 'Inter-Regular';
	font-weight: 700;
	font-size: 24px;
`

export const Button = styled.TouchableOpacity`
	background-color: ${props => props.theme.colors.secondary};
	padding: 25px 20px;
	flex-direction: row;
	justify-content: space-between;
	border-radius: 10px;
`

export const BtnText = styled.Text`
	font-family: 'Inter-Regular';
	color: #FFF;
	font-size: 16px;
`
