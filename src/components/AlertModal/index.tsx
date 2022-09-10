import React, { useContext } from 'react'
import { Platform } from 'react-native'
import Modal from 'react-native-modal'
import { GlobalModalsContext } from '../../contexts/globalModalsContext'
import InterText from '../InterText'
import { Container, Title, Header, Content, Button } from './styles'

const AlertModal = () => {
	const { alertModal, closeAlert } = useContext(GlobalModalsContext)

	const { visible, payload, onPress } = alertModal

	const close = () => {
		if (onPress) {
			onPress()
		}
		closeAlert()
	}

	return (
		<Modal
			isVisible={visible}
			style={{ margin: 0 }}
			onBackdropPress={close}
			onBackButtonPress={close}
			animationIn='zoomIn'
			animationOut='zoomOut'
		>
			<Container>

				<Header>
					<Title>{payload?.title}</Title>
				</Header>

				<Content>
					<InterText style={{ textAlign: 'center' }} >{payload?.text}</InterText>
				</Content>

				<Button
					onPress={close}
					style={Platform.OS == "ios" && {paddingRight:20}}
				>
					<InterText>OK</InterText>
				</Button>
			</Container>
		</Modal>
	)
}

export default AlertModal
