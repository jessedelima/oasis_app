import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { DeliveryType, Payment, AdditionalPaymentInfos, OrderConfirmation } from '../../pages'
import PaymentProvider from '../../contexts/paymentContext'

const Stack = createStackNavigator()

const PaymentStackNavigation = () => {
	return (
		<PaymentProvider>
			<Stack.Navigator
				screenOptions={{
					headerShown: false
				}}
			>
				<Stack.Screen name='DeliveryType' component={DeliveryType} />
				<Stack.Screen name='Payment' component={Payment} />
				<Stack.Screen name='AdditionalInfos' component={AdditionalPaymentInfos} />
				<Stack.Screen name='OrderConfirmation' component={OrderConfirmation} />
			</Stack.Navigator>
		</PaymentProvider>
	)
}

export default PaymentStackNavigation
