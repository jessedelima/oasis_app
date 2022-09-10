import styled from 'styled-components/native'

interface ContainerProps {
	bgColor: string;
}

interface TextProps {
	textColor: string;
}

export const Container = styled.TouchableOpacity<ContainerProps>`
	background-color: ${props => props.bgColor};
	padding: 12px 15px;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	flex-direction: row;
	margin-top: 10px;
`

export const TitleText = styled.Text<TextProps>`
	font-family: 'Inter-Bold';
	color: ${props => props.textColor};
	font-size: 15px;
	margin-left: 10px;
`
