import React from 'react'
import BackHeader from '../../components/BackHeader'
import InterText from '../../components/InterText'
import { Container, Content } from './styles'
import { PagesProps } from '../../interfaces'

const TermsOfService = ({ navigation }: PagesProps) => {
	const onCloseRequest = () => {
		navigation.goBack()
	}

	return (
		<Container>
			<BackHeader onClose={onCloseRequest} label='Termos de Uso' />
			<Content>
				<InterText>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget sagittis tellus, eu sagittis justo. Donec blandit mi eget tortor molestie fermentum. Aliquam pharetra lorem vitae felis sollicitudin, eu ornare tortor maximus. Nunc tincidunt nisi vel libero semper luctus. Quisque sagittis efficitur justo, vitae convallis neque interdum nec. Morbi egestas dapibus tellus, nec convallis sem varius vel. Vivamus pellentesque metus ut iaculis mollis. Proin et libero ut dolor ultrices commodo non et velit. Suspendisse vel vulputate diam. Maecenas fringilla lobortis turpis, et ultricies diam sollicitudin sed.

					Donec porttitor lacinia dui. Praesent in auctor est, vel tincidunt risus. Donec id dolor pellentesque, vehicula ligula id, finibus lectus. Vestibulum dignissim tincidunt tortor ac posuere. Nam non nunc interdum, commodo sem ac, finibus risus. Nunc quis magna odio. Mauris consectetur porta purus, vitae cursus mauris maximus ut. Ut eget viverra nisi. Etiam sit amet turpis accumsan, lobortis odio a, maximus ligula. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam nibh nisl, blandit ac rutrum eu, efficitur nec risus.

					Maecenas quis maximus risus. Mauris malesuada felis efficitur dolor cursus vehicula. Donec pharetra leo a nisi viverra, condimentum porta ipsum efficitur. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi accumsan in tellus quis commodo. Donec sagittis auctor tortor quis mollis. In luctus magna ut metus suscipit, ut varius est facilisis. Ut non imperdiet leo. Curabitur vitae tortor dolor. Cras dui nibh, ultrices ac lectus eu, condimentum tristique sem.

					Donec ut condimentum nibh. Nullam eu arcu tellus. Proin ante dolor, commodo id nisl et, condimentum sagittis libero. Sed porttitor aliquet felis, sit amet tempor nulla pretium ac. Praesent vitae ipsum nec sapien sagittis facilisis eu vulputate odio. Vivamus lacus dolor, fringilla eu semper ut, pharetra et sem. Nunc in placerat magna. Aenean urna metus, dictum vitae cursus et, ultrices a lectus. Proin a massa mauris. Donec enim purus, hendrerit non viverra a, faucibus eu ante. Ut volutpat, dui vel elementum pulvinar, dui mi placerat dolor, semper commodo sapien lorem eu urna. Ut ipsum sapien, rhoncus non metus sit amet, pharetra euismod magna.

					Proin fringilla risus a leo viverra, vel mattis lorem efficitur. Pellentesque finibus tellus ac purus sollicitudin scelerisque. Sed sodales in est at tincidunt. Vestibulum lobortis aliquet arcu, ut auctor metus. Maecenas vehicula id justo in laoreet. Fusce massa nunc, malesuada facilisis dui non, elementum ornare purus. Nullam varius ligula non lacus euismod euismod. In in velit nec mi rhoncus porta et quis sem. Nunc rutrum odio ut mi rutrum, nec viverra odio imperdiet. Fusce eget gravida lectus, ac suscipit lorem. Ut convallis nibh sit amet ligula scelerisque consequat. Nullam congue neque a neque viverra malesuada. Sed a scelerisque mauris. Mauris gravida nulla magna, sed luctus eros tincidunt eu.

					In posuere leo vel eleifend cursus. Donec sollicitudin sit amet orci eget commodo. Sed risus turpis, porttitor et cursus eu, aliquam vel mi. Vestibulum non accumsan leo. Praesent fringilla cursus placerat. Aliquam tempor est non urna laoreet, quis laoreet sapien tempor. Maecenas eget aliquam ipsum, in rhoncus nunc.

					Nullam porttitor et ante sit amet lobortis. Suspendisse ultricies eros felis, vel luctus dolor elementum ac. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc pretium est efficitur nisi facilisis, nec feugiat urna imperdiet. Nulla ultrices ullamcorper sem nec euismod. Proin aliquam risus sed justo ullamcorper hendrerit. Nulla lorem mi, sollicitudin ac suscipit nec, lobortis non erat. Proin ullamcorper erat non ante fermentum tincidunt. Quisque tempus, magna eu ultrices hendrerit, nisi ipsum molestie turpis, eget ultricies metus justo id magna.
				</InterText>
			</Content>
		</Container>
	)
}

export default TermsOfService
