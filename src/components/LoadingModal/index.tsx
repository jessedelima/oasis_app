import React, { useContext } from 'react'
import { ActivityIndicator } from 'react-native'
import Modal from 'react-native-modal'
import { GlobalModalsContext } from '../../contexts/globalModalsContext'
import { theme } from '../../utils/theme'
import InterText from '../InterText'
import { Container } from './styles'

const LoadingModal = () => {
	const { loadingModal, closeLoadingModal } = useContext(GlobalModalsContext)

	const { visible, text } = loadingModal

	return (
		<Modal
			isVisible={visible}
			style={{ margin: 0 }}
			onBackdropPress={closeLoadingModal}
			onBackButtonPress={closeLoadingModal}
			animationIn='zoomIn'
			animationOut='zoomOut'
		>
			<Container>
				<ActivityIndicator size='large' color={theme.colors.main} />
				<InterText style={{ textAlign: 'center' }}>{text ?? 'Carregando...'}</InterText>
			</Container>
		</Modal>
	)
}

export default LoadingModal
