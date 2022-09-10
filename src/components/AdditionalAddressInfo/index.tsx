import React, { useContext, useState } from 'react'
import Modal from 'react-native-modal'
import { UserContext } from '../../contexts/userContext'
import { additionalAddressInfoProps } from '../../interfaces'
import { validateAdditionalAddressInfo } from '../../utils'
import Input from '../Input'
import LargeButton from '../LargeButton'
import { Container, InputContainer, Row, Header, HeaderText, BackButtonContainer } from './styles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { KeyboardAvoidingView, Platform } from 'react-native'

const AdditionalAddressInfo = ({ address, onError, onSuccess, onCloseRequest }: additionalAddressInfoProps) => {
	const [district, setDistrict] = useState(address.district)
	const [name, setName] = useState('')
	const [street, setStreet] = useState(address.street)
	const [number, setNumber] = useState(address.number)
	const [city, setCity] = useState(address.city)
	const [complement, setComplement] = useState('')
	const { user } = useContext(UserContext)

	const onConfirm = () => {
		const validate = validateAdditionalAddressInfo(street, city, number, district)
		if (validate.success && user) {
			onSuccess({
				...address,
				street,
				name: name.length > 0 ? name : street,
				city,
				number,
				complement,
				zip_code: '',
				district: district,
				reference: null,
				users_id: user.id
			})
		} else {
			onError(validate.message ?? 'Não foi possível validar seu endereço')
		}
	}

	return (
		<Modal
			isVisible
			style={{ margin: 0 }}
			animationIn='zoomIn'
			animationOut='zoomOut'
			onBackButtonPress={onCloseRequest}
			onBackdropPress={onCloseRequest}
		>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={{ flex: 1 }}
			>
			<Container>

				<Header>
					<BackButtonContainer onPress={onCloseRequest}>
						<MaterialIcons color="#FFF" name="arrow-back" size={20} />
					</BackButtonContainer>
					<HeaderText>Informações sobre o endereço</HeaderText>
				</Header>

				<Row>
					<InputContainer>
						<Input
							label="Nome do endereço"
							placeholder="Minha casa"
							value={name}
							setValue={setName}
						/>
					</InputContainer>
					<InputContainer>
						<Input
							label="Cidade"
							placeholder="Poços de Caldas"
							value={city}
							setValue={setCity}
						/>
					</InputContainer>
				</Row>

				<Row>
					<InputContainer>
						<Input
							label="Bairro"
							placeholder="Centro"
							value={district}
							setValue={setDistrict}
						/>
					</InputContainer>
				</Row>
				<Row>
					<InputContainer>
						<Input
							label="Rua"
							placeholder="Rua Brasil"
							value={street}
							setValue={setStreet}
						/>
					</InputContainer>
				</Row>

				<Row>
					<InputContainer>
						<Input
							label="Nº"
							placeholder="100"
							value={number}
							setValue={setNumber}
							keyboardType="number-pad"
							notSafe={true}
						/>
					</InputContainer>
					<InputContainer>
						<Input
							label="Complemento"
							placeholder="Portão branco"
							value={complement}
							setValue={setComplement}
						/>
					</InputContainer>
				</Row>
				<LargeButton labelText="Confirmar" onPress={onConfirm} />
			</Container>
			</KeyboardAvoidingView>
		</Modal>
	)
}

export default AdditionalAddressInfo
