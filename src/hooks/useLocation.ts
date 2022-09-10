import { useState } from 'react'
import geolocation , { GeolocationResponse } from '@react-native-community/geolocation'

export default (onLocationError: (message: string) => void) => {
	const [lat, setLat] = useState<number | null>(null)
	const [lng, setLng] = useState<number | null>(null)

	const getError = (code?: number) => {
		if (code === 2) {
			onLocationError(
				'Localização indisponível, confira se a sua localização está ligada e tente novamente'
			)
		} else if (code === 1) {
			onLocationError('Permissao negada')
		} else {
			onLocationError('Não foi possível obter sua localização')
		}
	}

	const onSuccess = (info: GeolocationResponse) => {
		const { latitude, longitude } = info.coords
		setLat(latitude)
		setLng(longitude)
	}

	const getLocation = async () => {
		try {
			geolocation.getCurrentPosition(
				(info) => onSuccess(info), 
				(e) => {getError(e.code); console.log(e)}, 
				{timeout:60000, enableHighAccuracy:true}
			)
		} catch {
			getError()
		}
	}

	const resetGeolocation = () => {
		setLat(null)
		setLng(null)
	}

	return {
		getLocation,
		latitude: lat,
		longitude: lng,
		resetGeolocation
	}
}
