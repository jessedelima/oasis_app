import React, { useContext } from 'react'
import { CartContext } from '../../contexts/cartContext'
import { CartItemProps } from '../../interfaces'
import { formatPrice } from '../../utils'
import Counter from '../Counter'
import RemoveItemIcon from './RemoveItemIcon'
import { useNavigation } from '@react-navigation/native'
import {
	Container,
	DescriptionBox,
	ImageBox,
	ItemName,
	ProductImage,
	DescriptionText,
	PriceBox,
	PriceText
} from './styles'
import { GlobalModalsContext } from '../../contexts/globalModalsContext'

const CartItem = ({ item }: CartItemProps) => {
	const navigation = useNavigation()
	const { addToCart, decCart, removeCartItem } = useContext(CartContext)
	const {
		modals,
		setModalActive,
		setModalInactive,
		showAlert
	} = useContext(GlobalModalsContext)
	const openDetails = () => navigation.navigate(
		'ProductDetails', {
			item,
			quantity: item.quantity,
			cartsId: item.cart_items_id
		})

	const closeModalConfirmation = () => {
		setModalInactive({
			...modals,
			confirmation: { visible: false, payload: null }
		})
	}

	const handleRemoveItem = async () => {
		closeModalConfirmation()
		console.log(item)
		await removeCartItem(item.cart_items_id)
	}

	const removeItem = () => {
		setModalActive({
			...modals,
			confirmation: {
				visible: true,
				payload: {
					title: 'Atenção',
					text: 'Você deseja mesmo remover esse item do carrinho?',
					accept: handleRemoveItem,
					decline: closeModalConfirmation
				}
			}
		})
	}

	const addQuantity = () => {
		if (item.max_amount === null || item.quantity < item.max_amount) {
			addToCart(item, 1, true)
		} else {
			showAlert('Quantidade indisponível')
		}
	}

	const decQuantity = () => {
		(item.quantity - 1) === 0
			? removeItem()
			: decCart(item.cart_items_id)
	}

	return (
		<Container
			onPress={openDetails}
		>
			<RemoveItemIcon
				onClick={removeItem}
			/>
			<ImageBox>
				<ProductImage
					resizeMode='contain'
					source={{ uri: item.photo }}
				/>
			</ImageBox>

			<DescriptionBox>
				<ItemName>{item.name}</ItemName>
				<DescriptionText numberOfLines={2}>{item.description}</DescriptionText>
				<PriceBox>
					<Counter
						allowZero
						small
						quantity={item.quantity}
						add={addQuantity}
						dec={decQuantity}
					/>
					<PriceText>
						{`R$ ${formatPrice(item.price * item.quantity)}`}
					</PriceText>
				</PriceBox>
			</DescriptionBox>

		</Container>
	)
}

export default CartItem
