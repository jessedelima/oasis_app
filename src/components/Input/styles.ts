import styled from 'styled-components/native'

interface LabelTextProps {
	isBold: boolean;
}

interface InputContainerProps {
	disabled: boolean;
	activeBorder: boolean;
}

export const InputContainer = styled.View<InputContainerProps>`
	background-color: ${props => props.disabled ? '#DADADA' : '#FFFF'};
	border-radius: 5px;
	padding: 10px 15px 0px 15px;
	height: 60px;
	justify-content: center;
	border-width: ${props => props.activeBorder ? '1px' : '0px'};
	border-color: ${props => props.activeBorder ? props.theme.colors.main : 'transparent'};
`

export const LabelText = styled.Text<LabelTextProps>`
	font-family: 'Inter-Regular';
	font-weight: ${props => props.isBold ? 'bold' : 'normal'};
`

export const InputWrapper = styled.TextInput`
	padding: 5px 0px;
	font-family: 'Inter-Regular';
`
