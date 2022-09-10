import axios, { AxiosInstance } from 'axios'

const googleAutoComplete = <AxiosInstance> axios.create({
	baseURL: 'https://maps.googleapis.com/maps/api/place/autocomplete'
})

const googleGeocode = <AxiosInstance> axios.create({
	baseURL: 'https://maps.googleapis.com/maps/api/geocode'
})

const apiKeyGoogle = 'AIzaSyCjKKumQf9whIWzjoSfp49g6fm3YAtF-0I'

export const getLocationByCoords = async (lat: number, lng: number) => {
	try {
		const response = await googleGeocode.post(
			`json?address=${lat}+${lng}&key=${apiKeyGoogle}`
		)
		if (response.data) {
			if (response.data.error_message) {
				throw new Error(response.data.error_message)
			} else {
				return {
					data: response.data.results[0],
					error: null
				}
			}
		}
		throw new Error('Não foi possível buscar sua localização')
	} catch (e) {
		return {
			data: null,
			error: {
				status: e.response?.status ?? '',
				message: e.response?.data?.message ?? e.message
			}
		}
	}
}

export const autoCompleteSearch = async (address: string) => {
	try {
		const response = await googleAutoComplete.post(
			`json?input=${address}&components=country:br&language=pt&key=${apiKeyGoogle}`
		)
		if (response.data) {
			if (response.data.error_message) {
				throw new Error(response.data.error_message)
			} else {
				return {
					data: response.data.predictions.map((predicition: unknown) => predicition.description),
					error: null
				}
			}
		}
	} catch (e) {
		return {
			data: null,
			error: {
				status: e.response?.status ?? '',
				message: e.response?.data?.message ?? e.message
			}
		}
	}
}

export const getGeocode = async (targetAddress: string) => {
	const formatedAddress = targetAddress.replace(/\s/g, '+')
	console.log('https://maps.googleapis.com/maps/api/geocode/' + `json?address=${formatedAddress}&key=${apiKeyGoogle}`)
	try {
		const response = await googleGeocode.post(
			`json?address=${formatedAddress}&key=${apiKeyGoogle}`
		)
		if (response.data) {
			if (response.data.error_message) {
				throw new Error(response.data.error_message)
			} else {
				return {
					data: response.data.results[0],
					error: null
				}
			}
		}
	} catch (e) {
		return {
			data: null,
			error: {
				status: e.response?.status ?? '',
				message: e.response?.data?.message ?? e.message
			}
		}
	}
}
