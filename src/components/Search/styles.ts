import styled from 'styled-components/native'

interface InputWrapperProps {
	lg: boolean;
}

export const InputWrapper = styled.View<InputWrapperProps>`
	width: ${props => props.lg ? '95%' : '85%'};
	background-color: #FFF;
	align-self: center;
	padding: ${props => props.lg ? '10px 7px' : '0px 7px'};
	display: flex;
	flex-direction: row;
	border-radius: 10px;
`

export const InputText = styled.TextInput`
	width: 85%;
	padding-left: 10px;
`
