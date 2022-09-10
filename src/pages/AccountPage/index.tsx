import React, { useContext } from 'react'
import LargeBox from '../../components/LargeBox'
import { UserContext } from '../../contexts/userContext'
import {
	Container,
	InfoBox,
	Header,
	InfoText,
	HeaderContent,
	Menu
} from './styles'
import MenuOption from './MenuOption'
import { telMask } from '../../utils'
import { ScrollView } from 'react-native'
import { GlobalModalsContext } from '../../contexts/globalModalsContext'
import { CartContext } from '../../contexts/cartContext'
import { PagesProps } from '../../interfaces'

const AccountPage = ({ navigation }: PagesProps) => {
	const { shortName, user, fullAddress, logOut } = useContext(UserContext)
	const { modals, setModalActive, setModalInactive } = useContext(GlobalModalsContext)
	const { resetCart } = useContext(CartContext)

	const closeModal = () => {
		setModalInactive({
			...modals,
			confirmation: { visible: false, payload: null }
		})
	}

	const exitApp = async () => {
		closeModal()
		logOut()
		resetCart()
	}

	const handleExitApp = () => {
		setModalActive({
			...modals,
			confirmation: {
				visible: true,
				payload: {
					title: 'Atenção',
					text: 'Realmente deseja sair da conta?',
					accept: exitApp,
					decline: closeModal
				}
			}
		})
	}

	return (
		<Container>
			<ScrollView>
				<Header>
					<HeaderContent>
						<LargeBox
							label='Olá, '
							strongLabel={shortName}
							iconName='account'
							customStyles={{ paddingVertical: 15, paddingHorizontal: 7 }}
						/>
						<InfoBox>
							<InfoText>{user?.email}</InfoText>
							<InfoText>{fullAddress}</InfoText>
							<InfoText>{user?.cellphone ? telMask(user.cellphone) : '' }</InfoText>
						</InfoBox>
					</HeaderContent>
				</Header>
				<Menu>

					<MenuOption
						label='Meus Pedidos'
						iconName='card-giftcard'
						onPress={() => navigation.navigate('Orders') }
					/>

					{/* <MenuOption
						label='Ajuda'
						iconName='help-outline'
						onPress={() => navigation.navigate('Help') }
					/> */}

					<MenuOption
						label='Termos de Uso'
						iconName='message'
						onPress={() => navigation.navigate('TermsOfService') }
					/>

					<MenuOption
						label='Sair'
						iconName='exit-to-app'
						onPress={handleExitApp}
					/>

				</Menu>
			</ScrollView>
		</Container>
	)
}

export default AccountPage
