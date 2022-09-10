import styled from 'styled-components/native'

interface Props {
	isHorizontal?: boolean
}

export const Container = styled.SafeAreaView<Props>`
	flex: ${props => props.isHorizontal ? 0 : 1};
	background-color: #FFF;
	margin-bottom: 10px;
	height: 410px;
	border-radius: 5px;
	margin: ${props => props.isHorizontal ? '10px 10px' : '10px 2px'};
	max-width: ${props => props.isHorizontal ? '170px' : '50%'};
`

export const TopContent = styled.TouchableOpacity`
	height: 55%;
`

export const ProductImage = styled.Image`
	align-self: center;
	height: 50%;
	width: 60%;
	margin-bottom: 10px;
`

export const ProductName = styled.Text`
	color: rgba(0, 0, 0, 0.5);
	margin: 10px 0px;
	font-family: 'Inter-Light';
	margin: 0px 10px;
`

export const ProductDescription = styled.Text`
	color: rgba(2, 2, 2, 1);
	margin-bottom: 10px;
	font-family: 'Inter-Regular';
	margin: 10px 10px;
`

export const MiddleContent = styled.View`
	flex: 2.5;
	justify-content: space-evenly;
`

export const Price = styled.View`
	flex-direction: row;
	justify-content: space-between;
	margin: 10px 10px;
`

export const PriceText = styled.Text`
	font-size: 22px;
	font-weight: bold;
`

export const BtnAdicionar = styled.TouchableOpacity`
	width: 100%;
	background-color: ${props => props.theme.colors.secondary};
	flex: 1;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 0px 10px;
	border-bottom-left-radius: 7px;
	border-bottom-right-radius: 7px;
`

export const BtnAdicionarText = styled.Text`
	color: #FFF;
	font-size: 16px;
	font-weight: bold;
	font-family: 'Inter-Bold';
`
