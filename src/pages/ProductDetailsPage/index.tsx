import React, { useContext, useState, useEffect } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FloatPrice from './FloatPrice'
import Tag from './Tag'
import InterText from '../../components/InterText'
import Counter from '../../components/Counter'
import LargeButton from '../../components/LargeButton'
import { Category, ProductDetailsPageProps } from '../../interfaces'
import { FlatList, Platform, Text, View } from 'react-native'
import { formatPrice } from '../../utils'
import { CartContext } from '../../contexts/cartContext'
import { UserContext } from '../../contexts/userContext'
import { GlobalModalsContext } from '../../contexts/globalModalsContext'
import {
	TopContent,
	BackButton,
	Container,
	DescriptionBox,
	Footer,
	FooterContent,
	Header,
	Price,
	ProductImage,
	ProductImageBox,
	Title,
	TitleBox
} from './styles'
import { SafeAreaView } from 'react-native-safe-area-context'

const ProductDetailsPage = ({ navigation, route }: ProductDetailsPageProps) => {
	const [quantity, setQuantity] = useState<number>(route.params.quantity ?? 1)
	const { addToCart, updateItemInCart } = useContext(CartContext)
	const { isLogged } = useContext(UserContext)
	const { showAlert } = useContext(GlobalModalsContext)
	const { item } = route.params
	const isInCart = !!route.params.quantity

	const addQuantity = () => {
		if (quantity < item.max_amount) {
			setQuantity(quantity + 1)
		} else {
			showAlert('Quantidade indisponível no momento')
		}
	}

	const decQuantity = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1)
		}
	}

	useEffect(() => {
		console.log(item);
	}, [])

	const handleAddToCart = () => {
		if (isLogged) {
			if (isInCart && route.params.cartsId) {
				updateItemInCart(route.params.cartsId, quantity, () => navigation.goBack())
			} else {
				addToCart(item, quantity)
				navigation.goBack()
			}
		} else {
			showAlert(
				'Você deve ter uma conta para adicionar produtos ao carrinho',
				'Atenção',
				() => { navigation.navigate('Account') }
			)
		}
	}

	return (
		<SafeAreaView style={{flex: 1}}>

			<Container style={Platform.OS == "ios" && {marginTop: 10}}>
				<>
					<TopContent style={{ elevation: 1 }}>
						<Header>

							<BackButton onPress={() => navigation.goBack()}>
								<MaterialIcons name='arrow-back' size={20} color='#FFF' />
							</BackButton>

							<TitleBox>
								<Title>{item.name}</Title>
							</TitleBox>

						</Header>

						<ProductImageBox>
							<ProductImage resizeMode='contain' source={{ uri: item.photo }} />
						</ProductImageBox>
						<FloatPrice price={item.price} />
					</TopContent>

					<FlatList
						style={{ marginTop: 10 }}
						showsHorizontalScrollIndicator={false}
						horizontal
						keyExtractor={(item, index) => `${index}-${item}`}
						data={item.categories}
						renderItem={({ item }: { item: Category }) => <Tag item={item.name} />}
					/>

					<DescriptionBox>
						<Text style={{ fontFamily: 'Inter-Bold' }}>
							Descrição
						</Text>
						<InterText style={{ marginTop: 10 }}>
							{item.description}
						</InterText>
					</DescriptionBox>
				</>
			</Container>

			<Footer style={{ elevation: 5 }}>
				<View style={{ flexDirection: 'row' }}>

					<FooterContent>
						<Counter
							quantity={quantity}
							add={addQuantity}
							dec={decQuantity}
						/>
					</FooterContent>

					<FooterContent>
						<Price>{ `R$ ${formatPrice(item.price * quantity)}` }</Price>
					</FooterContent>
				</View>
				<LargeButton
					onPress={handleAddToCart}
					labelText={
						isInCart ? 'Atualizar Carrinho' : 'Adicionar ao carrinho'
					}
				/>
			</Footer>

		</SafeAreaView>
	)
}

export default ProductDetailsPage
