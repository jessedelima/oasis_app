import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
	flex: 1;
`

export const Header = styled.View`
	background-color: ${props => props.theme.colors.secondary};
	justify-content: center;
	flex-direction: column;
	align-items: center;
`

export const HeaderContent = styled.View`
	padding-top: 10px;
	width: 90%;
	justify-content: center;
`

export const InfoBox = styled.View`
	border-top-color: rgba(255, 255, 255, 0.2);
	border-top-width: 2px;
	padding: 10px 10px 5px 7px;
`

export const InfoText = styled.Text`
	margin-bottom: 5px;
	color: rgba(255, 255, 255, 0.7);
	font-family: 'Inter-Regular';
	font-size: 12px;
`
export const Menu = styled.View`
	width: 90%;
	align-self: center;
`
