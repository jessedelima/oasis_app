import styled from 'styled-components/native'

interface DeliveryOptionBtnProps {
	isActive: boolean;
}

interface RightContentProps {
	hasButton: boolean | null;
}

interface LeftContentProps {
	hasIcon: boolean
}

export const DeliveryOptionBtn = styled.TouchableOpacity<DeliveryOptionBtnProps>`
	flex-direction: row;
	align-items: center;
	background-color: #FFF;
	margin-bottom: 10px;
	width: 90%;
	justify-content: space-between;
	border-radius: 15px;
	border-width: ${props => props.isActive ? '1px' : '0px'};
	border-color: ${props => props.isActive ? props.theme.colors.main : '#FFF'};
`

export const LeftContent = styled.View<LeftContentProps>`
	padding: 15px 20px;
	flex: 2;
	flex-direction: ${props => props.hasIcon ? 'row' : 'column'};
	align-items: ${props => props.hasIcon ? 'center' : 'flex-start'};
`

export const RightContent = styled.View<RightContentProps>`
	padding: ${props => props.hasButton ? '5px 5px' : '30px 20px'};
`

export const RightButton = styled.View`
	background-color: ${props => props.theme.colors.main};
	padding: 15px;
	justify-content: center;
	align-items: center;
	border-radius: 15px;
	flex: 1;
`

export const SecondaryLabel = styled.Text`
	font-family: 'Inter-Regular';
	font-size: 12px;
	color: #DADADA;
`

export const ThirdLabel = styled.Text`
	font-family: 'Inter-Regular';
	font-weight: 500;
	font-size: 12px;
	color: ${props => props.theme.colors.main};
`
