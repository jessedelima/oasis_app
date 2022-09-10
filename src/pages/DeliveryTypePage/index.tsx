import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import BackHeader from '../../components/BackHeader'
import LargeButton from '../../components/LargeButton'
import PaymentButton from '../../components/PaymentButton'
import { GlobalModalsContext } from '../../contexts/globalModalsContext'
import { InformationsContext } from '../../contexts/informationsContext'
import { PaymentContext } from '../../contexts/paymentContext'
import { UserContext } from '../../contexts/userContext'
import { PagesProps, StoreAddress, UserAddress } from '../../interfaces'
import services from '../../services'
import PickUp from './PickUp'
import PickUpAtStore from './PickUpAtStore'
import { Container, Content, Header, Subtitle } from './styles'

const DeliveryType = ({ navigation }: PagesProps) => {
	const { deliveryType, setDeliveryType, verifyDeliveryType, setShippingValue } = useContext(PaymentContext)
	const { openLoadingModal, closeLoadingModal } = useContext(GlobalModalsContext)
	const { informations } = useContext(InformationsContext)
	const { user } = useContext(UserContext)
	const [isLoading, setIsLoading] = useState(false)
	const [storeAddress, setStoreAddress] = useState<StoreAddress[]>([])
	const [userAddress, setUserAddress] = useState<UserAddress[]>([])
	const [hasDelivery, setHasDelivery] = useState(true)
	const [hasRemoval, setHasRemoval] = useState(true)
	const goBack = () => navigation.goBack()

	const handleContinue = () => {
		if (verifyDeliveryType()) {
			navigation.navigate('Payment')
		}
	}

	useEffect(() => {
		isLoading ? openLoadingModal() : closeLoadingModal()
	}, [isLoading])

	useEffect(() => {
		console.log(informations)
		if (informations?.operation_mode) {
			switch (informations.operation_mode) {
				case 0:
					setHasDelivery(false)
					setHasRemoval(true)
					break
				case 1:
					setHasDelivery(true)
					setHasRemoval(false)
					break
				case 2:
					setHasDelivery(true)
					setHasRemoval(true)
					break
			}
		}
	}, [informations])

	const getStoreAddress = async () => {
		const response = await services.address.getAddressInfo()
		if (!response.error) {
			setStoreAddress(response.data)
		}
	}

	useEffect(() => {
		if (deliveryType !== 1) {
			setShippingValue(null)
		}
	}, [deliveryType])

	const getUserAddress = async () => {
		if (user?.id) {
			const response = await services.address.userAddress(user.id)
			if (!response.error) {
				setUserAddress(response.data)
			}
		}
	}

	const loadAddress = async () => {
		setIsLoading(true)
		await getStoreAddress()
		await getUserAddress()
		setIsLoading(false)
	}

	useEffect(() => {
		loadAddress()
	}, [])

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Container>
				<BackHeader label='Informações de entrega' onClose={goBack} />
				<Subtitle>
					Escolha a forma de entrega
				</Subtitle>

				<Header>

					{hasRemoval && (
						<PaymentButton
							label='Buscar no local.'
							onPress={() => setDeliveryType(0)}
							rightIconName='map-marker'
							isActive={deliveryType === 0}
						/>
					)}

					{hasDelivery && (
						<PaymentButton
							label='Escolher endereço da entrega.'
							onPress={() => setDeliveryType(1)}
							rightIconName='home'
							isActive={deliveryType === 1}
						/>
					)}

				</Header>

				{ deliveryType !== null && (
					<Content>
						<Subtitle>
							{deliveryType === 0 ? 'Onde deseja retirar? ' : 'Informações sobre o endereço'}
						</Subtitle>
						{
							deliveryType === 0
								? (
									<PickUpAtStore storeAddress={storeAddress} />
								)
								: (
									<PickUp
										onPickupChange={(shippingValue: number, free: boolean) => {
											free ? setShippingValue(null) : setShippingValue(shippingValue)
										}}
										setLoading={setIsLoading}
										userAddress={userAddress}
										onAddNewAddress={getUserAddress}
									/>
								)
						}
					</Content>
				) }
			</Container>
			<LargeButton labelText='Continuar' onPress={handleContinue} />
		</SafeAreaView>
	)
}

export default DeliveryType
