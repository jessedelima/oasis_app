import styled from 'styled-components/native'

interface StatusBoxParams {
	color?: string;
}

interface BtnRateParams {
	isEvaluated?: boolean;
}

export const StatusContainer = styled.View`
	flex-direction: row;
	padding: 15px 5px;
	justify-content: space-between;
	align-items: center;
`

export const StatusBox = styled.View<StatusBoxParams>`
	background-color: ${props => props.color ?? props.theme.colors.main};
	padding: 10px 15px;
	border-radius: 5px;
`

export const StatusLabel = styled.Text`
	font-family: 'Inter-Bold';
	color: #FFF;
`

export const Box = styled.View`
	background-color: #FFF;
	padding: 10px;
	border-radius: 10px;
	margin-bottom: 10px;
`

export const LoadingBox = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
`

export const LoadingTextContainer = styled.View`
	margin-top: 10px;
`

export const BtnRateOrder = styled.TouchableOpacity<BtnRateParams>`
	background-color: ${props => props.theme.colors.main};
	align-self: flex-start;
	width: ${props => props.isEvaluated ? '100%' : '65%'};
	padding: ${props => props.isEvaluated ? '15px' : '8px'};
	border-radius: 5px;
	margin-top: 5px;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`

export const BtnRateOrderText = styled.Text`
	font-family: 'Inter-Bold';
	color: #FFF;
`
