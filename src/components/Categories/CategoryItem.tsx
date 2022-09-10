import React from 'react'
import { Category } from '../../interfaces'
import InterText from '../InterText'
import { CategoryItemWrapper, CategoryName } from './CategoryItemStyles'

interface CategoryItemParams {
	item: Category;
	onPress: () => void;
}

const CategoryItem = ({ item, onPress }: CategoryItemParams) => {
	return (
		<CategoryItemWrapper
			onPress={() => onPress()}
			active={item.checked}
		>
			<CategoryName active={item.checked}>
				<InterText>
					{item.name}
				</InterText>
			</CategoryName>
		</CategoryItemWrapper>
	)
}

export default CategoryItem
