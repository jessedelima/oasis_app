import React, { useContext, useEffect, useState } from 'react'
import InsertCardModal from '../../components/InsertCardModal'
import PaymentButton from '../../components/PaymentButton'
import { GlobalModalsContext } from '../../contexts/globalModalsContext'
import { PaymentContext } from '../../contexts/paymentContext'
import { UserContext } from '../../contexts/userContext'
import { Card, OnlineTypeProps, UserCard } from '../../interfaces'
import services from '../../services'
import { maskedCreditCardNumber } from '../../utils'

const OnlineType = ({ setIsLoading, onAdd, cards, onEdit }: OnlineTypeProps) => {
	const { setCard, setCardNumber } = useContext(PaymentContext)
	const { user } = useContext(UserContext)
	const { showAlert } = useContext(GlobalModalsContext)
	const [cardSelected, setCardSelected] = useState<number | null>(null)
	const [editableCard, setEditableCard] = useState<UserCard | null>(null)
	const [modalVisible, setModalVisible] = useState(false)

	useEffect(() => {
		const cardTemp = cards.find(card => cardSelected === card.id)
		if (cardTemp && cardTemp.cvv && cardSelected) {
			setCard({ cvv: cardTemp.cvv, id: cardSelected })
			setCardNumber(cardTemp.number.toString())
		} else {
			setCard(null)
			setCardNumber('')
		}
	}, [cardSelected])

	const closeModal = () => {
		setModalVisible(false)
		setEditableCard(null)
	}

	const openEditCard = (card: UserCard) => {
		setEditableCard(card)
		setModalVisible(true)
	}

	const addNewCard = async (cardTemp: Card, userId: number) => {
		const response = await services.card.addCard({
			card_name: cardTemp.nickname,
			expiration_month: cardTemp.validate.split('/')[0],
			expiration_year: cardTemp.validate.split('/')[1],
			holder_name: cardTemp.holderName,
			number: cardTemp.number,
			users_id: userId
		})
		if (response.data) {
			onAdd({ ...response.data, cvv: cardTemp.cvv })
			setCardSelected(response.data.id)
			closeModal()
		} else {
			showAlert(response.error?.message ?? 'Ocorreu um erro ao registrar seu cartão')
		}
	}

	const editCard = async (cardTemp: Card) => {
		const response = await services.card.editCard({
			card_name: cardTemp.nickname,
			expiration_month: cardTemp.validate.split('/')[0],
			expiration_year: cardTemp.validate.split('/')[1],
			holder_name: cardTemp.holderName,
			number: cardTemp.number
		}, cardTemp.id)
		if (response.data) {
			onEdit({ ...response.data, cvv: cardTemp.cvv })
			setCardSelected(response.data.id)
			closeModal()
		} else {
			showAlert(response.error?.message ?? 'Ocorreu um erro ao editar seu cartão')
		}
	}

	const submit = async (newCard: Card) => {
		if (user) {
			setIsLoading(true)
			if (!editableCard) {
				await addNewCard(newCard, user.id)
			} else {
				await editCard(newCard)
			}
			setIsLoading(false)
		}
	}

	const onCardPress = (card: UserCard) => {
		if (card.cvv) {
			setCardSelected(card.id)
		} else {
			openEditCard(card)
		}
	}

	return (
		<>
			{modalVisible && (
				<InsertCardModal
					onCloseRequest={closeModal}
					card={editableCard}
					onSubmit={submit}
				/>
			)}
			{cards.map(card => (
				<PaymentButton
					key={card.id.toString()}
					label={card.card_name}
					secondaryLabel={maskedCreditCardNumber(card.number)}
					onPress={() => onCardPress(card)}
					rightIconName='pencil-plus-outline'
					rightIconBtn={() => openEditCard(card)}
					isActive={cardSelected === card.id}
				/>
			))}
			<PaymentButton
				label='Adicionar novo cartão'
				rightIconName='credit-card-plus-outline'
				isActive={false}
				onPress={() => setModalVisible(true)}
			/>
		</>
	)
}

export default OnlineType
