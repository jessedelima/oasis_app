import React, { useContext } from 'react'
import { StatusBar, View } from 'react-native'
import { PaymentContext } from '../../contexts/paymentContext'
import { useNavigation } from '@react-navigation/native'
import { Container, LabelText, Box, DescriptionText, Row, OrderCodeText, Button, BtnText } from './styles'
import Modal from 'react-native-modal'
import MaterialCommunity from 'react-native-vector-icons/MaterialIcons'
import { ModalConfirmedProps } from '../../interfaces'

const ModalOrderConfirmed = ({ protocol, text }: ModalConfirmedProps) => {
	const { deliveryType, address } = useContext(PaymentContext)
	const isDelivery = deliveryType === 1
	const time = isDelivery ? null : 30
	const navigation = useNavigation()

	const parentNavigation = navigation.dangerouslyGetParent()

	const getDescription = () => {
		if (text) {
			return text
		}
		if (isDelivery) {
			return 'Seu pedido está sendo preparado e em breve será entregue.'
		}
		return `Seu pedido está sendo preparado e em até ${time} minutos estará disponivel para retirada na unidade Rua ${address?.street}, ${address?.district}, ${address?.number}.`
	}

	const goToHome = () => {
		if (parentNavigation) {
			parentNavigation?.reset({
				index: 0,
				routes: [{ name: 'BottomTab' }]
			})
		} else {
			navigation.navigate('Home')
		}
	}

	return (
		<Modal
			isVisible={true}
			style={{ margin: 0 }}
		>
			<StatusBar barStyle='dark-content' backgroundColor='#E5E5E5' />
			<Container>
				<LabelText>Pedido Finalizado com sucesso!</LabelText>
				<Box>
					<View style={{ flex: 4 }}>
						<DescriptionText>Agradecemos pela preferência.</DescriptionText>
						<Row>
							<DescriptionText>{getDescription()}</DescriptionText>
						</Row>
					</View>

					<View style={{ flex: 3 }}>
						<DescriptionText>Código do Pedido:</DescriptionText>
						<OrderCodeText>{protocol}</OrderCodeText>
					</View>

					<View style={{ flex: 2 }}>
						<Button
							onPress={goToHome}
						>
							<BtnText>Tudo bem, obrigado!</BtnText>
							<MaterialCommunity name='arrow-forward' color={'#FFF'} size={25} />
						</Button>
					</View>

				</Box>
			</Container>
		</Modal>
	)
}

export default ModalOrderConfirmed
