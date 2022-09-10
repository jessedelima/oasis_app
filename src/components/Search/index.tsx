import React from 'react'
import { InputWrapper, InputText } from './styles'
import Button from './Button'
import { SearchComponentParams } from '../../interfaces'
import { Platform } from 'react-native'

const Search = ({ onSubmit, iconName, value, setValue }: SearchComponentParams) => {
	return (
		<InputWrapper lg>
			<InputText
				style={Platform.OS == "ios" ?
				{ fontFamily: 'Inter-Regular', paddingVertical: 12.5 } :
				{ fontFamily: 'Inter-Regular' }}
				placeholder='Busca...'
				value={value}
				onChangeText={(val) => setValue(val)}
				returnKeyType='search'
				onEndEditing={onSubmit}
			/>
			<Button iconName={iconName} onSubmit={onSubmit} />
		</InputWrapper>
	)
}

export default Search
