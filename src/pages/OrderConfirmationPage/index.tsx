import React, { useContext, useState } from 'react'
import { ScrollView, StatusBar } from 'react-native'
import { CartContext } from '../../contexts/cartContext'
import { PaymentContext } from '../../contexts/paymentContext'
import { UserContext } from '../../contexts/userContext'
import { PagesProps } from '../../interfaces'
import { formatPrice } from '../../utils'
import { theme } from '../../utils/theme'
import { Box, Container, Content, TitleText } from './styles'
import OrderBox from '../../components/OrderBox'
import ModalOrderConfirmed from '../../components/ModalOrderConfirmed'
import BackHeader from '../../components/BackHeader'
import InterText from '../../components/InterText'
import LargeButton from '../../components/LargeButton'
import { InformationsContext } from '../../contexts/informationsContext'

const OrderConfirmationPage = ({ navigation }: PagesProps) => {
	const [confirmed, setConfirmed] = useState(false)
	const [protocol, setProtocol] = useState('')
	const { user } = useContext(UserContext)
	const {
		paymentType,
		card,
		deliveryType,
		address,
		formOfPayment,
		moneyChange,
		submitOrder,
		shipping,
		cardNumber
	} = useContext(PaymentContext)
	const { cart, totalPrice } = useContext(CartContext)
	const { informations } = useContext(InformationsContext)

	const isOnline = paymentType === 1
	const isDelivery = deliveryType === 1

	const onSuccess = (protocol: string) => {
		setConfirmed(true)
		setProtocol(protocol)
		console.log('Protocolo', protocol)
	}

	const submit = () => {
		submitOrder(onSuccess)
	}

	const maskedCreditCard = () => {
		if (card) {
			const cardNumberString: String = cardNumber.toString();
			let splitted: String[] = [];
			let stringToAddInCard: String = '';
			for(let i = 0; i < 17; i++){
				stringToAddInCard += cardNumberString[i];
				if((i+1) % 4 == 0){
					splitted.push(stringToAddInCard);
					stringToAddInCard = '';
				}		
			}

			return `${splitted[0]} **** **** ${splitted[3]}`
		}
		return ''
	}

	const CheckPaymentType = () => {
		if (isOnline) {
			return <OrderBox title='Cartão Utilizado' value={maskedCreditCard()}/>
		} else {
			return formOfPayment === 0
				? <OrderBox title='Forma de Pagamento' value='Dinheiro'/>
				: <OrderBox title='Forma de Pagamento' value='Cartão'/>
		}
	}

	const CheckDeliveryType = () => (
		<OrderBox
			title={isDelivery ? 'Endereço de entrega' : 'Buscar em'}
			value={`${address?.street}, ${address?.district}, ${address?.number}`}
		/>
	)

	const getTotalOrder = (total: number) => {
		return formatPrice(shipping !== null ? total + shipping : total)
	}

	return (
		<Container>
			{
				confirmed &&
					<ModalOrderConfirmed
						protocol={protocol}
						text={isDelivery ? informations?.text_delivery : informations?.text_pickup }
					/>
			}
			<ScrollView>
				<StatusBar barStyle='light-content' backgroundColor={theme.colors.main} />
				<BackHeader label='Finalizar' onClose={() => navigation.goBack()} />
				<Content>

					<Box>
						<OrderBox title='Nome do Comprador' value={user?.name ?? ''} />
						<OrderBox title='Pagamento' value={isOnline ? 'Online' : 'Na Entrega'}/>
						<CheckPaymentType />
						<CheckDeliveryType />
						<TitleText style={{ marginVertical: 5 }}>
							Produtos:
						</TitleText>
						{
							cart.map(item => (
								<InterText key={item.id}>{item.quantity}x {item.name};</InterText>
							))
						}
					</Box>

					<Box>

						{
							!isDelivery
								? (
									<OrderBox
										title='Total'
										value={`R$ ${formatPrice(totalPrice)}`}
									/>
								)
								: (
									<>
										<OrderBox
											title='Subtotal'
											value={`R$ ${formatPrice(totalPrice)}`}
										/>
										<OrderBox
											title='Total + Frete'
											value={`R$ ${getTotalOrder(totalPrice)}`}
										/>
									</>
								)
						}

						{
							!isOnline && formOfPayment === 0 && (
								<OrderBox title='Valor do troco' value={`R$ ${formatPrice(Number(moneyChange))}`} />
							)
						}
					</Box>
				</Content>
			</ScrollView>
			<LargeButton labelText='Confirmar compra' onPress={submit} />
		</Container>
	)
}

export default OrderConfirmationPage
