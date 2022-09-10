import { AxiosInstance } from 'axios'

export default (httpClient: AxiosInstance) => ({
	getAllCategories: async () => {
		try {
			const response = await httpClient.get('/category')
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
	}
})
