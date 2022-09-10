import React, { useContext, useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home, Cart, Promotions } from '../pages'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons'
import { theme } from '../utils/theme'
import AccountStackNavigation from './stacks/AccountStack'
import { CartContext } from '../contexts/cartContext'
import { CartItem } from '../interfaces'

const BottomTab: React.FC = () => {
	const Tab = createBottomTabNavigator()
	const { cart } = useContext(CartContext)
	const [qtdItems, setQtdItems] = useState(0)

	useEffect(() => {
		setQtdItems(cart.reduce((total: number, obj: CartItem) => (
			total + obj.quantity
		), 0))
	}, [cart])

	return (
		<>
			<Tab.Navigator
				tabBarOptions={{
					labelStyle: {
						fontSize: 13
					},
					activeTintColor: '#FFF',
					inactiveTintColor: '#000',
					style: {
						backgroundColor: theme.colors.main,
						paddingVertical: 10
					}
				}}
			>
				<Tab.Screen
					name="Home"
					component={Home}
					options={{
						tabBarLabel: 'Produtos',
						tabBarIcon: ({ color, size }) => (
							<MaterialIcons name="local-bar" color={color} size={size} />
						)
					}}
				/>
				<Tab.Screen
					name="Account"
					component={AccountStackNavigation}
					options={{
						tabBarLabel: 'Conta',
						tabBarIcon: ({ color, size }) => (
							<MaterialIcons name='account-circle' color={color} size={size} />
						)
					}}
				/>
				<Tab.Screen
					name='Promotions'
					component={Promotions}
					options={{
						tabBarLabel: 'Promoções',
						tabBarIcon: ({ color, size }) => (
							<MaterialCommunity name='wallet-giftcard' color={color} size={size} />
						)
					}}
				/>
				<Tab.Screen
					name="Cart"
					component={Cart}
					options={{
						tabBarBadge: qtdItems,
						tabBarLabel: 'Carrinho',
						tabBarIcon: ({ color, size }) => (
							<MaterialIcons name="shopping-cart" color={color} size={size} />
						),
						tabBarBadgeStyle: { top: 0 }
					}}
				/>
			</Tab.Navigator>
		</>
	)
}

export default BottomTab
