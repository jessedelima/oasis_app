import { AxiosInstance } from 'axios'

export default (httpClient: AxiosInstance) => ({
	getAllProducts: async () => {
		try {
			const response = await httpClient.get('/product')
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
	getPromotions: async () => {
		try {
			const response = await httpClient.get('/index_sales')
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
	getHighlightsProducts: async () => {
		try {
			const response = await httpClient.get('/index_highlight_products')
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
	getFilterProducts: async (productName: string | null, categoriesId: number | null) => {
		try {
			const response = await httpClient.post('/find_product_by_name', {
				product_name: productName,
				categories_id: categoriesId
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
					message: e.response.data.message
				}
			}
		}
	},
	getBestSellers: async () => {
		try {
			const response = await httpClient.get('/best_seller')
			return {
				data: response.data,
				error: null
			}
		} catch (e) {
			return {
				data: null,
				error: {
					message: e.response.data.message,
					status: e.response.status
				}
			}
		}
	}
})
