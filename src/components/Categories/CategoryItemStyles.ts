import styled from 'styled-components/native'

interface Props {
	active: boolean
}

export const CategoryItemWrapper = styled.TouchableOpacity <Props>`
	background-color: ${props => props.active ? props.theme.colors.main : '#f2f2f2'};
	padding: 5px 10px;
	margin: 10px 0px;
	border-radius: 5px;
`

export const CategoryName = styled.Text <Props>`
	color: ${props => props.active ? '#FFF' : '#000'};
`
