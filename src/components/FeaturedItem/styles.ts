import styled from 'styled-components/native'

export const Wrapper = styled.View`
	background-color: #FFF;
	flex-direction: row;
	padding: 10px 15px;
	height: 200px;
	margin-bottom: 10px;
`

export const LeftContainer = styled.View`
	flex: 1;
	align-items: center;
	justify-content: space-between;
`

export const RightContainer = styled.View`
	flex: 1;
	align-items: center;
	justify-content: space-around;
`

export const ProgressStatus = styled.Text`
	position: absolute;
	right: 10px;
	font-weight: bold;
	font-size: 16px;
	z-index: 20;
`

export const ProductImage = styled.Image`
	height: 70%;
	width: 60%;
`

export const BtnAdicionar = styled.TouchableOpacity`
	background-color: ${props => props.theme.colors.secondary};
	width: 80%;
	padding: 10px 0px;
	max-height: 30%;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
`

export const BtnText = styled.Text`
	color: #FFF;
	font-weight: bold;
	font-size: 12px;
	text-transform: uppercase;
	font-family: 'Inter-Bold';
`

export const TotalPrice = styled.Text`
	font-size: 25px;
	font-weight: bold;
	font-family: 'Inter-Bold';
`

export const NextItemIcon = styled.TouchableOpacity`
	position: absolute;
	right: 5px;
	top: 50%;
`

export const PreviousNextItem = styled.TouchableOpacity`
	position: absolute;
	left: 5px;
	top: 50%;
`
