import { AxiosInstance } from 'axios'

export default (httpClient: AxiosInstance) => ({
	login: async (email: string, password: string) => {
		const obj = { email, password }
		try {
			const response = await httpClient.post('/login', obj)
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
	register: async (email: string, name: string, password: string) => {
		const obj = { email, name, password }
		
		try {
			const response = await httpClient.post('/user', obj)
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
	recoveryPassword: async (email: string) => {
		const obj = { email };
		try {
			const response = await httpClient.put('/reset_password', obj)
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
	registerDevice: async (device: string) => {
		const obj = { device }
		try {
			const response = await httpClient.post('/users_device/createUpdate', obj)
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
})
