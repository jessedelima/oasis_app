import React from 'react'
import { FlatList } from 'react-native'
import { ProductsListParams } from '../../interfaces'
import NotFound from '../NotFound'
import ProductItem from './ProductItem'
import { Wrapper } from './styles'

const ProductsList = ({ products, isHorizontal = false }: ProductsListParams) => {
	return (
		<Wrapper>
			{
				products.length > 0
					? (
						<FlatList
							data={products}
							horizontal={isHorizontal}
							keyExtractor={(item) => item.id.toString()}
							renderItem={({ item }) => <ProductItem key={item.id.toString()} isHorizontal={isHorizontal} item={item} />}
							numColumns={isHorizontal ? undefined : 2}
						/>
					)
					: (
						<NotFound />
					)
			}

		</Wrapper>
	)
}

export default ProductsList
