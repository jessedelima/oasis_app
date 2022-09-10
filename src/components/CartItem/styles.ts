import styled from 'styled-components/native'

export const Container = styled.TouchableOpacity`
	margin: 10px 20px;
	flex-direction: row;
	background-color: #FFF;
	padding: 10px 0px;
	padding-right: 10px;
	border-radius: 10px;
`

export const ImageBox = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	padding: 0px 5px;
`

export const ProductImage = styled.Image`
	width: 90%;
	height: 100px;
`

export const DescriptionBox = styled.View`
	flex: 3;
`

export const ItemName = styled.Text`
	font-family: 'Inter-Light';
	color: rgba(0, 0, 0, 0.5);
	font-weight: bold;
	margin-bottom: 10px;
	flex: 1;
`

export const DescriptionText = styled.Text`
	font-family: 'Inter-Regular';
	font-size: 12px;
	margin-bottom: 10px;
	flex: 1;
`

export const PriceBox = styled.View`
	flex: 1;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`

export const PriceText = styled.Text`
	margin-left: 10px;
	flex: 1;
	font-family: 'Inter-Bold';
	font-size: 18px;
	text-align: center;
`
