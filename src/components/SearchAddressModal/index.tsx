import React, { useContext, useEffect, useState } from 'react'
import { FlatList, SafeAreaView } from 'react-native'
import Modal from 'react-native-modal'
import { GlobalModalsContext } from '../../contexts/globalModalsContext'
import { SearchAddressModalParams, UserAddressPayload, userAddressSearch } from '../../interfaces'
import services from '../../services'
import { autoCompleteSearch, getGeocode } from '../../services/googleServices'
import { mountUserAddressObj } from '../../utils'
import AdditionalAddressInfo from '../AdditionalAddressInfo'
import BackHeader from '../BackHeader'
import Search from '../Search'
import { Content, Header, ResultItem, ResultItemText, Subtitle } from './styles'

const SearchAddressModal = ({ onSubmit, isVisible, onRequestClose, editableAddress }: SearchAddressModalParams) => {
	const [results, setResults] = useState<string[]>([])
	const [searchItem, setSearchItem] = useState<string>('')
	const [address, setAddress] = useState<null | userAddressSearch>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [addressSelected, setAddressSelected] = useState<number>(-1)
	const [modalAdditionalInfo, setModalAdditionalInfo] = useState<boolean>(false)
	const { showAlert, openLoadingModal, closeLoadingModal } = useContext(GlobalModalsContext)
	const isEdit = !!editableAddress

	useEffect(() => {
		isLoading ? openLoadingModal() : closeLoadingModal()
	}, [isLoading])

	const submitSearch = () => {
	}

	const dimissModal = () => {
		setModalAdditionalInfo(false)
	}

	useEffect(() => {
		if (isVisible && editableAddress) {
			setSearchItem(editableAddress.editAddress)
		}
	}, [isVisible, editableAddress])

	const onSuccess = async (addressTemp: UserAddressPayload) => {
		setModalAdditionalInfo(false)
		setIsLoading(true)
		let response
		if (isEdit && editableAddress) {
			response = await services.address.editUserAddress(addressTemp, editableAddress.userAddressId)
		} else {
			response = await services.address.registerUserAddress(addressTemp)
		}
		if (response && !response.error) {
			onSubmit(response.data)
			setIsLoading(false)
		} else {
			setIsLoading(false)
			showAlert(response?.error.message ?? 'Ocorreu um erro ao salvar seu endereço', 'Atenção')
		}
	}

	const onError = (message: string) => {
		showAlert(message, 'Atenção')
	}

	const onAddressClick = async (addressSelected: string) => {
		setIsLoading(true)
		const response = await getGeocode(addressSelected)
		if (response?.error) {
			showAlert(response.error.message, 'Atenção')
		} else if (response?.data) {
			const addressTemp = mountUserAddressObj(response.data)
			setAddress(addressTemp)
			setModalAdditionalInfo(true)
		}
		setIsLoading(false)
	}

	useEffect(() => {
		const searchAddress = async (address: string) => {
			const response = await autoCompleteSearch(address)
			if (response?.error) {
				showAlert(response.error.message, 'Atenção')
			} else if (response?.data) {
				setResults(response.data)
			}
		}

		searchItem.length > 0 && searchAddress(searchItem)
	}, [searchItem])

	return (
		<Modal
			isVisible={isVisible}
			style={{ margin: 0 }}
			onBackButtonPress={onRequestClose}
		>
			<SafeAreaView style={{ flex: 1, backgroundColor: '#E5E5E5' }}>
				{address && modalAdditionalInfo && (
					<AdditionalAddressInfo
						onCloseRequest={dimissModal}
						address={address}
						onError={onError}
						onSuccess={onSuccess}
					/>
				)}
				<BackHeader label='Procurar por endereço' onClose={onRequestClose} />
				<Header>
					<Search
						iconName='search'
						onSubmit={submitSearch}
						value={searchItem}
						setValue={setSearchItem}
					/>
				</Header>
				<Content>
					{ results.length > 0 && (
						<Subtitle>Resultados: </Subtitle>
					)}
					<FlatList
						style={{ marginTop: 10 }}
						data={results}
						keyExtractor={(item) => item}
						renderItem={({ item, index }) => (
							<ResultItem
								onPress={() => {
									onAddressClick(item)
									setAddressSelected(index)
								}}
								key={`${item}-${index}`}
								isActive={index === addressSelected}
							>
								<ResultItemText isActive={index === addressSelected}>
									{item}
								</ResultItemText>
							</ResultItem>
						)}
					/>
				</Content>
			</SafeAreaView>
		</Modal>
	)
}

export default SearchAddressModal
