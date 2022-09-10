import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Account, UnloggedAccount } from '../../pages'
import { UserContext } from '../../contexts/userContext'

const Stack = createStackNavigator()

const AccountStackNavigation = () => {
	const { isLogged } = useContext(UserContext)
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false
			}}
		>
			{ isLogged
				? (
					<>
						<Stack.Screen name='Account' component={Account} />
					</>
				)
				: (
					<>
						<Stack.Screen name='UnloggedAccount' component={UnloggedAccount} />
					</>
				)}
		</Stack.Navigator>
	)
}

export default AccountStackNavigation
