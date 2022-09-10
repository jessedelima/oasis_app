import styled from 'styled-components/native'

interface InputContainerProps {
	differencial?: number;
}

export const Container = styled.SafeAreaView`
	background-color: #E5E5E5;
	bottom: 0;
	position: absolute;
	width: 100%;
`

export const Row = styled.View`
	flex-direction: row;
	padding: 0px 2px;
`

export const InputContainer = styled.View<InputContainerProps>`
	flex: ${props => props.differencial ? 1 * props.differencial : 1};
	margin: 5px 3px;
`

export const Header = styled.View`
	width: 100%;
	background-color: ${props => props.theme.colors.secondary};
	flex-direction: row;
	padding: 20px 10px;
	align-items: center;
`

export const BackButtonContainer = styled.TouchableOpacity`
	margin-right: 10px;
`

export const HeaderText = styled.Text`
	font-family: 'Inter-Regular';
	color: #FFF;
	font-size: 16px;
`
