import { AxiosInstance } from 'axios'
import { CardPayload, EditCardPayload } from '../interfaces'

export default (httpClient: AxiosInstance) => ({
	getCardsByUser: async () => {
		try {
			const response = await httpClient.get('/cards_by_users')
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
	addCard: async (payload: CardPayload) => {
		try {
			const response = await httpClient.post('/cards', payload)
			
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
	editCard: async (payload: EditCardPayload, cardId: number) => {
		try {
			const response = await httpClient.put(`/cards/${cardId}`, payload)
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
