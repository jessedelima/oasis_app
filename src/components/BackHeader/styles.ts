import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
	background-color: ${props => props.theme.colors.secondary};
	padding: 15px 10px;
	flex-direction: row;
	align-items: center;
`

export const BackButtonBox = styled.TouchableOpacity`
	margin-right: 10px;
`
