import React, { useContext, useState } from 'react'
import { FeaturedItemParams } from '../../interfaces'
import {
	Wrapper,
	LeftContainer,
	RightContainer,
	ProgressStatus,
	ProductImage,
	BtnAdicionar,
	BtnText,
	TotalPrice,
	NextItemIcon,
	PreviousNextItem
} from './styles'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Counter from '../Counter'
import InterText from '../InterText'
import { formatPrice } from '../../utils'
import { CartContext } from '../../contexts/cartContext'
import { UserContext } from '../../contexts/userContext'
import { GlobalModalsContext } from '../../contexts/globalModalsContext'
import { useNavigation } from '@react-navigation/native'
import GestureRecognizer from 'react-native-swipe-gestures'

const FeaturedItem = ({ items }: FeaturedItemParams) => {
	const [currentId, setCurrentId] = useState(0)
	const [quantity, setQuantity] = useState(1)
	const { addToCart } = useContext(CartContext)
	const { isLogged } = useContext(UserContext)
	const { showAlert } = useContext(GlobalModalsContext)

	const currentItem = items[currentId]
	const maxItems = items.length
	const navigation = useNavigation()

	const addQuantity = (): void => {
		if (quantity < currentItem.max_amount) {
			setQuantity(quantity + 1)
		} else {
			showAlert('Quantidade indisponível')
		}
	}

	const decQuantity = (): void => {
		setQuantity(quantity - 1)
	}

	const nextItem = (): void => {
		if (currentId + 1 !== maxItems) {
			setCurrentId(currentId + 1)
		} else {
			setCurrentId(0)
		}
		setQuantity(1)
	}

	const previousItem = (): void => {
		if (currentId === 0) {
			setCurrentId(maxItems - 1)
		} else {
			setCurrentId(currentId - 1)
		}
		setQuantity(1)
	}

	const handleAddToCart = () => {
		if (isLogged) {
			addToCart(currentItem, quantity)
			setQuantity(1)
		} else {
			showAlert(
				'Você precisa ter uma conta para adicionar produtos ao carrinho',
				'Atenção',
				() => { navigation.navigate('Account') }
			)
		}
	}

	return (
		<GestureRecognizer
			onSwipeRight={previousItem}
			onSwipeLeft={nextItem}
		>
			<Wrapper>

				<PreviousNextItem
					onPress={() => previousItem()}
				>
					<MaterialIcons name='arrow-back' size={20} />
				</PreviousNextItem>

				<NextItemIcon
					onPress={() => nextItem()}
				>
					<MaterialIcons name='arrow-forward' size={20} />
				</NextItemIcon>

				<LeftContainer>
					<InterText>
						{currentItem.name}
					</InterText>
					<Counter
						quantity={quantity}
						add={addQuantity}
						dec={decQuantity}
					/>
					<TotalPrice>
						{`R$ ${formatPrice(currentItem.price * quantity)}`}
					</TotalPrice>
				</LeftContainer>

				<RightContainer>
					<ProgressStatus>
						{`${(currentId + 1).toString().padStart(2, '0')}/${maxItems.toString().padStart(2, '0')}`}
					</ProgressStatus>
					<ProductImage
						resizeMode='contain'
						source={{ uri: currentItem.photo }}
					/>
					<BtnAdicionar
						onPress={() => handleAddToCart()}
					>
						<BtnText>Adicionar</BtnText>
					</BtnAdicionar>
				</RightContainer>

			</Wrapper>
		</GestureRecognizer>
	)
}

export default FeaturedItem
