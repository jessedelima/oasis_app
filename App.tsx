import React, { ReactNode, useEffect } from 'react'
import { StatusBar } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import Toast, { BaseToast } from 'react-native-toast-message'
import { ThemeProvider } from 'styled-components'
import CartProvider from './src/contexts/cartContext'
import CategoriesProvider from './src/contexts/categoriesContext'
import GlobalModalsProvider from './src/contexts/globalModalsContext'
import InformationsProvider from './src/contexts/informationsContext'
import ProductsProvider from './src/contexts/productsContext'
import UserProvider from './src/contexts/userContext'
import Routes from './src/routes'
import { theme } from './src/utils/theme'
import ConfirmationModal from './src/components/ConfirmationModal'
import AlertModal from './src/components/AlertModal'
import LoadingModal from './src/components/LoadingModal'

const ContextWrapper = ({ children }: {children: ReactNode}) => (
	<GlobalModalsProvider>
		<InformationsProvider>
			<UserProvider>
				<ProductsProvider>
					<CartProvider>
						<CategoriesProvider>
							<ConfirmationModal />
							<AlertModal />
							<LoadingModal />
							{children}
						</CategoriesProvider>
					</CartProvider>
				</ProductsProvider>
			</UserProvider>
		</InformationsProvider>
	</GlobalModalsProvider>
)

const App = () => {
	useEffect(() => {
		SplashScreen.hide()
	}, [])

	const toastConfig = {
		success: ({ text1, text2, ...rest }: { text1: string, text2: string }) => (
			<BaseToast
				{...rest}
				style={{
					borderLeftColor: theme.colors.main,
					borderWidth: 1,
					borderColor: theme.colors.main
				}}
				contentContainerStyle={{ paddingHorizontal: 15 }}
				text1Style={{
					fontSize: 18,
					fontWeight: 'bold'
				}}
				text1={text1}
				text2={text2}
				text1NumberOfLines={1}
				text2NumberOfLines={1}
			/>
		)
	}

	return (
		<>
			<StatusBar backgroundColor='#E5E5E5' barStyle='dark-content' />
			<ThemeProvider theme={theme}>
				<ContextWrapper>
					<Routes />
				</ContextWrapper>
			</ThemeProvider>
			<Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
		</>
	)
}

export default App
