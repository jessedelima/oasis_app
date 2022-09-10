import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { CartContextData, CartContextProviderProps, CartItem, CartItemReturn, OrderItemDetails, Products } from '../interfaces'
import services from '../services'
import { showErrorToast, showSuccessToast } from '../utils'
import { GlobalModalsContext } from './globalModalsContext'
import { UserContext } from './userContext'

export const CartContext = createContext({} as CartContextData)

const CartProvider = ({ children }: CartContextProviderProps) => {
	const [cart, setCart] = useState<CartItem[]>([])
	const [totalPrice, setTotalPrice] = useState<number>(0)
	const { isLogged, user } = useContext(UserContext)
	const { showAlert, openLoadingModal, closeLoadingModal } = useContext(GlobalModalsContext)

	const resetCart = async () => {
		setCart([])
		await AsyncStorage.removeItem('@Oasis:Cart')
	}

	// const addToStorage = async (data: CartItem[]) => {
	// 	await AsyncStorage.setItem('@Oasis:Cart', JSON.stringify(data))
	// }

	const loadCartItems = async (cartId: number) => {
		const response = await services.cart.recoveryCartItems(cartId)
		if (response.data) {
			const cartItemResponse: CartItemReturn[] = response.data
			const newCart: CartItem[] = (cartItemResponse.map((cartItem) => ({
				cart_items_id: cartItem.id,
				id: cartItem.products_id,
				price: parseFloat(cartItem.price),
				quantity: parseFloat(cartItem.amount),
				name: cartItem.name,
				description: cartItem.description,
				max_amount: cartItem.max_amount,
				photo: cartItem.photo,
				categories: cartItem.categories
			})))
			setCart(newCart)
		} else {
			console.log('Não foi possível recuperar seu carrinho ', response.error)
		}
	}

	const updateItemInCart = async (cartItemID: number, quantity: number, onSuccess: () => void) => {
		if (user?.carts_id) {
			openLoadingModal();
			const response = await services.cart.updateQuantity(quantity, cartItemID)
			if (!response.error) {
				await loadCartItems(user.carts_id)
				closeLoadingModal();
				onSuccess();
			} else {
				closeLoadingModal();
				showAlert(
					response.error.message ?? 'Ocorreu um erro ao adicionar o produto ao carrinho',
					'Atenção'
				)
			}
		} else {
			showAlert('Não foi possível adicionar o produto ao carrinho', 'Atenção')
		}
	}

	useEffect(() => {
		if (isLogged && user) {
			loadCartItems(user.carts_id)
		}
	}, [isLogged])

	useEffect(() => {
		setTotalPrice(cart.reduce((total: number, obj: CartItem) => (
			total + obj.price * obj.quantity
		), 0))
	}, [cart])

	const handleRebuyWithExistingItems = async (items: OrderItemDetails[]) => {
		if (items.length > 0) {
			await items.forEach(async (item) => {
				if (item.cart_items_id) {
					await services.cart.updateQuantity(item.amount, item.cart_items_id)
				}
			})
		}
	}

	const handleRebuyWithNewItems = async (items: OrderItemDetails[]) => {
		const data ={
			carts_id: user?.carts_id,
			cart_items: []
		}
		items.forEach( item => {
			data.cart_items.push({amount: Number(item.amount), products_id: item.products_id})
		})
		await services.cart.addItemToCart(data)
		// if (items.length && user?.carts_id) {
		// 	await items.forEach(async (item) => {
		// 		await services.cart.addItemToCart({
		// 			amount: Number(item.amount),
		// 			carts_id: user.carts_id,
		// 			products_id: item.products_id
		// 		})
		// 	})
		// }
		
	}

	const rebuy = useCallback(async (items: OrderItemDetails[]) => {
		if (cart.length > 0) {
			const existingItems: OrderItemDetails[] = []
			const newItems: OrderItemDetails[] = []
			items.forEach(item => {
				const cartItem = cart.find(cartItem => cartItem.id === item.products_id)
				if (cartItem) {
					existingItems.push({
						...item,
						cart_items_id: cartItem.cart_items_id,
						amount: cartItem.quantity + Number(item.amount)
					})
				} else {
					newItems.push(item)
				}
			})
			await handleRebuyWithExistingItems(existingItems)
			await handleRebuyWithNewItems(newItems)
		} else {
			await handleRebuyWithNewItems(items)
		}
		user && await loadCartItems(user.carts_id)
	}, [cart])

	const updateQuantity = async (cartItemID: number, quantity: number, reloadCart?: boolean) => {
		return await services.cart.updateQuantity(quantity, cartItemID)
	}

	const addToCart = useCallback(
		async (item: Products | CartItem, quantity: number, disableToast: boolean = false) => {
			openLoadingModal();
			if (user) {
				const cartItemTemp = cart.find(cartItem => cartItem.id === item.id)
				if (!cartItemTemp) {
					const response = await services.cart.addItemToCart({
						carts_id: user.carts_id,
						cart_items: [
							{amount: quantity, products_id: item.id}
						]
					})
					closeLoadingModal();
					if (!response.error) {
						console.log(response.data[0].id)
						setCart([
							...cart,
							{
								cart_items_id: response.data[0].id,
								description: item.description,
								id: item.id,
								max_amount: item.max_amount,
								name: item.name,
								photo: item.photo,
								price: item.price,
								quantity: quantity,
								categories: item.categories,
							}
						])
						if (!disableToast) {
							showSuccessToast('Sucesso!', 'Produto adicionado ao carrinho')
						}
					} else {
						showErrorToast('Atenção', response.error.message ?? 'Ocorreu um erro ao adicionar ao carrinho')
					}
				} else {
					const newQuantity = cartItemTemp.quantity ? cartItemTemp.quantity + quantity : quantity
					const response = await updateQuantity(cartItemTemp.cart_items_id, newQuantity)
					closeLoadingModal();
					if (!response.error) {
						const newCart = (cart.map((cartItem) => {
							if (cartItem.id === response.data.products_id) {
								return { ...cartItem, quantity: newQuantity }
							} else {
								return cartItem
							}
						}))
						setCart(newCart)
						if (!disableToast) {
							showSuccessToast('Sucesso!', 'Produto adicionado ao carrinho')
						}
					} else {
						showErrorToast('Atenção', response.error.message ?? 'Ocorreu um erro ao adicionar ao carrinho')
					}
				}
			}
			
		}, [cart])

	const decCart = useCallback(async (cartItemId: number) => {
		openLoadingModal();
		const quantity = cart.find(cartItem => cartItem.cart_items_id === cartItemId)?.quantity
		if (quantity) {
			const response = await updateQuantity(cartItemId, quantity - 1)
			closeLoadingModal();
			if (!response.error) {
				setCart(cart.map(cartItem => {
					if (cartItem.cart_items_id === cartItemId) {
						return { ...cartItem, quantity: quantity - 1 }
					} else {
						return cartItem
					}
				}))
			} else {
				showErrorToast('Atenção', response.error.message ?? 'Ocorreu um erro ao remover o item')
			}
		} else {
			closeLoadingModal();
			showErrorToast('Atenção', 'Ocorreu um erro ao remover o item')
		}
	}, [cart])

	const removeCartItem = async (cartItemId: number) => {
		openLoadingModal();
		const response = await services.cart.removeCartItem(cartItemId)
		if (!response.error) {
			setCart(cart.filter(cartItem => cartItem.cart_items_id !== cartItemId))
		} else {
			showErrorToast('Atenção', 'Não foi possível remover o item do carrinho')
		}
		closeLoadingModal();
	}

	return (
		<CartContext.Provider value={{
			cart,
			addToCart,
			decCart,
			removeCartItem,
			resetCart,
			totalPrice,
			rebuy,
			updateItemInCart,
			loadCartItems
		}}>
			{children}
		</CartContext.Provider>
	)
}

export default CartProvider
