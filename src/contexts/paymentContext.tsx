import React, { createContext, useContext, useEffect, useState } from 'react'
import { AdditionalInfos, Address, OrderPayload, PaymentContextData, PaymentContextProvider, SavedCard } from '../interfaces'
import services from '../services'
import { CartContext } from './cartContext'
import { GlobalModalsContext } from './globalModalsContext'
import { UserContext } from './userContext'

export const PaymentContext = createContext({} as PaymentContextData)

const PaymentProvider = ({ children }: PaymentContextProvider) => {
	/*
		DeliveryType: 0 => Buscar no local
		DeliveryType: 1 => Escolher End. de Entrega
		PaymentType: 1 => Online
		PaymentType: 0 => Na Entrega

		*** On Delivery
		FormOfPayment: 0 => Dinheiro
		FormOfPayment: 1 => Cartão
	*/
	const [isLoading, setIsLoading] = useState(false)
	const [address, setAddress] = useState<Address | null>(null)
	const [deliveryType, setDeliveryType] = useState<number | null>(null)
	const [paymentType, setPaymentType] = useState<number | null>(0)
	const [card, setCard] = useState<SavedCard | null>(null)
	const [formOfPayment, setFormOfPayment] = useState<number | null>(null)
	const [moneyChange, setMoneyChange] = useState<string>('0')
	const [cardNumber, setCardNumber] = useState('')
	const [additionalInfos, setAdditionalInfos] = useState<AdditionalInfos | null>(null)
	const [shipping, setShipping] = useState<number | null>(null)
	const { user } = useContext(UserContext)
	const { showAlert, openLoadingModal, closeLoadingModal } = useContext(GlobalModalsContext)
	const { resetCart } = useContext(CartContext)

	useEffect(() => {
		isLoading ? openLoadingModal() : closeLoadingModal()
	}, [isLoading])

	const verifyDeliveryType = () => {
		if (deliveryType !== null && address) {
			return true
		} else {
			showAlert('Selecione o tipo de entrega e um endereço para continuar', 'Atenção')
			return false
		}
	}

	const setShippingValue = (value: number | null) => {
		setShipping(value)
	}

	const verifyOnlineType = () => {
		if (!card) {
			showAlert('Escolha um cartão para prosseguir', 'Atenção')
			return false
		} else {
			return true
		}
	}

	const verifyOnDeliveryPayment = () => {
		if (formOfPayment !== null) {
			if (formOfPayment === 0) {
				// Verificar troco
				return true
			} else {
				return true
			}
		}
		showAlert('Escolha uma forma de pagamento', 'Atenção')
		return false
	}

	const verifyTypePaymentComplete = () => {
		if (paymentType !== null) {
			if (paymentType === 1) {
				return verifyOnlineType()
			} else {
				return verifyOnDeliveryPayment()
			}
		} else {
			showAlert('Escolha um tipo de pagamento', 'Atenção')
			return false
		}
	}

	const submitOrder = async (onSuccess: (protocol: string) => void) => {
		setIsLoading(true)
		if (user && additionalInfos && deliveryType !== null && paymentType !== null) {
			const order: OrderPayload = {
				adress_id: address?.id && deliveryType === 1 ? address.id : null,
				delivery_type: deliveryType,
				note: additionalInfos.comments ?? '',
				cpf: additionalInfos.cpf,
				cellphone: additionalInfos.phoneNumber,
				payment_type: paymentType,
				payments_methods_id: formOfPayment === 0 ? 1 : 2,
				change: parseFloat(moneyChange),
				birthday: additionalInfos.birthDate.replace(/\//g, '-'),
				saved_card: paymentType === 1 && card ? card : null
			}
			console.log(order)
			const response = await services.orders.submitOrder(order)
			if (!response.error) {
				setIsLoading(false)
				resetCart()
				onSuccess(response.data.protocolo)
			} else {
				setIsLoading(false)
				showAlert(response.error.message ?? 'Ocorreu um erro ao submeter seu pedido', 'Erro')
			}
		} else {
			setIsLoading(false)
			showAlert('Ocorreu um erro ao submeter seu pedido', 'Erro')
		}
	}

	return (
		<PaymentContext.Provider
			value={{
				address,
				setAddress,
				deliveryType,
				setDeliveryType,
				paymentType,
				setPaymentType,
				card,
				setCard,
				formOfPayment,
				setFormOfPayment,
				moneyChange,
				setMoneyChange,
				verifyTypePaymentComplete,
				verifyDeliveryType,
				additionalInfos,
				setAdditionalInfos,
				submitOrder,
				setShippingValue,
				shipping,
				setCardNumber,
				cardNumber
			}}
		>
			{children}
		</PaymentContext.Provider>
	)
}

export default PaymentProvider
