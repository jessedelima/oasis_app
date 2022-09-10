import React, { useState } from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import BackHeader from '../../components/BackHeader'
import { Content } from './styles'
import { PagesProps } from '../../interfaces'
import Option from './Option'

const commomQuestionsMock = [
	{
		id: 1,
		isActive: false,
		question: 'Tive problemas com meu pedido, e agora?',
		aswner: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Sed nec urna ac eros interdum efficitur vel a leo. Pellentesque in eros augue. Mauris at tristique arcu. Sed nulla mi, faucibus eu bibendum a, efficitur mollis neque. Fusce ut gravida libero. Maecenas varius lacus vitae dapibus dignissim. Maecenas arcu quam, elementum vel egestas vel, luctus eget mi. Sed egestas dui erat, in suscipit justo laoreet sed. Suspendisse libero erat, sagittis ultrices velit vel, malesuada dignissim augue.'
	},
	{
		id: 2,
		isActive: false,
		question: 'A cerveja vem gelada?',
		aswner: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Sed nec urna ac eros interdum efficitur vel a leo. Pellentesque in eros augue. Mauris at tristique arcu. Sed nulla mi, faucibus eu bibendum a, efficitur mollis neque. Fusce ut gravida libero. Maecenas varius lacus vitae dapibus dignissim. Maecenas arcu quam, elementum vel egestas vel, luctus eget mi. Sed egestas dui erat, in suscipit justo laoreet sed. Suspendisse libero erat, sagittis ultrices velit vel, malesuada dignissim augue.'
	},
	{
		id: 3,
		isActive: false,
		question: 'Posso pagar na entrega?',
		aswner: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Sed nec urna ac eros interdum efficitur vel a leo. Pellentesque in eros augue. Mauris at tristique arcu. Sed nulla mi, faucibus eu bibendum a, efficitur mollis neque. Fusce ut gravida libero. Maecenas varius lacus vitae dapibus dignissim. Maecenas arcu quam, elementum vel egestas vel, luctus eget mi. Sed egestas dui erat, in suscipit justo laoreet sed. Suspendisse libero erat, sagittis ultrices velit vel, malesuada dignissim augue.'
	},
	{
		id: 4,
		isActive: false,
		question: 'Qual o tempo de entrega?',
		aswner: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Sed nec urna ac eros interdum efficitur vel a leo. Pellentesque in eros augue. Mauris at tristique arcu. Sed nulla mi, faucibus eu bibendum a, efficitur mollis neque. Fusce ut gravida libero. Maecenas varius lacus vitae dapibus dignissim. Maecenas arcu quam, elementum vel egestas vel, luctus eget mi. Sed egestas dui erat, in suscipit justo laoreet sed. Suspendisse libero erat, sagittis ultrices velit vel, malesuada dignissim augue.'
	},
	{
		id: 5,
		isActive: false,
		question: 'O atendimento é nacional?',
		aswner: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Sed nec urna ac eros interdum efficitur vel a leo. Pellentesque in eros augue. Mauris at tristique arcu. Sed nulla mi, faucibus eu bibendum a, efficitur mollis neque. Fusce ut gravida libero. Maecenas varius lacus vitae dapibus dignissim. Maecenas arcu quam, elementum vel egestas vel, luctus eget mi. Sed egestas dui erat, in suscipit justo laoreet sed. Suspendisse libero erat, sagittis ultrices velit vel, malesuada dignissim augue.'
	}
]

const HelpPage = ({ navigation }: PagesProps) => {
	const [commomQuestions, setCommomQuestions] = useState(commomQuestionsMock)

	const setAswnerActive = (id: number) => {
		setCommomQuestions(commomQuestions.map(el => {
			if (el.id === id) {
				el.isActive = !el.isActive
			} else {
				el.isActive = false
			}
			return el
		}))
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<BackHeader label='Ajuda' onClose={() => navigation.goBack() } />
			<ScrollView>
				<Content>
					{
						commomQuestions.map(el => (
							<Option item={el} key={`${el.question}-${el.id}`} onPress={setAswnerActive} />
						))
					}
				</Content>
			</ScrollView>
		</SafeAreaView>
	)
}

export default HelpPage
