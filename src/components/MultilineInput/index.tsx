import React, { useRef, useState } from 'react'
import { Animated, TouchableWithoutFeedback, TextInput } from 'react-native'
import { MultilineInputProps } from '../../interfaces'
import { LabelText, Wrapper } from './styles'

const MultilineInput = ({
	value,
	setValue,
	placeholder,
	label
}: MultilineInputProps) => {
	const opacity = useRef(new Animated.Value(0)).current
	const top = useRef(new Animated.Value(50)).current
	const paddingVertical = useRef(new Animated.Value(0)).current
	const [inputRef, setInputRef] = useState<TextInput | null>(null)

	const fadeInInput = () => {
		Animated.timing(top, {
			toValue: 10,
			duration: 300,
			useNativeDriver: false
		}).start()

		Animated.timing(paddingVertical, {
			toValue: 10,
			duration: 300,
			useNativeDriver: false
		})

		Animated.timing(opacity, {
			toValue: 1,
			duration: 300,
			useNativeDriver: false
		}).start()

		inputRef?.focus()
	}

	const fadeOutInput = () => {
		if (value.length === 0) {
			Animated.timing(top, {
				toValue: 50,
				duration: 300,
				useNativeDriver: false
			}).start()

			Animated.timing(paddingVertical, {
				toValue: 0,
				duration: 300,
				useNativeDriver: false
			})

			Animated.timing(opacity, {
				toValue: 0,
				duration: 100,
				useNativeDriver: false
			}).start()
		}
	}

	return (
		<TouchableWithoutFeedback onPress={fadeInInput}>
			<Wrapper style={{ elevation: 2 }}>

				<Animated.Text style={{ top: top, paddingVertical: paddingVertical }}>
					<LabelText>
						{label}
					</LabelText>
				</Animated.Text>

				<Animated.View style={{ opacity: value.length === 0 ? opacity : 1 }}>
					<TextInput
						style={{ paddingVertical: 10, paddingHorizontal: 0 }}
						value={value}
						onChangeText={val => setValue(val)}
						placeholder={placeholder}
						ref={(ref) => setInputRef(ref)}
						onFocus={fadeInInput}
						onBlur={fadeOutInput}
						multiline
						numberOfLines={4}
						textAlignVertical='top'
					/>
				</Animated.View>

			</Wrapper>
		</TouchableWithoutFeedback>
	)
}

export default MultilineInput
