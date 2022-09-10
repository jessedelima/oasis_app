import React, { useContext, useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
import Modal from 'react-native-modal'
import { GlobalModalsContext } from '../../contexts/globalModalsContext'
import { InsertCardModalProps } from '../../interfaces'
import { validateCreditCard } from '../../utils'
import Input from '../Input'
import InterText from '../InterText'
import LargeButton from '../LargeButton'
import { Wrapper, Row } from './styles'

const InsertCardModal = ({ card, onCloseRequest, onSubmit }: InsertCardModalProps) => {
	const [nickname, setNickName] = useState(card?.card_name ?? '')
	const [holderName, setHolderName] = useState(card?.holder_name ?? '')
	const [number, setNumber] = useState(card?.number.toString() ?? '')
	const [cvv, setCvv] = useState(card?.cvv ?? '')
	const [validate, setValidate] = useState('')
	const { showAlert } = useContext(GlobalModalsContext)

	const handleSubmit = () => {
		if (validateCreditCard(number, cvv.toString(), validate)) {
			if (nickname.length > 0 && holderName.length > 0) {
				const cardTemp = {
					nickname,
					id: card?.id ?? 4,
					cpf: '',
					holderName,
					number,
					cvv: Number(cvv),
					validate
				}
				onSubmit(cardTemp)
			} else {
				showAlert('Preencha todos os campos')
			}
		} else {
			showAlert('Preencha um cartão válido')
		}
	}

	useEffect(() => {
		if (card) {
			setValidate(`${card.expiration_month}/${card.expiration_year}`)
		}
	}, [card])

	return (
		<Modal
			isVisible={true}
			style={{ margin: 0 }}
			onBackButtonPress={onCloseRequest}
			backdropOpacity={0.9}
			onBackdropPress={onCloseRequest}
		>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={{ flex: 1 }}
			>
			<Wrapper>
				<ScrollView>

					<InterText style={{ marginBottom: 10, marginLeft: 5 }} >
						Insira as informações de pagamento
					</InterText>

					<Row>
						<View style={{ flex: 1 }}>
							<Input
								placeholder='Cartão 1'
								value={nickname}
								setValue={setNickName}
								label='Apelido do Cartão'
								labelBold={false}
							/>
						</View>
					</Row>

					<Row>
						<View style={{ flex: 1 }}>
							<Input
								placeholder='0000 0000 0000 0000'
								value={number}
								setValue={setNumber}
								label='Número do Cartão de Crédito'
								maskedType='credit-card'
								labelBold={false}
								keyboardType='numeric'
							/>
						</View>
					</Row>

					<Row>
						<View style={{ flex: 1 }}>
							<Input
								placeholder='FULANO H. SILVA'
								value={holderName}
								setValue={setHolderName}
								label='Nome impresso no Cartão de Crédito'
								autoCapitalize='characters'
								labelBold={false}
							/>
						</View>
					</Row>

					<Row>

						<View style={{ marginRight: 5, flex: 3 }}>
							<Input
								placeholder='12/12'
								value={validate}
								setValue={setValidate}
								label='Validade'
								maskedType='custom'
								labelBold={false}
								isValidate
								keyboardType='number-pad'
							/>
						</View>

						<View style={{ flex: 2 }}>
							<Input
								placeholder='000'
								isCvv
								value={cvv.toString()}
								setValue={setCvv}
								label='CVV'
								keyboardType="number-pad"
								labelBold={false}
								maxLength={3}
								withBorder={!!card && !card.cvv}
							/>
						</View>

					</Row>

				</ScrollView>
			</Wrapper>
			</KeyboardAvoidingView>
			<LargeButton labelText='Salvar' onPress={handleSubmit} />
		</Modal>
	)
}

export default InsertCardModal
