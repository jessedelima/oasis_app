import styled from 'styled-components/native'

interface ResultItemActiveProps {
	isActive: boolean;
}

export const Header = styled.View`
	background-color: ${props => props.theme.colors.secondary};
	padding: 5px 15px 20px 15px;
`

export const Content = styled.View`
	padding: 10px 15px;
`

export const Subtitle = styled.Text`
	font-family: 'Inter-Bold';
	font-size: 15px;
`

export const ResultItem = styled.TouchableOpacity<ResultItemActiveProps>`
	margin: 2px 0px;
	padding: 20px 3px;
	border-bottom-width: 1px;
	border-bottom-color: ${(props) => props.isActive ? props.theme.colors.main : 'rgba(0, 0, 0, 0.1)'}
	/* border-color: ${(props) => props.theme.colors.secondary}; */
`

export const ResultItemText = styled.Text<ResultItemActiveProps>`
	color: ${(props) => props.isActive ? props.theme.colors.secondary : 'rgba(0, 0, 0, 0.5)'};
	/* color: ${(props) => props.theme.colors.secondary}; */
`
