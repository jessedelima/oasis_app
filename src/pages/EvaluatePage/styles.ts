import styled from 'styled-components/native'

interface TextAreaProps {
	disabled?: boolean;
}

export const MinorText = styled.Text`
	font-size: 14px;
	font-family: 'Inter-Bold';
	color: rgba(0, 0, 0, 0.58);
	padding: 15px;
`

export const TextAreaLabel = styled.Text`
	font-family: 'Inter-Bold';
	align-self: center;
	font-size: 13px;
	margin: 10px 0px;
`

export const TextArea = styled.TextInput<TextAreaProps>`
	background-color: ${props => props.disabled ? '#C2C2C2' : '#FFF'};
	border-radius: 5px;
	font-family: 'Inter-Regular';
`
