import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import BottomTab from './BottomTab'
import PaymentStackNavigation from './stacks/PaymentRoutes'
import { Help, Login, ProductDetails, Register, TermsOfService, RecoveryPassword } from '../pages'
import { UserContext } from '../contexts/userContext'
import OrdersStackNavigation from './stacks/OrdersRoutes'

const Routes: React.FC = () => {
	const Stack = createStackNavigator()
	const { isLogged } = useContext(UserContext)

	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{ headerShown: false }}
			>
				<Stack.Screen
					name='BottomTab'
					component={BottomTab}
				/>
				{!isLogged && (
					<>
						<Stack.Screen
							name='Login'
							component={Login}
						/>
						<Stack.Screen
							name='Register'
							component={Register}
						/>
						<Stack.Screen
							name='RecoveryPassword'
							component={RecoveryPassword}
						/>
					</>
				)}
				<Stack.Screen
					name='TermsOfService'
					component={TermsOfService}
				/>
				<Stack.Screen
					name='Help'
					component={Help}
				/>
				<Stack.Screen
					name='ProductDetails'
					component={ProductDetails}
				/>
				<Stack.Screen
					name='PaymentRoutes'
					component={PaymentStackNavigation}
				/>
				<Stack.Screen
					name='Orders'
					component={OrdersStackNavigation}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default Routes
