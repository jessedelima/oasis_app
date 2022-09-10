import { AxiosInstance } from 'axios'
import { UserAddressPayload } from '../interfaces'

export default (httpClient: AxiosInstance) => ({
	getAddressInfo: async () => {
		try {
			const response = await httpClient.get('/adress_information')
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

	userAddress: async (userId: number) => {
		try {
			const response = await httpClient.get(`/user_adress/${userId}`)
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

	registerUserAddress: async (address: UserAddressPayload) => {
		try {
			const response = await httpClient.post('/adress', address)
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
	editUserAddress: async (address: UserAddressPayload, addressId: number) => {
		try {
			const response = await httpClient.put(`/adress/${addressId}`, address)
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
