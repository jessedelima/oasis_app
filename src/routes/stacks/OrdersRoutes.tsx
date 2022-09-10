import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Evaluate, OrderDetails, Orders } from '../../pages'
import OrdersProvider from '../../contexts/ordersContext'

const OrdersStackNavigation = () => {
	const Stack = createStackNavigator()

	return (
		<OrdersProvider>
			<Stack.Navigator
				screenOptions={{
					headerShown: false
				}}
			>
				<Stack.Screen
					name='LatestOrders'
					component={Orders}
				/>

				<Stack.Screen
					name='OrderDetails'
					component={OrderDetails}
				/>

				<Stack.Screen
					name='Evaluate'
					component={Evaluate}
				/>
			</Stack.Navigator>
		</OrdersProvider>
	)
}

export default OrdersStackNavigation
