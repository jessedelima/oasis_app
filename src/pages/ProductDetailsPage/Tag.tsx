import React from 'react'
import { Text } from 'react-native'
import InterText from '../../components/InterText'
import { Wrapper } from './TagStyles'

const Tag = ({ item }: {item: string}) => {
	return (
		<Wrapper>
			<InterText>
				<Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 10 }}>
					{item}
				</Text>
			</InterText>
		</Wrapper>
	)
}

export default Tag
