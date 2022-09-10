import styled from 'styled-components/native'

export const OrderProductWrapper = styled.View`
	background-color: #FFF;
	margin: 5px 0px;
	flex-direction: row;
	height: 120px;
	border-radius: 5px;
`

export const ItemDescription = styled.View`
	flex: 4;
	justify-content: space-between;
	padding: 15px;
`

export const ImageBox = styled.View`
	flex: 2;
	align-items: center;
	justify-content: center;
`

export const ProductImage = styled.Image`
	height: 90%;
	width: 90%;
`

export const BottomContent = styled.View`
	flex-direction: row;
	justify-content: space-between;
`

export const ItemNameText = styled.Text`
	font-size: 12px;
	font-family: 'Inter-Bold';
	color: rgba(0, 0, 0, 0.5);
`

export const ItemDescriptionText = styled.Text`
	font-size: 13px;
	font-family: 'Inter-Regular';
`
