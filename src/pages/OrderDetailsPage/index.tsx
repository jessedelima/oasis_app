import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, SafeAreaView, ScrollView, Text, View, RefreshControl } from 'react-native'
import BackHeader from '../../components/BackHeader'
import InterText from '../../components/InterText'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { dateFormat, formatPrice, getLabelRate } from '../../utils'
import { StatusContainer, StatusBox, StatusLabel, BtnRateOrder, BtnRateOrderText, Box, LoadingBox, LoadingTextContainer } from './styles'
import LargeButton from '../../components/LargeButton'
import { OrdersContext } from '../../contexts/ordersContext'
import { OrderDetailsPageProps } from '../../interfaces'
import { CartContext } from '../../contexts/cartContext'
import OrderBox from '../../components/OrderBox'
import OrderProductItem from './OrderProductItem'
import { GlobalModalsContext } from '../../contexts/globalModalsContext'
import { theme } from '../../utils/theme'
import Button from '../../components/Button'

const wait = (timeout: Number) => {
	return new Promise(resolve => setTimeout(resolve, timeout));
}

const OrderDetailsPage = ({ navigation, route }: OrderDetailsPageProps) => {
	const { orderId } = route.params
	const { getOrderDetails, orderDetails, orderItems, loadingItems, cancelOrder } = useContext(OrdersContext)
	const { showAlert, openLoadingModal, closeLoadingModal } = useContext(GlobalModalsContext)
	const { rebuy } = useContext(CartContext)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [loaderMessage, setLoaderMessage] = useState<string>('Carregando os detalhes do seu pedido')
	const [rebuyLoading, setRebuyLoading] = useState<boolean>(false)
	const [refreshing, setRefreshing] = useState(false);
	const goBack = () => navigation.goBack()

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		wait(1000).then(() => {
			loadOrderDetails(orderId)
			setRefreshing(false)
		});
	}, []);

	useEffect(() => {
		rebuyLoading
			? openLoadingModal('Estamos adicionando os items ao carrinho')
			: closeLoadingModal()
	}, [rebuyLoading])

	const loadOrderDetails = async (id: number) => {
		setIsLoading(true)
		try {
			await getOrderDetails(id)
		} catch (e) {
			showAlert('Não foi possível buscar os detalhes do pedido', 'Erro')
			goBack()
		}
		setIsLoading(false)
	}

	useEffect(() => {
		loadOrderDetails(orderId)
	}, [orderId])

	const handleRepeatOrder = async () => {
		if (orderItems) {
			setRebuyLoading(true)
			await rebuy(orderItems)
			setRebuyLoading(false)
			navigation.navigate('Cart')
		}
	}

	const EvaluateContainer = () => {
		if (orderDetails?.rating && orderDetails.rating.average !== null) {
			return (
				<View>
					<InterText>Avaliação do Pedido:</InterText>
					<BtnRateOrder
						isEvaluated
						onPress={() => navigation.navigate('Evaluate', {
							isRated: true,
							orderId: orderDetails.order.id,
							rating: orderDetails.rating
						})}
					>
						<BtnRateOrderText style={{ fontSize: 20 }}>
							{`${orderDetails.rating.average} - ${getLabelRate(orderDetails.rating.average)}`}
						</BtnRateOrderText>
						<MaterialIcons name='star' color='#FFF' size={30} />
					</BtnRateOrder>
				</View>
			)
		} else {
			return (
				<View>
					<InterText>Avaliação do Pedido:</InterText>
					<BtnRateOrder
						onPress={() => navigation.navigate('Evaluate', {
							isRated: false,
							orderId: orderDetails?.order.id,
							rating: null
						})}
					>
						<BtnRateOrderText>Avaliar Pedido</BtnRateOrderText>
						<MaterialIcons name='chevron-right' color='#FFF' size={25} />
					</BtnRateOrder>
				</View>
			)
		}
	}

	const cancelOrderHandler = async (id: number, payment_id: number | null) => {
		setLoaderMessage('Cancelando o pedido')
		setIsLoading(true)
		try {
			await cancelOrder(id, payment_id);
			goBack()
			goBack()
		} catch (e) {
			showAlert('Não foi possível cancelar o pedido', 'Erro')
			goBack()
		}
		setIsLoading(false)
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			{
				isLoading
					? (
						<LoadingBox>
							<ActivityIndicator size="large" color={theme.colors.main} />
							<LoadingTextContainer>
								<InterText>{loaderMessage}</InterText>
							</LoadingTextContainer>
						</LoadingBox>
					)
					: (
						<>
							{orderDetails
								? (
									<>
										<BackHeader
											label='Compra Referente ao dia'
											boldLabel={dateFormat(orderDetails.order.created_at)}
											onClose={goBack}
										/>
										<ScrollView 
											style={{ paddingHorizontal: 15 }}
											refreshControl={
												<RefreshControl
													refreshing={refreshing}
													onRefresh={onRefresh}
												/>
											}
										>

											<StatusContainer>
												<InterText>Status do pedido:</InterText>
												<StatusBox color={orderDetails.orders_status.color}>
													<StatusLabel>{orderDetails.orders_status.name}</StatusLabel>
												</StatusBox>
											</StatusContainer>

											<Box>
												<OrderBox title='Nome do comprador' value={orderDetails.user.name} />
												<OrderBox
													title='Pagamento'
													value={orderDetails.order.payment_type === 0 ? 'Entrega' : 'Online' }
												/>
												{
													orderDetails.order.payment_type === 1 && orderDetails && orderDetails.card && (
														<OrderBox
															title='Compra realizada no cartão'
															value={orderDetails.card.number}
														/>
													)
												}
												{
													orderDetails.order.payment_type === 0 && orderDetails.payment_method && (
														<OrderBox
															title='Forma de pagamento'
															value={orderDetails.payment_method.name}
														/>
													)
												}
												{
													<OrderBox
														title={orderDetails.order.delivery_type === 0 ? 'Endereço de Retirada' : 'Endereço de Entrega'}
														value={orderDetails.order.adress_history}
													/>
												}
												<OrderBox
													title='Valor da Compra'
													value={`R$ ${formatPrice(orderDetails.order.total)}`}
												/>
											</Box>

											{orderDetails.order.orders_status_id <= 3 &&
												<Button
													label="Cancelar pedido"
													onPress={() => cancelOrderHandler(orderDetails.order.id, orderDetails.order.payment_id)}
												/>
											}

											{ orderDetails.orders_status.id === 5 && (
												<EvaluateContainer />
											)}

											<View style={{ marginVertical: 10 }}>
												<InterText>Lista de Produtos</InterText>
											</View>

											{
												loadingItems
													? (
														<ActivityIndicator size='large' color={theme.colors.main} />
													)
													: (
														<FlatList
															data={orderItems}
															keyExtractor={(item, index) => `${item.id}-${index}`}
															renderItem={({ item }) => <OrderProductItem item={item} />}
														/>
													)
											}

										</ScrollView>
										<LargeButton labelText='Pedir Novamente' onPress={handleRepeatOrder} />
									</>
								)
								: (
									<>
									</>
								)}
						</>
					)
			}
		</SafeAreaView>
	)
}

export default OrderDetailsPage
