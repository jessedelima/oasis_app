import React, { useMemo, useRef, useState } from 'react'
import InterBoldText from '../../components/InterBoldText'
import { AswnerText, Container, Label } from './OptionStyles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { HelpOption } from '../../interfaces'
import { View, Animated } from 'react-native'

const Option = ({ item, onPress }: HelpOption) => {
	const [fullHeight, setFullHeight] = useState<number>(0)
	const animatedHeight = useRef(new Animated.Value(0)).current

	const fadeIn = () => {
		Animated.timing(animatedHeight, {
			duration: 1000,
			toValue: fullHeight,
			useNativeDriver: false
		}).start()
	}

	const fadeOut = () => {
		Animated.spring(animatedHeight, {
			friction: 100,
			toValue: 0,
			useNativeDriver: false
		}).start()
	}

	useMemo(() => {
		if (item.isActive) {
			fadeIn()
		} else {
			fadeOut()
		}
	}, [item.isActive])

	return (
		<Container
			onPress={() => onPress(item.id)}
			activeOpacity={0.7}
		>
			<Label>
				<InterBoldText>{item.question}</InterBoldText>
				<MaterialIcons
					name={item.isActive ? 'close' : 'keyboard-arrow-down'}
					color='#000'
					size={20}
				/>
			</Label>
			<Animated.View style={{ height: animatedHeight, overflow: 'hidden', flex: 1 }} >
				<View style={{ flex: 1, position: 'absolute' }} onLayout={(e) => setFullHeight(Math.ceil(e.nativeEvent.layout.height))}>
					<AswnerText>
						{item.aswner}
					</AswnerText>
				</View>
			</Animated.View>
		</Container>
	)
}

export default Option
