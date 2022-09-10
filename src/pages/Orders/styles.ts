import styled from 'styled-components/native'

interface RateContainerProps {
	isRated: boolean;
}

interface StatusProps {
	color?: string;
}

export const Container = styled.SafeAreaView`
	flex: 1;
`

export const OrderItemWrapper = styled.View`
	margin: 2px 0px;
	background-color: #FFF;
	flex-direction: row;
	padding: 10px 10px;
	min-height: 135px;
`

export const LeftContainer = styled.View`
	flex: 4;
	padding: 0px 10px;
`

export const RightContainer = styled.View`
	flex: 3;
	justify-content: space-between;
`

export const RateContainer = styled.TouchableOpacity<RateContainerProps>`
	margin-top: 5px;
	background-color: ${props => props.isRated ? props.theme.colors.main : '#DADADA'};
	align-self: flex-start;
	padding: 5px 10px;
	border-radius: 5px;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: center;
`

export const RateContainerText = styled.Text`
	font-family: 'Inter-SemiBold';
	color: #FFF;
`

export const StatusText = styled.Text<StatusProps>`
	font-family: 'Inter-SemiBold';
	color: ${props => props.color ?? props.theme.colors.main};
`

export const DetailsBtn = styled.TouchableOpacity`
	background-color: ${props => props.theme.colors.secondary};
	padding: 10px 30px;
	border-radius: 5px;
	align-self: flex-start;
`

export const DetailsBtnText = styled.Text`
	font-family: 'Inter-SemiBold';
	color: #FFF;
`

export const DescriptionText = styled.Text`
	font-family: 'Inter-Regular';
	padding: 0px 50px;
	text-align: center;
	margin-bottom: 15px;
`
