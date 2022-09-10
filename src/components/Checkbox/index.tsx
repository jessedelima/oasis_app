import React from 'react'
import CheckBox from '@react-native-community/checkbox'
import { theme } from '../../utils/theme'
import { Platform, Text } from 'react-native'
import { CheckBoxContainer, CheckBoxText } from './styles'
import { CheckBoxInputProps } from '../../interfaces'

const CheckBoxInput = ({ label, boldLabel, value, setValue, onPress }: CheckBoxInputProps) => {
	return (
		<CheckBoxContainer activeOpacity={onPress ? 0 : 1} onPress={onPress}>
			<CheckBox
				value={value}
				onValueChange={val => setValue(val)}
				tintColors={{
					true: theme.colors.main,
					false: theme.colors.secondary
				}}
				onCheckColor={theme.colors.main}
				onTintColor={theme.colors.main}
			/>
			<CheckBoxText style={Platform.OS =="ios" && {marginLeft: 10}}>
				{`${label} `}
				<Text style={{ fontWeight: 'bold' }}>
					{boldLabel}
				</Text>
			</CheckBoxText>
		</CheckBoxContainer>
	)
}

export default CheckBoxInput
