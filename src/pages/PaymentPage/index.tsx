import React, { useContext, useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView } from 'react-native'
import BackHeader from '../../components/BackHeader'
import LargeButton from '../../components/LargeButton'
import PaymentButton from '../../components/PaymentButton'
import { PaymentContext } from '../../contexts/paymentContext'
import { PagesProps, UserCard } from '../../interfaces'
import OnlineType from './Online'
import OnDelivery from './OnDelivery'
import { Header, Subtitle, Content } from './styles'
import { GlobalModalsContext } from '../../contexts/globalModalsContext'
import services from '../../services'

const Payment = ({ navigation }: PagesProps) => {
	const { paymentType, setPaymentType, verifyTypePaymentComplete } = useContext(PaymentContext)
	const [registeredCards, setRegisteredCards] = useState<UserCard[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const { closeLoadingModal, openLoadingModal } = useContext(GlobalModalsContext)

	const handleContinue = () => {
		if (verifyTypePaymentComplete()) {
			navigation.navigate('AdditionalInfos')
		}
	}

	const loadCards = async () => {
		setIsLoading(true)
		const response = await services.card.getCardsByUser()
		response.data && setRegisteredCards(response.data)
		console.log(response.data)
		setIsLoading(false)
	}

	useEffect(() => {
		loadCards()
	}, [])

	useEffect(() => {
		isLoading ? openLoadingModal() : closeLoadingModal()
	}, [isLoading])

	const onSubmitNewCard = (card: UserCard) => {
		setRegisteredCards([...registeredCards, card])
	}

	const onEditCard = (card: UserCard) => {
		setRegisteredCards(registeredCards.map((cardTemp) => {
			if (cardTemp.id === card.id) {
				return card
			} else {
				return cardTemp
			}
		}))
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={{ flex: 1 }}
				keyboardVerticalOffset={50}
			>
			<ScrollView>
				<BackHeader label='Tipo de Pagamento' onClose={() => navigation.goBack()} />
				<Header>
					<Subtitle>
						Informe como será o pagamento
					</Subtitle>

					<PaymentButton
						label='Na Entrega'
						onPress={() => setPaymentType(0)}
						rightIconName='check-circle'
						isActive={paymentType === 0}
						leftIconName='signal-variant'
					/>

					<PaymentButton
						label='Online'
						onPress={() => setPaymentType(1)}
						rightIconName='check-circle'
						isActive={paymentType === 1}
						leftIconName='home'
					/>

				</Header>

				{ paymentType !== null && (
					
					<Content>
						<Subtitle>{paymentType === 1 ? 'Selecione o cartão' : 'Escolha a forma de Pagamento'}</Subtitle>
						{paymentType === 1
							? <OnlineType onEdit={onEditCard} cards={registeredCards} onAdd={onSubmitNewCard} setIsLoading={setIsLoading} />
							: <OnDelivery />}
					</Content>
					
				) }

			</ScrollView>
			</KeyboardAvoidingView>
			<LargeButton labelText='Continuar' onPress={handleContinue} />
		</SafeAreaView>
	)
}

export default Payment
