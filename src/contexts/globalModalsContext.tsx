import React, { createContext, useState } from 'react'
import { AlertModalProps, GlobalModalsContextData, GlobalModalsContextProvider, LoadingModalProps, ModalsType } from '../interfaces'

export const GlobalModalsContext = createContext({} as GlobalModalsContextData)

const GlobalModalsProvider = ({ children }: GlobalModalsContextProvider) => {
	const [loadingModal, setLoadingModal] = useState<LoadingModalProps>({
		visible: false,
		text: null
	})

	const [alertModal, setAlertModal] = useState<AlertModalProps>({
		visible: false,
		payload: null,
		onPress: null
	})

	const [modals, setModals] = useState <ModalsType>({
		loading: {
			visible: false,
			text: null
		},
		confirmation: {
			visible: false,
			payload: null
		},
		alert: {
			visible: false,
			payload: null,
			onPress: null
		}
	})

	const setModalActive = (newModal: ModalsType) => {
		setModals(newModal)
	}

	const setModalInactive = (newModal: ModalsType) => {
		setModals(newModal)
	}

	const openLoadingModal = (text?: string) => {
		setLoadingModal({ visible: true, text: text ?? null })
	}

	const closeLoadingModal = () => {
		setLoadingModal({ visible: false, text: null })
	}

	const closeAlert = () => {
		setAlertModal({ visible: false, payload: null, onPress: null })
	}

	const showAlert = (text: string, title?: string, onPress?: () => void) => {
		setAlertModal({
			visible: true,
			onPress: onPress ?? closeAlert,
			payload: {
				text,
				title: title ?? 'Atenção'
			}
		})
	}

	return (
		<GlobalModalsContext.Provider
			value={{
				modals,
				setModalActive,
				setModalInactive,
				showAlert,
				openLoadingModal,
				closeLoadingModal,
				loadingModal,
				closeAlert,
				alertModal
			}}
		>
			{children}
		</GlobalModalsContext.Provider>
	)
}

export default GlobalModalsProvider
