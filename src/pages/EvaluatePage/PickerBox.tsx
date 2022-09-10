import { Picker } from '@react-native-picker/picker'
import React from 'react'
import { PickerBoxProps } from '../../interfaces'
import { LabelText, PickerBoxWrapper, PickerWrapper } from './PickerBoxStyles'

const PickerBox = ({ label, value, setValue, options, disabled }: PickerBoxProps) => {
	return (
		<PickerBoxWrapper>
			<LabelText>
				{label}
			</LabelText>
			<PickerWrapper disabled={disabled}>
				<Picker
					selectedValue={value}
					onValueChange={(val) => setValue(val)}
					enabled={!disabled}
				>
					<Picker.Item
						label='Selecione uma opção'
					/>
					{options.map(op => (
						<Picker.Item
							key={op.value.toString()}
							label={op.label}
							value={op.value}
						/>
					))}
				</Picker>
			</PickerWrapper>

		</PickerBoxWrapper>
	)
}

export default PickerBox
