import React from 'react'
import { FlatList } from 'react-native'
import CategoryItem from './CategoryItem'
import { Container } from './styles'
import { Category, CategoriesParams } from '../../interfaces'

const Categories = ({ data, onChangeActive }:CategoriesParams) => {
	function onPress (categoryId: number): void {
		onChangeActive(categoryId)
	}

	return (
		<Container>
			<FlatList
				data={data}
				horizontal
				showsHorizontalScrollIndicator={false}
				keyExtractor={(item) => item.id ? item.id.toString() : item.name}
				renderItem={({ item }: {item: Category}) => (
					<CategoryItem onPress={() => onPress(item.id)} key={item.id} item={item} />
				)}
			/>
		</Container>
	)
}

export default Categories
