import React, { useContext, useState } from 'react'
import BackHeader from '../../components/BackHeader'
import Input from '../../components/Input'
import InterText from '../../components/InterText'
import LargeButton from '../../components/LargeButton'
import MultilineInput from '../../components/MultilineInput'
import { GlobalModalsContext } from '../../contexts/globalModalsContext'
import { InformationsContext } from '../../contexts/informationsContext'
import { PaymentContext } from '../../contexts/paymentContext'
import { PagesProps } from '../../interfaces'
import { birthdayFormat, isOlder18, validateBirthday, validateCPF } from '../../utils'
import { Wrapper, Content, Row } from './styles'

const AdditionalPaymentInfo = ({ navigation }: PagesProps) => {
	const { showAlert } = useContext(GlobalModalsContext)
	const { setAdditionalInfos } = useContext(PaymentContext)
	const { userAddInformations } = useContext(InformationsContext)

	const [birthDate, setBirthDate] = useState(userAddInformations?.birthday ? birthdayFormat(userAddInformations.birthday) : '')
	const [cpf, setCpf] = useState(userAddInformations?.cpf ?? '')
	const [phoneNumber, setPhoneNumber] = useState(userAddInformations?.cellphone ?? '')
	const [comments, setComments] = useState('')

	const handleSubmit = () => {
		if (validateBirthday(birthDate)) {
			if (isOlder18(birthDate)) {
				if (validateCPF(cpf)) {
					if (phoneNumber.length >= 11) {
						setAdditionalInfos({
							birthDate,
							phoneNumber,
							comments,
							cpf
						})
						navigation.navigate('OrderConfirmation')
					} else {
						showAlert('Numero de telefone inválido', 'Atenção')
					}
				} else {
					showAlert('CPF inválido', 'Atenção')
				}
			} else {
				showAlert('Você precisa ser maior da idade para prosseguir a compra', 'Atenção')
			}
		} else {
			showAlert('Data de Nascimento inválida', 'Atenção')
		}
	}

	return (
		<Wrapper>
			<BackHeader label='Informações adicionais' onClose={() => navigation.goBack()} />
			<Content>

				<InterText style={{ marginBottom: 10 }}>
					Complete os campos abaixo:
				</InterText>

				<Row>
					<Input
						label='Data de Nascimento'
						placeholder='01/01/1980'
						value={birthDate}
						setValue={setBirthDate}
						maskedType='custom'
						isBirthday
						keyboardType='decimal-pad'
					/>
				</Row>

				<Row>
					<Input
						label='CPF'
						placeholder='000.000.000-00'
						value={cpf}
						setValue={setCpf}
						maskedType='cpf'
						keyboardType='numeric'
					/>
				</Row>

				<Row>
					<Input
						label='Telefone'
						placeholder='(00) 00000-0000'
						value={phoneNumber}
						setValue={setPhoneNumber}
						maskedType='cel-phone'
						keyboardType='numeric'
					/>
				</Row>

				<Row>
					<MultilineInput
						value={comments}
						setValue={setComments}
						placeholder='Insira suas observações aqui, ex: Traga a bebida sem gelo'
						label='Observações'
					/>
				</Row>
			</Content>
			<LargeButton labelText='Continuar' onPress={handleSubmit} />
		</Wrapper>
	)
}

export default AdditionalPaymentInfo
