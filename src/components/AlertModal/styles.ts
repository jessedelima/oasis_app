import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
	background-color: #FFF;
	align-self: center;
	width: 80%;
	min-height: 20%;
	border-radius: 20px;
	padding: 10px 20px;
	justify-content: space-between;
`

export const Header = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`

export const Title = styled.Text`
	font-family: 'Inter-Bold';
	font-size: 18px;
	text-align: center;
`

export const Content = styled.View`
	flex: 5;
	justify-content: center;
`

export const Button = styled.TouchableOpacity`
	flex: 1;
	align-items: flex-end
`
