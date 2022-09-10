import React, { createContext, useContext, useEffect, useState } from 'react'
import { Order, OrderDetails, OrderItemDetails, OrderRating, OrderRatingPayload, OrdersContextData, OrdersContextProviderProps } from '../interfaces'
import services from '../services'
import { showSuccessToast } from '../utils'
import { GlobalModalsContext } from './globalModalsContext'
import { UserContext } from './userContext'

export const OrdersContext = createContext({} as OrdersContextData)

const OrdersProvider = ({ children }: OrdersContextProviderProps) => {
	const { user } = useContext(UserContext)
	const { showAlert } = useContext(GlobalModalsContext)
	const [orders, setOrders] = useState<Order[]>([])
	const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
	const [isLoadingOrders, setIsLoadingOrders] = useState<boolean>(true)
	const [loadingItems, setLoadingItems] = useState(false)
	const [orderItems, setOrderItems] = useState<OrderItemDetails[]>([])

	const loadOrders = async () => {
		setIsLoadingOrders(true)
		if (user?.id) {
			const response = await services.orders.getOrdersByUser(user.id)
			if (!response.error) {
				setOrders(response.data)
			} else {
				showAlert(
					response.error.message ?? 'Aconteceu um erro ao buscar seus pedidos, tente novamente mais tarde',
					'Erro'
				)
			}
		}
		setIsLoadingOrders(false)
	}

	useEffect(() => {
		loadOrders()
	}, [])

	const changeOrderRate = (orderId: number, rate: number) => {
		setOrders(orders.map(order => {
			if (order.id === orderId && order.average === null) {
				order.average = rate
			}
			return order
		}))
	}

	const getOrderItems = async (orderId: number) => {
		setLoadingItems(true)
		const response = await services.orders.getOrderItems(orderId)
		if (!response.error) {
			setOrderItems(response.data)
		}
		setLoadingItems(false)
	}

	const getOrderDetails = async (orderId: number) => {
		const response = await services.orders.getOrderDetails(orderId)
		if (!response.error) {
			setOrderDetails(response.data)
			getOrderItems(orderId)
		} else {
			throw response.error.message
		}
	}

	const submitRating = async (rating: OrderRatingPayload, onSuccess: () => void) => {
		const response = await services.rating.setRating(rating)
		if (!response.error) {
			const ratingObj: OrderRating = response.data
			setOrders(orders.map((order) => {
				if (order.id === ratingObj.orders_id) {
					order.rating_app = ratingObj.rating_app
					order.rating_buy = ratingObj.rating_buy
					order.rating_delivery = ratingObj.rating_delivery
					order.average = ratingObj.average
					order.comment = ratingObj.comment
				}
				return order
			}))
			if (orderDetails) {
				setOrderDetails({ ...orderDetails, rating: ratingObj })
			}
			onSuccess()
		} else {
			showAlert(response.error.message ?? 'Ocorreu um erro ao salvar sua avaliação', 'Erro')
		}
	}

	const cancelOrder = async (orderId: number, payment_id: number | null) => {
		setLoadingItems(true)
		const response = await services.orders.cancelOrder(orderId, payment_id)
		if (!response.error) {
			showSuccessToast('Sucesso!', 'Pedido cancelado com sucesso');
		} else {
			showAlert(
				response.error.message ?? 'Não foi possível cancelar o pedido, tente novamente mais tarde',
				'Erro'
			)
		}
		setLoadingItems(false)
	}

	return (
		<OrdersContext.Provider value={{
			orders,
			changeOrderRate,
			getOrderDetails,
			orderDetails,
			isLoadingOrders,
			submitRating,
			orderItems,
			loadingItems,
			cancelOrder,
			loadOrders
		}}>
			{children}
		</OrdersContext.Provider>
	)
}

export default OrdersProvider
