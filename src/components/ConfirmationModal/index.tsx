import React, { useContext } from 'react'
import Modal from 'react-native-modal'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {
	ButtonsWrapper,
	Container,
	TopWrapper,
	Title,
	ConfirmationDescription,
	Button,
	Content
} from './styles'
import { GlobalModalsContext } from '../../contexts/globalModalsContext'

const ConfirmationModal = () => {
	const { modals } = useContext(GlobalModalsContext)

	const { visible, payload } = modals.confirmation

	return (
		<Modal
			isVisible={visible}
			style={{ margin: 0 }}
			onBackButtonPress={payload?.decline}
			onBackdropPress={payload?.decline}
			animationIn='zoomIn'
			animationOut='zoomOut'
		>
			<Container>
				<TopWrapper>
					<Title>{payload?.title}</Title>
				</TopWrapper>

				<Content>
					<ConfirmationDescription>
						{payload?.text}
					</ConfirmationDescription>
				</Content>

				<ButtonsWrapper>

					<Button
						bgColor='#FF4F4F'
						onPress={payload?.decline}
					>
						<MaterialIcons name='close' color='#FFF' size={20} />
					</Button>

					<Button
						bgColor='#01FB83'
						onPress={payload?.accept}
					>
						<MaterialIcons name='check' color='#FFF' size={20} />
					</Button>

				</ButtonsWrapper>
			</Container>
		</Modal>
	)
}

export default ConfirmationModal
