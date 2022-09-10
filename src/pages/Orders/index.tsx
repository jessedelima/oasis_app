import React, { useCallback, useContext, useEffect, useState } from 'react'
import BackHeader from '../../components/BackHeader'
import PageTitle from '../../components/PageTitle'
import { UserContext } from '../../contexts/userContext'
import { PagesProps } from '../../interfaces'
import { Container } from './styles'
import { FlatList, RefreshControl, ScrollView } from 'react-native'
import OrderItem from './OrderItem'
import EmptyOrdersList from './EmptyOrdersList'
import { OrdersContext } from '../../contexts/ordersContext'
import { GlobalModalsContext } from '../../contexts/globalModalsContext'

const wait = (timeout: Number) => {
	return new Promise(resolve => setTimeout(resolve, timeout));
}

const OrdersPage = ({ navigation }: PagesProps) => {
	const { shortName, getOrderNotification, changeOrderNotification } = useContext(UserContext)
	const { orders, isLoadingOrders, loadOrders } = useContext(OrdersContext)
	const { openLoadingModal, closeLoadingModal } = useContext(GlobalModalsContext)
	const [refreshing, setRefreshing] = useState(false);
	const goToHome = () => navigation.navigate('Home')


	const onRefresh = useCallback(() => {
		setRefreshing(true);
		wait(1000).then(() => {
			loadOrders();
			setRefreshing(false)
		});
	}, []);

	useEffect(() => {
		isLoadingOrders ? openLoadingModal() : closeLoadingModal()
	}, [isLoadingOrders])

	useEffect(() => {
		const orderNotificationId = getOrderNotification();
		if(orderNotificationId != 0){
			changeOrderNotification(0);
			navigation.navigate('OrderDetails', {
				orderId: orderNotificationId
			})
		}
	}, [])

	return (
		<Container>
			<BackHeader
				label='Últimos pedidos de'
				boldLabel={shortName}
				onClose={() => navigation.goBack()}
			/>
			{
				orders.length > 0
					? (
						<>
							<PageTitle title='Meus Pedidos' />
							<ScrollView
								refreshControl={
								<RefreshControl
									refreshing={refreshing}
									onRefresh={onRefresh}
								/>
								}
							>
								<FlatList
									style={{ marginTop: 10 }}
									data={orders}
									renderItem={({ item }) => <OrderItem orderItem={item} />}
									keyExtractor={(item, index) => `${item.id}-${index}`}
								/>
							</ScrollView>
						</>
					)
					: (
						<EmptyOrdersList onPress={goToHome} isLoading={isLoadingOrders} />
					)
			}
		</Container>
	)
}

export default OrdersPage
