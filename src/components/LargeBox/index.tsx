import React from 'react'
import { Text, View } from 'react-native'
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons'
import { LargeBoxWrapper } from './styles'
import { LargeBoxParams } from '../../interfaces'
import InterText from '../InterText'

const LargeBox = ({ label, iconName, strongLabel = '.', customStyles }: LargeBoxParams) => {
	const { paddingVertical, paddingHorizontal } = customStyles

	return (
		<LargeBoxWrapper
			style={{ paddingVertical, paddingHorizontal }}
		>
			<View style={{ flexDirection: 'row' }}>

				<InterText numberOfLines={1} >
					<Text style={{ color: '#FFF' }}>
						{label}
					</Text>
					<Text style={{ color: '#FFF', fontWeight: 'bold' }}>
						{strongLabel ? ` ${strongLabel}` : '.'}
					</Text>
				</InterText>

			</View>
			<MaterialCommunity name={iconName} color='#FFF' size={20} />
		</LargeBoxWrapper>
	)
}

export default LargeBox
