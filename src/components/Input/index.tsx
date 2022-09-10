import React, { useEffect, useRef, useState } from 'react'
import { TouchableWithoutFeedback, Animated, TextInput, View, Platform } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import { InputProps } from '../../interfaces'
import { InputContainer, LabelText, InputWrapper } from './styles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Input = ({
	marginTop = 0,
	label,
	placeholder,
	isSecure = false,
	onFocus = null,
	onBlur = null,
	value,
	setValue,
	autoCapitalize = 'words',
	keyboardType = 'default',
	maskedType = null,
	labelBold = true,
	editable = true,
	isBirthday = false,
	isValidate = false,
	maxLength = undefined,
	autoFocus = false,
	withBorder = false,
	isPassword = false,
	isCvv = false,
	notSafe = false,
}: InputProps) => {
	const opacity = useRef(new Animated.Value(0)).current
	const marginTopLabel = useRef(new Animated.Value(30)).current
	const [showPassword, setShowPassword] = useState(true);
	const [inputRef, setInputRef] = useState<TextInput | null>(null)
	const inputMaskedRef = useRef<any>()

	const handleMaskedChangeText = (val: string, raw?: string): string => {
		if (maskedType === 'credit-card') return val
		return raw ?? ''
	}

	useEffect(() => {
		if (autoFocus) {
			setTimeout(() => inputMaskedRef.current.getElement().focus(), 500)
		}
	}, [autoFocus])

	const getMask = () => {
		if (isBirthday) {
			return '99/99/9999'
		} else if (isValidate) {
			return '99/99'
		}
		return undefined
	}

	const fadeInInput = () => {
		if (onFocus) {
			onFocus()
		}
		Animated.timing(marginTopLabel, {
			toValue: 0,
			duration: 300,
			useNativeDriver: false
		}).start()

		Animated.timing(opacity, {
			toValue: 1,
			duration: 300,
			useNativeDriver: false
		}).start()

		inputRef?.focus()
	}

	const fadeOutInput = () => {
		if (onBlur) {
			onBlur()
		}
		if (value.length === 0) {
			Animated.timing(marginTopLabel, {
				toValue: 30,
				duration: 300,
				useNativeDriver: false
			}).start()

			Animated.timing(opacity, {
				toValue: 0,
				duration: 100,
				useNativeDriver: false
			}).start()
		}
	}

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				fadeInInput()
			}}
		>
			<InputContainer activeBorder={withBorder} disabled={!editable} style={{ marginTop: marginTop, elevation: 2 }}>

				<Animated.Text style={{ marginTop: value.length === 0 ? marginTopLabel : 0 }}>
					<LabelText isBold={labelBold}>
						{label}
					</LabelText>
				</Animated.Text>

				<Animated.View style={{ opacity: value.length === 0 ? opacity : 1 }}>
					{!maskedType
						? (
							<View>
								<InputWrapper
									placeholder={placeholder}
									secureTextEntry={Platform.OS == 'ios' ? 
									(isSecure && showPassword) || isCvv :
									(isSecure && !showPassword) || isCvv || notSafe ? false : true}
									ref={(ref) => setInputRef(ref)}
									onFocus={fadeInInput}
									onBlur={fadeOutInput}
									value={value}
									onChangeText={(val) => setValue(val)}
									autoCapitalize={autoCapitalize}
									keyboardType={keyboardType}
									editable={editable}
									maxLength={maxLength}
									password={isPassword}
								/>
								{isPassword && <MaterialCommunityIcons onPress={() => setShowPassword(!showPassword)} style={Platform.OS == "ios" ? {position: 'absolute', right: 5} : {position: 'absolute', right: 30}} name={!showPassword ? 'eye':'eye-off'} size={20} color="black" />}
							</View>
						)
						: (
							<TextInputMask
								ref={inputMaskedRef}
								style={{ marginTop: 0, paddingTop: 0, paddingHorizontal: 0 }}
								type={maskedType}
								value={value}
								onFocus={fadeInInput}
								onBlur={fadeOutInput}
								includeRawValueInChangeText={true}
								onChangeText={(val, raw) => setValue(handleMaskedChangeText(val, raw))}
								placeholder={placeholder}
								options={{
									mask: getMask(),
									unit: maskedType === 'money' ? 'R$ ' : undefined
								}}
								editable={editable}
								keyboardType={keyboardType}
							/>
						)}

				</Animated.View>
			</InputContainer>
		</TouchableWithoutFeedback>
	)
}

export default Input
