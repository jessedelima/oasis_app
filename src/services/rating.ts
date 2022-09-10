import { AxiosInstance } from 'axios'
import { OrderRatingPayload } from '../interfaces'

export default (httpClient: AxiosInstance) => ({
	setRating: async (rating: OrderRatingPayload) => {
		console.log(rating)
		try {
			const response = await httpClient.post('/rating', rating)
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
