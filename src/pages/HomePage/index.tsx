import { Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Category, PagesProps } from '../../interfaces'
import { FilterSubtitle } from './styles'
import Header from '../../components/Header'
import Search from '../../components/Search'
import Categories from '../../components/Categories'
import LargeBox from '../../components/LargeBox'
import FeaturedItem from '../../components/FeaturedItem'
import ProductsList from '../../components/ProductsList'
import InterText from '../../components/InterText'
import InterBoldText from '../../components/InterBoldText'
import Subtitle from '../../components/Subtitle'
import CustomLoading from './CustomLoading'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import IonIcons from 'react-native-vector-icons/Ionicons'
import { ProductsContext } from '../../contexts/productsContext'
import { CategoriesContext } from '../../contexts/categoriesContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import messaging, { firebase } from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native'
import { OrdersContext } from '../../contexts/ordersContext'
import { UserContext } from '../../contexts/userContext'

const Home = ({navigation}: PagesProps) => {
	
	const [isSearch, setIsSearch] = useState<boolean>(false)
	const [searchItem, setSearchItem] = useState<string>('')
	const [wantedItem, setWantedItem] = useState<string>('')
	const { products, highlightsProducts, getFilteredProducts, getAllProducts, isLoadingProducts } = useContext(ProductsContext)
	const [categorySelected, setCategorySelected] = useState<number>(0)
	const { categories } = useContext(CategoriesContext)
	const { changeOrderNotification } = useContext(UserContext);
	const [allCategories, setAllCategories] = useState<Category[]>([{
		id: 0,
		name: 'Destaques',
		checked: true
	}])

	const orderCategories = (a: Category, b: Category) => {
		if (a.name !== 'Destaques' && b.name !== 'Destaques') {
			if (!a.order) return 1
			if (!b.order) return 1
			if (a.order < b.order) return -1
			if (a.order > b.order) return 1
		}
		return 0
	}

	const handleFilterProducts = async () => {
		if (categorySelected === 0 && wantedItem.length === 0) {
			getAllProducts()
		} else {
			await getFilteredProducts(categorySelected, wantedItem)
		}
	}

	const onChangeCategoryActive = (categoryId: number) => {
		const data = allCategories.map(el => {
			if (el.id === categoryId) {
				el.checked = true
			} else {
				el.checked = false
			}
			return el
		})
		setAllCategories(data)
		setCategorySelected(categoryId)
	}

	const submitSearch = (): void => {
		if (searchItem.length > 0) {
			setIsSearch(true)
		} else {
			setIsSearch(false)
		}
		setWantedItem(searchItem)
		setSearchItem('')
	}

	const cleanSearch = () => {
		setWantedItem('')
		setIsSearch(false)
	}

	const initializeApp = async() => {
		if(Platform.OS == "ios"){
			await firebase.initializeApp({
				appId: '1:317293557901:ios:c1c552c733d16601890ac4',
				apiKey: 'AIzaSyAlAfGv-1RarE4fPhMJEAl8MqZY9E6hsOE',
				projectId: 'oasis-pit-stop',
				storageBucket: 'oasis-pit-stop.appspot.com',
				clientId: '317293557901-mejc97k4dfcjnn9ncl0sjpkgrojaqfl2.apps.googleusercontent.com',
				databaseURL: '',
				messagingSenderId: '317293557901'
			}).then((res) => {
				console.log(res)
			}).catch((err) => {
				console.log(err)
			})
			const authStatus = await messaging().requestPermission();
			const enabled =
				authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
				authStatus === messaging.AuthorizationStatus.PROVISIONAL;
			if (enabled) {
				messaging().setBackgroundMessageHandler(async (remoteMsg) => {
					console.log(remoteMsg);
					return messaging().getInitialNotification().then(rmt => {
						if (remoteMsg) {
							const orderId: any = remoteMsg.data;
							changeOrderNotification(orderId.codParams);
							navigation.navigate('Orders');
						}
					})
				})
			}
		} else {
			messaging().setBackgroundMessageHandler((remoteMsg) => {
				return messaging().getInitialNotification().then(rmt => {
					if (remoteMsg) {
						const orderId: any = remoteMsg.data;
						changeOrderNotification(orderId.codParams);
						navigation.navigate('Orders');
					}
				})
			})
		}
	}

	useEffect(() => {
		initializeApp();
	}, [])

	useEffect(() => {
		const allCategoriesTemp = [...allCategories, ...categories]
		allCategoriesTemp.sort(orderCategories)
		setAllCategories(allCategoriesTemp)	
			
	}, [categories])

	useEffect(() => {
		handleFilterProducts()
	}, [categorySelected, wantedItem])

	return (
		<SafeAreaView style={{flex: 1}}>
			<ScrollView>
				<Header />
				<Search
					iconName='keyboard-arrow-right'
					onSubmit={submitSearch}
					value={searchItem}
					setValue={setSearchItem}
				/>
				<Categories data={allCategories} onChangeActive={onChangeCategoryActive} />
				{
					isSearch
						? (
							<>
								<FilterSubtitle>

									<View style={{ flexDirection: 'row' }}>
										<InterText>
											<Text>Resultados por </Text>
											<InterBoldText>{wantedItem}</InterBoldText>
										</InterText>

										<TouchableOpacity
											onPress={cleanSearch}
										>
											<MaterialIcons
												name='close'
												size={16}
												color='#000'
												style={{ marginLeft: 5 }}
											/>
										</TouchableOpacity>
									</View>

									<IonIcons name='funnel' size={15} />
								</FilterSubtitle>
							</>
						)
						: (
							<>
								{ highlightsProducts.length > 0 && categorySelected === 0 && (
									<>
										<LargeBox
											label='Ofertas do'
											strongLabel='dia.'
											iconName='gift'
											customStyles={{ paddingHorizontal: 15, paddingVertical: 15 }}
										/>
										<FeaturedItem items={highlightsProducts} />
									</>
								)}
								<Subtitle label='Produtos' />
							</>
						)
				}
				{
					isLoadingProducts
						? <CustomLoading />
						: <ProductsList products={products} />
				}
			</ScrollView>
		</SafeAreaView>
	)
}

export default Home
