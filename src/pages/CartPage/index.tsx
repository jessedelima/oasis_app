import { SafeAreaView, FlatList, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { CartContext } from '../../contexts/cartContext'
import Header from '../../components/Header'
import PageTitle from '../../components/PageTitle'
import CartItemComponent from '../../components/CartItem'
import EmptyCart from './EmptyCart'
import { FooterPrice } from './styles'
import InterText from '../../components/InterText'
import { PagesProps } from '../../interfaces'
import { formatPrice } from '../../utils'
import LargeButton from '../../components/LargeButton'
import { InformationsContext } from '../../contexts/informationsContext'
import { GlobalModalsContext } from '../../contexts/globalModalsContext'

const Carrinho = ({ navigation }: PagesProps) => {
	const { cart, totalPrice } = useContext(CartContext)
	const { informations } = useContext(InformationsContext)
	const { showAlert } = useContext(GlobalModalsContext)
	const isEmpty = cart.length === 0

	const handleSubmit = () => {
		const minValue = informations?.min_value_order
		if (minValue) {
			if (totalPrice >= parseFloat(minValue)) {
				navigation.navigate('PaymentRoutes')
			} else {
				showAlert(`O valor mínimo da compra deve ser R$ ${formatPrice(minValue)}`)
			}
		} else {
			navigation.navigate('PaymentRoutes')
		}
	}
	
	return (
		<SafeAreaView style={{ flex: 1 }}>
			{ isEmpty
				? (
					<EmptyCart />
				)
				: (
					<>
						<Header />
						<PageTitle title='Meu Carrinho' />
						<FlatList
							style={{ marginTop: 10 }}
							data={cart}
							keyExtractor={(el, index) => `${el.id}-${index}`}
							renderItem={({ item }) => <CartItemComponent item={item} />}
						/>

						<FooterPrice style={{ elevation: 5 }}>
							<InterText style={{ fontSize: 18 }}>
								Total:
							</InterText>
							<Text style={{ fontFamily: 'Inter-Bold', fontSize: 18 }}>
								{`R$ ${formatPrice(totalPrice)}`}
							</Text>
						</FooterPrice>

						<LargeButton
							onPress={handleSubmit}
							labelText='Finalizar compra'
						/>

					</>
				)}

		</SafeAreaView>
	)
}

export default Carrinho
