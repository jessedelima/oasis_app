import styled from 'styled-components/native'

interface PickerWrapperProps {
	disabled?: boolean;
}

export const PickerBoxWrapper = styled.View`
	margin: 10px 0px;
`

export const LabelText = styled.Text`
	font-family: 'Inter-Bold';
	align-self: center;
	font-size: 13px;
`

export const PickerWrapper = styled.View<PickerWrapperProps>`
	background-color: ${props => props.disabled ? '#C2C2C2' : '#FFF'};
	border-radius: 5px;
	margin-top: 10px;
`
