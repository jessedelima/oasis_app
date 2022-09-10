import React, { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import Modal from 'react-native-modal'
import { AddressModalProps } from '../../interfaces'
import Input from '../Input'
import InterText from '../InterText'
import LargeButton from '../LargeButton'
import { Wrapper, Row } from './styles'

const EditAddressModal = ({ address, isVisible, onCloseRequest, onSubmitPress }: AddressModalProps) => {
	const [street, setStreet] = useState('')
	const [number, setNumber] = useState('')
	const [district, setDistrict] = useState('')
	const [complement, setComplement] = useState('')
	const [reference, setReference] = useState('')

	const resetState = () => {
		setStreet('')
		setNumber('')
		setDistrict('')
		setComplement('')
		setReference('')
	}

	const submit = () => {
		if (address) {
			onSubmitPress({
				...address,
				street,
				number,
				district,
				complement,
				reference
			})
		}
	}

	useEffect(() => {
		if (address) {
			setStreet(address.street)
			setNumber(address.number)
			setDistrict(address.district)
			setComplement(address.complement ?? '')
			setReference(address.reference ?? '')
		} else {
			resetState()
		}
	}, [address])

	return (
		<Modal
			isVisible={isVisible}
			style={{ margin: 0 }}
			onBackButtonPress={onCloseRequest}
			backdropOpacity={0.7}
			onBackdropPress={onCloseRequest}
		>
			<Wrapper>
				<ScrollView>
					<InterText style={{ marginBottom: 10, marginLeft: 5 }} >Editar Endereço</InterText>
					<Row>
						<View style={{ flex: 5, marginRight: 10 }}>
							<Input
								label='Rua'
								placeholder='Av. Brasil'
								value={street}
								setValue={setStreet}
							/>
						</View>
						<View style={{ flex: 2 }}>
							<Input
								label='Nº'
								placeholder='000'
								value={number}
								setValue={setNumber}
							/>
						</View>
					</Row>

					<Row>
						<View style={{ flex: 1 }}>
							<Input
								label='Bairro'
								placeholder='Centro'
								value={district}
								setValue={setDistrict}
							/>
						</View>
					</Row>

					<Row>
						<View style={{ flex: 1 }}>
							<Input
								label='Complemento'
								placeholder='Próximo ao Hospital'
								value={complement}
								setValue={setComplement}
							/>
						</View>
					</Row>

					<Row>
						<View style={{ flex: 1 }}>
							<Input
								label='Referência'
								placeholder='Casa Amarela'
								value={reference}
								setValue={setReference}
							/>
						</View>
					</Row>

				</ScrollView>
			</Wrapper>
			<LargeButton labelText='Salvar' onPress={submit} />
		</Modal>
	)
}

export default EditAddressModal
