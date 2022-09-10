import React from 'react'
import { PaymentButtonProps } from '../../interfaces'
import { DeliveryOptionBtn, RightButton, LeftContent, RightContent, SecondaryLabel, ThirdLabel } from './styles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { theme } from '../../utils/theme'
import InterText from '../InterText'
import { TouchableOpacity } from 'react-native'

const PaymentButton = ({
	isActive,
	label,
	onPress,
	rightIconName,
	leftIconName = null,
	hasButton = null,
	secondaryLabel = null,
	rightIconBtn = null,
	thirdLabel = null
}: PaymentButtonProps) => {
	return (
		<DeliveryOptionBtn onPress={onPress} isActive={isActive}>
			<LeftContent hasIcon={!!(leftIconName && leftIconName.length > 0)}>
				{leftIconName && (
					<MaterialCommunityIcons
						style={{ marginRight: 10 }}
						name={leftIconName}
						size={25}
						color={isActive ? theme.colors.main : '#DADADA'}
					/>
				)}
				<InterText>{label}</InterText>
				{ secondaryLabel && (
					<SecondaryLabel>{secondaryLabel}</SecondaryLabel>
				) }
				{thirdLabel && (
					<ThirdLabel>{thirdLabel}</ThirdLabel>
				)}
			</LeftContent>
			<RightContent hasButton={hasButton}>
				{ hasButton
					? (
						<RightButton>
							<MaterialCommunityIcons name={rightIconName} size={25} color='#FFF' />
						</RightButton>
					)
					: rightIconBtn
						? (
							<TouchableOpacity
								onPress={rightIconBtn}
							>
								<MaterialCommunityIcons
									name={rightIconName}
									size={25}
									color={isActive ? theme.colors.main : '#DADADA'}
								/>
							</TouchableOpacity>
						)
						: (
							<MaterialCommunityIcons
								name={rightIconName}
								size={25}
								color={isActive ? theme.colors.main : '#DADADA'}
							/>
						)}
			</RightContent>

		</DeliveryOptionBtn>
	)
}

export default PaymentButton
