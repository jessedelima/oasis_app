import { AxiosInstance } from 'axios'

export default (httpClient: AxiosInstance) => ({
	getInformations: async () => {
		try {
			const response = await httpClient.get('/information/1')
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
	additionalInfo: async (userId: number) => {
		try {
			const response = await httpClient.get(`/additional_information/${userId}`)
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
