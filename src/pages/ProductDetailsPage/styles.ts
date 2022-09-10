import styled from 'styled-components/native'

export const Container = styled.ScrollView`
	flex: 1;
	background-color: #ECECEC;
`

export const TopContent = styled.View`
	background-color: #FFF;
	border-bottom-left-radius: 30px;
	border-bottom-right-radius: 30px;
`

export const Header = styled.View`
	flex-direction: row;
	justify-content: space-between;
	padding: 10px 15px;
	align-items: center;
`

export const BackButton = styled.TouchableOpacity`
	background-color: ${props => props.theme.colors.main};
	padding: 10px;
	border-radius: 10px;
`

export const Title = styled.Text`
	font-family: 'Inter-Bold';
	font-size: 18px;
	margin-left: 15px;
	right: 0px;
`

export const TitleBox = styled.View`
	flex: 1;
	flex-direction: row;
	justify-content: flex-end;
`

export const ProductImageBox = styled.View`
	margin-top: 10px;
	height: 250px;
	padding-bottom: 40px;
`

export const ProductImage = styled.Image`
	width: 100%;
	height: 100%;
	align-self: center;
`

export const DescriptionBox = styled.View`
	margin: 10px 20px;
`

export const Footer = styled.View`
	background-color: #FFF;
`

export const FooterContent = styled.View`
	flex: 1;
	padding: 10px 0px;
	justify-content: center;
	align-items: center;
`

export const Price = styled.Text`
	font-family: 'Inter-Bold';
	font-size: 20px;
	align-self: flex-end;
	margin-right: 20px;
`
