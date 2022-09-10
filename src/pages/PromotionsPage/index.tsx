import { ScrollView, View } from 'react-native'
import React, { useContext } from 'react'
import Header from '../../components/Header'
import PageTitle from '../../components/PageTitle'
import ProductsList from '../../components/ProductsList'
import Subtitle from '../../components/Subtitle'
import { ProductsContext } from '../../contexts/productsContext'
import { SafeAreaView } from 'react-native-safe-area-context'

const Promocoes: React.FC = () => {
	const { promotions } = useContext(ProductsContext)

	return (
		<SafeAreaView style={{flex: 1}}>
			<ScrollView>
				<Header />
				<PageTitle title='Promoções para você' />
				{promotions.map((promotion, index) => (
					<View style={{ marginTop: 10 }} key={`${promotion.name}-${index.toString()}`}>
						<Subtitle key={index.toString()} label={promotion.name} />
						<ProductsList
							products={promotion.products}
							isHorizontal
						/>
					</View>
				))}
			</ScrollView>
		</SafeAreaView>
	)
}

export default Promocoes
