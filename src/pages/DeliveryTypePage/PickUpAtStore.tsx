import React, { useContext, useEffect, useState } from 'react'
import PaymentButton from '../../components/PaymentButton'
import { PaymentContext } from '../../contexts/paymentContext'
import { PickUpAtStoreProps } from '../../interfaces'

const PickUpAtStore = ({ storeAddress }: PickUpAtStoreProps) => {
	const { setAddress } = useContext(PaymentContext)
	const [addressSelected, setAddressSelected] = useState<null | number>(null)

	useEffect(() => {
		if (addressSelected != null) {
			const addressTemp = storeAddress.find(
				address => address.id === addressSelected)
			if (addressTemp) {
				const { informations_id, ...rest } = addressTemp
				setAddress(rest)
			} else {
				setAddress(null)
			}
		}
	}, [addressSelected])

	useEffect(() => {
		setAddress(null)
	}, [])

	return (
		<>
			{storeAddress.map((address) => (
				<PaymentButton
					key={`address-${address.id}`}
					label={`${address.street}, ${address.district}, ${address.number}`}
					leftIconName='home'
					onPress={() => setAddressSelected(address.id)}
					rightIconName='check-circle'
					isActive={addressSelected === address.id}
				/>
			))}
		</>
	)
}

export default PickUpAtStore
