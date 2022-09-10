import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'
import BackHeader from '../../components/BackHeader'
import LargeButton from '../../components/LargeButton'
import { GlobalModalsContext } from '../../contexts/globalModalsContext'
import { OrdersContext } from '../../contexts/ordersContext'
import { EvaluatePageProps, OrderRatingPayload } from '../../interfaces'
import PickerBox from './PickerBox'
import { MinorText, TextArea, TextAreaLabel } from './styles'
import options from '../../mocks/ratingOptions.json'
import { showSuccessToast } from '../../utils'

const EvaluatePage = ({ navigation, route }: EvaluatePageProps) => {
	const { isRated, orderId, rating } = route.params
	const { showAlert } = useContext(GlobalModalsContext)
	const { submitRating } = useContext(OrdersContext)
	const [appRate, setAppRate] = useState<number | null>(null)
	const [buyingEaseRate, setBuyingEaseRate] = useState<number | null>(null)
	const [deliveryRate, setDeliveryRate] = useState<number | null>(null)
	const [additionalComments, setAdditionalComments] = useState<string>('')

	useEffect(() => {
		if (isRated) {
			setAppRate(8)
			setBuyingEaseRate(6)
			setDeliveryRate(2)
			setAdditionalComments('Descrição adicional')
		} else {
			setAppRate(null)
			setBuyingEaseRate(null)
			setDeliveryRate(null)
			setAdditionalComments('')
		}
	}, [isRated])

	useEffect(() => {
		if (isRated && rating) {
			setAppRate(rating.rating_app)
			setBuyingEaseRate(rating.rating_buy)
			setDeliveryRate(rating.rating_delivery)
			setAdditionalComments(rating.comment)
		} else {
			setAppRate(null)
			setBuyingEaseRate(null)
			setDeliveryRate(null)
			setAdditionalComments('')
		}
	}, [isRated, rating])

	const onSuccessSubmitRating = () => {
		showSuccessToast('Sucesso!', 'Avaliação salva com sucesso')
		navigation.goBack()
	}

	const handleSubmitEvaluate = async () => {
		if (appRate !== null && buyingEaseRate !== null && deliveryRate !== null) {
			const payload: OrderRatingPayload = {
				rating_app: appRate,
				rating_buy: buyingEaseRate,
				rating_delivery: deliveryRate,
				average: ((appRate + buyingEaseRate + deliveryRate) / 3).toFixed(2),
				comment: additionalComments,
				orders_id: orderId
			}
			await submitRating(payload, onSuccessSubmitRating)
		} else {
			showAlert('Selecione todas as notas para prosseguir', 'Atenção')
		}
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView>
				<BackHeader onClose={() => navigation.goBack()} label='Avaliar Pedido' />
				<MinorText>
					Preencha esse pequeno formulário para que possamos melhorar cada vez mais!
				</MinorText>

				<View style={{ paddingHorizontal: 20 }}>

					<PickerBox
						label='Qual nota você daria para o nosso App?'
						value={appRate}
						setValue={setAppRate}
						options={options}
						disabled={isRated}
					/>

					<PickerBox
						label='Qual nota você daria para facilidade em comprar?'
						value={buyingEaseRate}
						setValue={setBuyingEaseRate}
						options={options}
						disabled={isRated}
					/>

					<PickerBox
						label='Qual nota você daria para entrega do pedido?'
						value={deliveryRate}
						setValue={setDeliveryRate}
						options={options}
						disabled={isRated}
					/>

					<TextAreaLabel>
						(Opcional) Nos conte um pouco da sua experiência
						no aplicativo:
					</TextAreaLabel>

					<TextArea
						disabled={isRated}
						editable={!isRated}
						multiline
						value={additionalComments}
						onChangeText={txt => setAdditionalComments(txt)}
						numberOfLines={5}
						style={{ textAlignVertical: 'top' }}
						placeholder='Escreva um pouco sobre sua experiência utilizando o nosso aplicativo...'
					/>
				</View>
			</ScrollView>
			{ !isRated && (
				<LargeButton labelText='Finalizar avaliação' onPress={handleSubmitEvaluate} />
			) }
		</SafeAreaView>
	)
}

export default EvaluatePage
