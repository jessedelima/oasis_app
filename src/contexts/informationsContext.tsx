import React, { createContext, useState } from 'react'
import { Informations, InformationsContextData, InformationsContextProviderProps, UserAdditionalInfos } from '../interfaces'
import services from '../services'

export const InformationsContext = createContext({} as InformationsContextData)

const InformationsProvider = ({ children }: InformationsContextProviderProps) => {
	const [informations, setInformations] = useState<Informations | null>(null)
	const [userAddInformations, setUserAddInformations] = useState<UserAdditionalInfos | null>(null)

	const loadInformations = async () => {
		const response = await services.information.getInformations()
		console.log(response)
		setInformations(response.data)
	}

	const loadAdditionalInformations = async (userId: number) => {
		const response = await services.information.additionalInfo(userId)
		console.log(response.data)
		if (response.data) {
			setUserAddInformations(response.data)
		}
	}

	return (
		<InformationsContext.Provider value={{
			informations,
			loadInformations,
			userAddInformations,
			loadAdditionalInformations
		}}>
			{children}
		</InformationsContext.Provider>
	)
}

export default InformationsProvider
