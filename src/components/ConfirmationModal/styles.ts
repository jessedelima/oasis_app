import styled from 'styled-components/native'

interface BtnProps {
	bgColor: string;
}

export const Container = styled.SafeAreaView`
	background-color: #FFF;
	align-self: center;
	width: 80%;
	height: 40%;
	border-radius: 20px;
	justify-content: space-between;
`

export const TopWrapper = styled.View`
	margin-top: 10px;
	align-items: center;
	flex: 1;
	padding: 10px 0px;
`

export const Title = styled.Text`
	text-align: center;
	font-family: 'Inter-Bold';
	font-size: 18px;
`

export const Content = styled.View`
	flex: 5;
	padding: 0px 15px;
	justify-content: center;
`

export const ConfirmationDescription = styled.Text`
	text-align: center;
	font-size: 16px;
	font-family: 'Inter-Regular';
`

export const ButtonsWrapper = styled.View`
	margin-bottom: 10px;
	padding: 0px 15px;
	flex-direction: row;
	justify-content: space-evenly;
`

export const Button = styled.TouchableOpacity <BtnProps>`
	height: 60px;
	width: 60px;
	justify-content: center;
	align-items: center;
	border-radius: 20px;
	background-color: ${props => props.bgColor}
`
