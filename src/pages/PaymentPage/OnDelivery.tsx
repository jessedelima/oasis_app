import React, { useContext, useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, View } from 'react-native'
import Input from '../../components/Input'
import PaymentButton from '../../components/PaymentButton'
import { GlobalModalsContext } from '../../contexts/globalModalsContext'
import { CartContext } from '../../contexts/cartContext'
import { PaymentContext } from '../../contexts/paymentContext'
import { Subtitle } from './styles'
import { formatPrice } from '../../utils'

const OnDelivery = () => {
	const { modals, setModalActive, setModalInactive } = useContext(GlobalModalsContext)
	const { formOfPayment, setFormOfPayment, moneyChange, setMoneyChange, deliveryType, shipping } = useContext(PaymentContext)
	const [needChange, setNeedChange] = useState <boolean>(false)
	const { totalPrice } = useContext(CartContext)
	const [money, setMoney] = useState<string>('0')

	const getTotalWithDelivery = (total: number) => (
		shipping !== null ? total + shipping : total
	)

	useEffect(() => {
		let total
		if (deliveryType === 1 && shipping !== null) {
			total = getTotalWithDelivery(totalPrice)
		} else {
			total = totalPrice
		}

		console.log('total: ', total)
		if (Number(money) > Number(total)) {
			setMoneyChange((Number(money) - Number(total)).toString())
		} else {
			setMoneyChange('0')
		}
	}, [money, totalPrice])

	const closeConfirmationModal = () => {
		setModalInactive({
			...modals,
			confirmation: {
				visible: false,
				payload: null
			}
		})
	}

	const acceptedConfirmationModal = () => {
		setNeedChange(true)
		closeConfirmationModal()
	}

	const openConfirmationModal = () => {
		setModalActive({
			...modals,
			confirmation: {
				visible: true,
				payload: {
					text: 'Você escolheu a forma de pagamento em dinheiro, irá precisar de troco ?',
					title: 'Atenção',
					accept: acceptedConfirmationModal,
					decline: closeConfirmationModal
				}
			}
		})
	}

	useEffect(() => {
		if (formOfPayment === 0) {
			openConfirmationModal()
		} else {
			setNeedChange(false)
		}
	}, [formOfPayment])

	return (
		<>
			<PaymentButton
				label='Dinheiro'
				leftIconName='cash'
				rightIconName='check-circle'
				isActive={formOfPayment === 0}
				onPress={() => setFormOfPayment(0)}
			/>

			<PaymentButton
				label='Cartão'
				leftIconName='credit-card'
				rightIconName='check-circle'
				isActive={formOfPayment === 1}
				onPress={() => setFormOfPayment(1)}
			/>

			{
				needChange && (
					<View style={{ marginBottom: 10 }}>
						<Subtitle>Informações de Pagamento</Subtitle>
						<Input
							placeholder='R$ 20,00'
							value={money}
							setValue={setMoney}
							label='Para qual valor você irá precisar do troco?'
							maskedType='money'
							keyboardType='decimal-pad'
							autoFocus
						/>

						<View style={{ flexDirection: 'row', marginTop: 15 }}>
							<View style={{ flex: 1, marginRight: 5 }}>
								<Input
									placeholder='R$ 20,00'
									value={deliveryType === 1 ? formatPrice(getTotalWithDelivery(totalPrice)) : formatPrice(totalPrice)}
									setValue={() => {}}
									label='Total Compra'
									maskedType='money'
									editable={false}
								/>
							</View>
							<View style={{ flex: 1, marginLeft: 5 }}>
								<Input
									placeholder='R$ 20,00'
									value={formatPrice(Number(moneyChange))}
									setValue={() => {}}
									label='Seu Troco'
									maskedType='money'
									editable={false}
								/>
							</View>
						</View>
					</View>
				)
			}

			{
				!needChange && formOfPayment === 0 && (
					<View style={{ width: '90%', marginBottom: 10 }}>
						<Subtitle>Informações de Pagamento</Subtitle>
						<Input
							placeholder='R$ 20,00'
							value={deliveryType === 1 ? formatPrice(getTotalWithDelivery(totalPrice)) : formatPrice(totalPrice)}
							setValue={() => {}}
							label='Valor Total'
							maskedType='money'
							editable={false}
						/>
					</View>
				)
			}
		</>

	)
}

export default OnDelivery
