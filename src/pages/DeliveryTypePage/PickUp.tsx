import React, { useContext, useEffect, useState } from 'react'
import AdditionalAddressInfo from '../../components/AdditionalAddressInfo'
import PaymentButton from '../../components/PaymentButton'
import SearchAddressModal from '../../components/SearchAddressModal'
import { CartContext } from '../../contexts/cartContext'
import { GlobalModalsContext } from '../../contexts/globalModalsContext'
import { InformationsContext } from '../../contexts/informationsContext'
import { PaymentContext } from '../../contexts/paymentContext'
import useLocation from '../../hooks/useLocation'
import { EditableAddress, PickUpProps, UserAddress, UserAddressPayload, userAddressSearch } from '../../interfaces'
import services from '../../services'
import { getLocationByCoords } from '../../services/googleServices'
import { formatPrice, mountUserAddressObj } from '../../utils'
import { Line, Subtitle } from './styles'

const PickUp = ({ userAddress, setLoading, onPickupChange, onAddNewAddress }: PickUpProps) => {
	const { setAddress } = useContext(PaymentContext)
	const { showAlert } = useContext(GlobalModalsContext)
	const { totalPrice } = useContext(CartContext)
	const { informations } = useContext(InformationsContext)
	const [registerAddresses, setRegisterAddresses] = useState<UserAddress[]>(userAddress)
	const [useGeolocation, setUseGeolocation] = useState(false)
	const [deliveryFree, setDeliveryFree] = useState(false)
	const [geolocationAddress, setGeolocationAddress] = useState<userAddressSearch | null>(null)
	const [addressSelected, setAddressSelected] = useState<null | number>(null)
	const [modalSearchVisible, setModalSearchVisible] = useState(false)
	const [editableAddress, setEditableAddress] = useState<EditableAddress | null>(null)
	const { getLocation, latitude, longitude, resetGeolocation } = useLocation((message: string) => showAlert(message, 'Atenção'))
	const [nowLocation, setNowLocation] = useState(false);

	const handleCoords = async (lat: number, lng: number) => {
		setLoading(true)
		try {
			const response = await getLocationByCoords(lat, lng)
			console.log(response)			
			if (response.error) {
				setLoading(false)
				showAlert(response.error.message, 'Atenção')
			} else if (response.data) {
				const addressTemp = mountUserAddressObj(response.data)
				
				// Se for na função de pegar a localização atual, forçar Nº como vazio
				if(nowLocation) addressTemp.number = '';
				
				setGeolocationAddress(addressTemp)
			} else {
				throw new Error('Não foi possível recuperar sua localização, tente novamente mais tarde')
			}
			setLoading(false)
		} catch (e) {
			setLoading(false)
			showAlert(
				e.message ?? 'Não foi possível recuperar sua localização'
				, 'Atenção'
			)
		}
	}

	useEffect(() => {
		if (addressSelected !== null) {
			const addressTemp = registerAddresses.find((address) => address.id === addressSelected)
			if (addressTemp) {
				const { primary, users_id, ...rest } = addressTemp
				setAddress(rest)
			} else {
				setAddress(null)
			}
		}
	}, [addressSelected])

	useEffect(() => {
		if (latitude !== null && longitude !== null) {
			handleCoords(latitude, longitude)
		}
	}, [latitude, longitude])

	const verifyDeliveryFree = () => {
		if (informations) {
			setDeliveryFree(totalPrice >= parseFloat(informations.free_delivery_value))
		}
	}

	useEffect(() => {
		setAddress(null)
		verifyDeliveryFree()
	}, [])

	const useGeolocationPress = () => {
		setNowLocation(true);
		getLocation()
	}

	const useRegisteredAddressPress = (id: number) => {
		setUseGeolocation(false)
		setAddressSelected(id)
	}

	const submitSearch = (address: UserAddress) => {
		setModalSearchVisible(false)
		setGeolocationAddress(null)
		
		if (editableAddress) {
			setRegisterAddresses(registerAddresses.map((addressItem) => {
				if (addressItem.id === address.id) {
					return address
				} else {
					return addressItem
				}
			}))
			setEditableAddress(null)
		} else {
			setRegisterAddresses([address, ...registerAddresses])
		}
		
		setAddressSelected(address.id)
		onPickupChange(address.shipping ?? 0, deliveryFree)
		onAddNewAddress()
	}

	const editAddress = (address: UserAddress) => {
		setEditableAddress({
			editAddress: `${address.street}, ${address.number} - ${address.district}, ${address.city}`,
			userAddressId: address.id
		})
		setModalSearchVisible(true)
	}

	// const submitEditAddress = (addressEdited: UserAddress) => {}

	const onSuccessGeolocation = async (addressTemp: UserAddressPayload) => {
		setLoading(true)
		const response = await services.address.registerUserAddress(addressTemp)
		console.log(response)
		if (!response.error) {
			submitSearch(response.data)
			setLoading(false)
		} else {
			setLoading(false)
			showAlert(response.error.message ?? 'Ocorreu um erro ao salvar seu endereço', 'Atenção')
		}
	}

	const getShipping = (shipping?: number) => {
		if (deliveryFree) {
			return 'Frete Grátis'
		}
		if (shipping !== undefined) {
			if (shipping === 0) {
				return 'Frete Grátis'
			} else if (shipping > 0) {
				return `Frete: R$${formatPrice(shipping)}`
			}
		} else {
			return shipping
		}
	}

	return (
		<>
			{geolocationAddress && (
				<AdditionalAddressInfo
					address={geolocationAddress}
					onError={(message) => {
						showAlert(message ?? 'Não foi possivel cadastrar seu endereço', 'Atenção')
					}}
					onSuccess={onSuccessGeolocation}
					onCloseRequest={() => {
						resetGeolocation()
						setGeolocationAddress(null)
					}}
				/>
			)}
			<SearchAddressModal
				editableAddress={editableAddress}
				onSubmit={submitSearch}
				isVisible={modalSearchVisible}
				onRequestClose={() => setModalSearchVisible(false)}
			/>
			<PaymentButton
				label='Endereço e Número'
				onPress={() => setModalSearchVisible(true)}
				rightIconName='home-search'
				isActive={false}
				hasButton
			/>
			<PaymentButton
				label='Usar localização atual'
				onPress={useGeolocationPress}
				rightIconName='map-marker'
				isActive={useGeolocation}
			/>
			{registerAddresses.length > 0 && (
				<>
					<Line />
					<Subtitle>Endereços já utilizados</Subtitle>
				</>
			)}
			{
				registerAddresses.map((address) => (
					<PaymentButton
						key={`address-${address.id}`}
						label={`${address.street}, ${address.number}`}
						secondaryLabel={`${address.district}-${address.city}`}
						thirdLabel={getShipping(address.shipping)}
						onPress={() => {
							useRegisteredAddressPress(address.id)
							onPickupChange(address.shipping ?? 0, deliveryFree)
						}}
						rightIconName='home-edit'
						isActive={addressSelected === address.id}
						rightIconBtn={() => editAddress(address)}
					/>
				))
			}
		</>
	)
}

export default PickUp
