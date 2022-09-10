import React from 'react'
import { SubtitleProps } from '../../interfaces'
import { Container, LabelWrapper, LabelText } from './styles'

const Subtitle = ({ label }: SubtitleProps) => {
	return (
		<Container>

			<LabelWrapper>
				<LabelText>{label}</LabelText>
			</LabelWrapper>

		</Container>
	)
}

export default Subtitle
