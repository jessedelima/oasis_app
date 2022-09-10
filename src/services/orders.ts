import { AxiosInstance } from 'axios'
import { OrderPayload } from '../interfaces'

export default (httpClient: AxiosInstance) => ({
	getOrdersByUser: async (userId: number) => {
		try {
			const response = await httpClient.get(`orders_user/${userId}`)
			return {
				data: response.data,
				error: null
			}
		} catch (e) {
			return {
				data: null,
				error: {
					status: e.response.status,
					message: e.response.message
				}
			}
		}
	},
	getOrderDetails: async (orderId: number) => {
		try {
			const responseDetails = await httpClient.get(`order_details/${orderId}`)
			return {
				data: responseDetails.data,
				error: null
			}
		} catch (e) {
			return {
				data: null,
				error: {
					status: e.response.status,
					message: e.response.message
				}
			}
		}
	},
	submitOrder: async (orderPayload: OrderPayload) => {
		try {
			const response = await httpClient.post('order_checkout', orderPayload)
			return {
				data: response.data,
				error: null
			}
		} catch (e) {
			console.log(e.response)
			return {
				data: null,
				error: {
					status: e.response.status,
					message: e.response.message
				}
			}
		}
	},
	getOrderItems: async (orderId: number) => {
		try {
			const response = await httpClient.get(`order_item/${orderId}`)
			return {
				data: response.data,
				error: null
			}
		} catch (e) {
			return {
				data: null,
				error: {
					status: e.response.status,
					message: e.response.message
				}
			}
		}
	},
	cancelOrder: async (orderId: number, payment_Id: number) => {
		try {
			const response = await httpClient.post(`order/cancel/${orderId}`, payment_Id)
			return {
				data: response.data,
				error: null
			}
		} catch (e) {
			return {
				data: null,
				error: {
					status: e.response.status,
					message: e.response.message
				}
			}
		}
	}
})
