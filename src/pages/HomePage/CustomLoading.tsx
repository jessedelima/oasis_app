import React from 'react'
import { theme } from '../../utils/theme'
import { CustomLoadingContainer, Loading } from './CustomLoadingStyles'

const CustomLoading = () => (
	<CustomLoadingContainer>
		<Loading size='large' color={theme.colors.main} />
	</CustomLoadingContainer>
)

export default CustomLoading
