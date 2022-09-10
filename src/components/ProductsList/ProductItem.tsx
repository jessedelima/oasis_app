import React, { useContext, useState } from 'react'
import {
	Container,
	ProductImage,
	ProductName,
	ProductDescription,
	Price,
	PriceText,
	BtnAdicionar,
	BtnAdicionarText,
	TopContent,
	MiddleContent
} from './ProductItemStyles'
import { ProductItemParams } from '../../interfaces'
import Counter from '../Counter'
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons'
import { formatPrice } from '../../utils'
import { GlobalModalsContext } from '../../contexts/globalModalsContext'
import { CartContext } from '../../contexts/cartContext'
import { UserContext } from '../../contexts/userContext'
import { useNavigation } from '@react-navigation/native'

const ProductItem = ({ item, isHorizontal }: ProductItemParams) => {
	const { showAlert } = useContext(GlobalModalsContext)
	const { addToCart } = useContext(CartContext)
	const { isLogged } = useContext(UserContext)
	const [quantity, setQuantity] = useState(1)
	const navigation = useNavigation()

	const addQuantity = () => {
		if (quantity < item.max_amount) {
			setQuantity(quantity + 1)
		} else {
			showAlert('Quantidade indisponível para retirada')
		}
	}

	const decQuantity = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1)
		}
	}

	const handleOpenModal = () => {
		navigation.navigate('ProductDetails', {
			item
		})
	}

	const handleAddToCart = () => {
		if (isLogged) {
			addToCart(item, quantity)
			setQuantity(1)
		} else {
			showAlert('Você deve ter uma conta para adicionar ao carrinho', () => {
				navigation.navigate('Account')
			})
		}
	}

	return (
		<Container isHorizontal={isHorizontal} style={{ elevation: 5 }}>

			<TopContent
				activeOpacity={0.5}
				onPress={() => handleOpenModal()}
			>
				<ProductImage
					resizeMode='contain'
					source={{ uri: item.photo }}
				/>
				<ProductName numberOfLines={2}>{item.name}</ProductName>
				<ProductDescription numberOfLines={2}>{item.description}
				</ProductDescription>
			</TopContent>

			<MiddleContent>
				<Counter
					quantity={quantity}
					add={() => addQuantity()}
					dec={() => decQuantity()}
				/>
				<Price>
					<PriceText>R$</PriceText>
					<PriceText>{`${formatPrice(quantity * item.price)}`}</PriceText>
				</Price>
			</MiddleContent>

			<BtnAdicionar
				onPress={() => handleAddToCart()}
			>
				<BtnAdicionarText>Adicionar</BtnAdicionarText>
				<MaterialCommunity name='cart' color='#FFF' size={20} />
			</BtnAdicionar>

		</Container>
	)
}

export default ProductItem
