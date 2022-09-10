import { AxiosInstance } from 'axios'
import { CartItemPayload } from '../interfaces'

export default (httpClient: AxiosInstance) => ({
	addItemToCart: async (payload: CartItemPayload) => {
		try {
			const response = await httpClient.post('/cart_items', payload)
			return {
				data: response.data,
				error: null
			}
		} catch (e) {
			return {
				data: null,
				error: {
					status: e.response.status,
					message: e.response.data.message
				}
			}
		}
	},
	recoveryCartItems: async (cartId: number) => {
		try {
			const response = await httpClient.get(`/cart/${cartId}`)
			if (response.data.cart_items) {
				return {
					data: response.data.cart_items,
					error: null
				}
			} else {
				throw new Error('Não foi possível recuperar seu carrinho')
			}
		} catch (e) {
			return {
				data: null,
				error: {
					status: e.response.status,
					message: e.response.data.message ?? 'Não foi possível recuperar seu carrinho'
				}
			}
		}
	},
	updateQuantity: async (quantity: number, id: number) => {
		try {
			const response = await httpClient.put(`cart_item/${id}`, {
				amount: quantity
			})
			return {
				data: response.data,
				error: null
			}
		} catch (e) {
			return {
				data: null,
				error: {
					status: e.response.status,
					message: e.response.data.message ?? 'Não foi possível recuperar seu carrinho'
				}
			}
		}
	},
	removeCartItem: async (cartItemId: number) => {
		try {
			const response = await httpClient.delete(`cart_item/${cartItemId}`)
			return {
				data: response.data,
				error: null
			}
		} catch (e) {
			return {
				data: null,
				error: {
					status: e.response.status,
					message: e.response.data.message ?? 'Não foi possível recuperar seu carrinho'
				}
			}
		}
	}
	// rebuy: async ()
})
