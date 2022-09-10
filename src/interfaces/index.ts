import { RouteProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import { Dispatch, ReactNode, SetStateAction } from 'react'
import { KeyboardType } from 'react-native'
import { TextInputMaskTypeProp } from 'react-native-masked-text'

export interface Category {
	id: number;
	name: string;
	checked:boolean;
	order?: number;
	created_at?: string;
	update_at?: string | null;
}

export interface UserAdditionalInfos {
	cpf: string | null;
	birthday: string | null;
	cellphone: string | null;
}

export interface CategoriesParams {
	data: Category [];
	onChangeActive: (categoryId: number) => void
}

export interface ButtonSearchParams {
	iconName: string;
	onSubmit: () => void;
}

export interface LargeBoxParams {
	label: string;
	strongLabel?: string;
	iconName: string;
	customStyles: {
		paddingVertical: number;
		paddingHorizontal: number;
	}
}

export interface Feature {
	id: number,
	description: string,
	price: number
}

export interface FeaturedItemParams {
	items: Products[]
}

export interface CounterParams {
	quantity: number;
	add: () => void;
	dec: () => void;
	small?: boolean;
	allowZero?: boolean;
}

export interface Products {
	id: number;
	ean: string;
	name: string;
	description: string;
	price: number;
	categories: Category[];
	photo: string;
	sale: number;
	sale_date_expiration: string;
	last_price: number;
	unity: string;
	max_amount: number;
	created_at: string;
	updated_at: string;
	deleted_at: null;
	quantity?: number
}

export interface ProductsListParams {
	products: Products[];
	isHorizontal?: boolean;
}

export interface ProductItemParams {
	item: Products;
	isHorizontal?: boolean;
}
export interface SearchComponentParams {
	onSubmit: () => void;
	iconName: string;
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
}

export interface UserContextProviderProps {
	children: ReactNode
}

export interface Address {
	id: number;
	name: string;
	zip_code: string;
	state: string;
	city: string;
	district: string;
	street: string;
	number: string;
	complement: null | string;
	reference: null | string;
	longitude: number;
	latitude: number;
	created_at: null | string;
	updated_at: null | string;
}

export interface UserAddressPayload {
	name: string;
	zip_code: string;
	state: string;
	city: string;
	district: string;
	street: string;
	number: string;
	complement: null | string;
	reference: null | string;
	users_id: number;
	latitude: number;
	longitude: number;
}

export interface Informations {
	id: number;
  name: string;
  logo: string;
  color1: string;
  color2: string;
  firebase_login: string;
  created_at: string | null;
  updated_at: string | null;
  status: number;
  operation_mode: number;
  min_value_order: string;
  free_delivery_value: string;
  text_delivery: string;
  text_pickup: string;
  setup_time: string;
  icon_bottom: string;
}

export interface userAddressSearch {
	latitude: number;
	longitude: number;
	state: string;
	city: string;
	district: string;
	street: string;
	number: string;
}

export interface additionalAddressInfoProps {
	address: userAddressSearch;
	onError: (message: string) => void;
	onSuccess: (address: UserAddressPayload) => void;
	onCloseRequest: () => void;
}

export interface UserAddress {
	id: number;
	name: string;
	zip_code: string;
	state: string;
	city: string;
	district: string;
	street: string;
	number: string;
	complement: null | string;
	reference: null | string;
	users_id: number;
	latitude: number;
	longitude: number;
	created_at: null | string;
	updated_at: null | string;
	primary: number;
	shipping?: number;
}

export interface StoreAddress {
	id: number;
	name: string;
	zip_code: string;
	state: string;
	city: string;
	district: string;
	street: string;
	number: string;
	complement: null | string;
	reference: null | string;
	informations_id: number;
	longitude: number;
	latitude: number;
	created_at: null | string;
	updated_at: null | string;
}

export interface PickUpProps {
	userAddress: UserAddress[];
	setLoading: Dispatch<SetStateAction<boolean>>;
	onPickupChange: (value: number, free: boolean) => void;
	onAddNewAddress: () => void;
}

export interface PickUpAtStoreProps {
	storeAddress: StoreAddress[]
}

export interface User {
	id: number;
	name: string;
	type?: string;
	cpf?: string;
	email?: string;
	adress?: Address;
	cellphone?: string;
	carts_id: number;
}

export interface CartItemPayload {
	carts_id: number
	cart_items: [
		{amount: number, products_id: number}
	]
}

export interface useLocationProps {
	onLocationError: (errorMessage: string) => void;
}

export interface UserContextData {
	user: User | null;
	logIn: (user: User, token: string) => void;
	deviceToken: string | null;
	isLogged: boolean;
	shortName: string;
	fullAddress: string | null;
	logOut: () => void;
	googleLogin: () => void;
	facebookLogin: () => void;
	changeOrderNotification: (orderId: number) => void;
	getOrderNotification: () => number;
}

export interface GlobalModalsContextProvider{
	children: ReactNode
}

export interface GlobalModalsContextData {
	modals: ModalsType,
	loadingModal: LoadingModalProps;
	setModalActive: (modal: ModalsType) => void;
	setModalInactive: (modal: ModalsType) => void;
	showAlert: (text: string, title?: string, onPress?: () => void) => void;
	openLoadingModal: (text?: string) => void;
	closeLoadingModal: () => void;
	alertModal: AlertModalProps;
	closeAlert: () => void;
}

export interface ModalConfirmationPayload {
	title: string;
	text: string;
	accept: () => void;
	decline: () => void;
}

export interface ModalAlertPayload {
	title: string;
	text: string;
}
export interface ModalsType {
	loading: {
		visible: boolean;
		text: string | null;
	}
	confirmation: {
		visible: boolean;
		payload: ModalConfirmationPayload | null;
	}
	alert: {
		visible: boolean;
		payload: ModalAlertPayload | null;
		onPress?: {(): void} | null;
	}
}

export interface LargeButtonParams {
	labelText: string;
	onPress: () => void
}

export interface CartItem {
	id: number;
	cart_items_id: number;
	price: number;
	quantity: number;
	name: string;
	description: string;
	max_amount: number;
	photo: string;
	categories: Category[] | null
}

export interface CartItemReturn {
	id: number;
	products_id: number;
	amount: string,
	created_at: string,
	name: string,
	description: string,
	price: string,
	photo: string,
	sale: number,
	max_amount: number,
	sale_date_expiration: null | string,
	categories: Category[] | null
}

export interface CartItemPayloadCategory {
	id: number,
	name: string,
	order: null | string,
	created_at: null | string,
	updated_at: null | string,
}

export interface CartItemProps {
	item: CartItem;
}

export interface CartContextData {
	cart: CartItem[];
	addToCart: (item: Products | CartItem, quantity: number, disableToast?: boolean) => void;
	decCart: (number: number) => void;
	removeCartItem: (id: number) => void;
	resetCart: () => {};
	totalPrice: number;
	rebuy: (items: OrderItemDetails[]) => void;
	updateItemInCart: (cartItemID: number, quantity: number, onSuccess: () => void) => void;
	loadCartItems: (cartId: number) => void;
}

export interface CartContextProviderProps {
	children?: ReactNode;
}

export interface RemoveItemIconProps {
	onClick: () => void
}

export interface InputProps {
	marginTop?: number;
	label: string;
	placeholder: string;
	isSecure?: boolean
	isCvv?: boolean
	onBlur?: {(): void} | null;
	onFocus?: { (): void} | null;
	value: string,
	setValue: Dispatch<SetStateAction<string>>,
	autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined,
	keyboardType?: KeyboardType;
	maskedType?: TextInputMaskTypeProp | null;
	labelBold?: boolean;
	editable?: boolean;
	isBirthday?: boolean;
	isValidate?: boolean;
	maxLength?: undefined | number;
	autoFocus?: boolean;
	withBorder?: boolean;
	isPassword?: boolean;
	notSafe?: boolean;
}

export interface SocialLoginButtonProps {
	type: 'Facebook' | 'Google' | 'Apple';
	bgColor: string;
	textColor: string;
	iconColor: string;
	onPress: () => void;
}

export interface CheckBoxInputProps {
	label: string;
	boldLabel: string;
	value: boolean;
	setValue: Dispatch<SetStateAction<boolean>>
	onPress?: () => void;
}

export interface BackButtonProps {
	onPress: () => void;
	position?: 'absolute' | 'relative';
}

export interface ButtonProps {
	label: string;
	onPress: () => void;
}

export interface MenuOtionProps {
	label: string;
	iconName: string;
	onPress: () => void;
}

export interface BackHeaderProps {
	label: string;
	boldLabel?: string;
	onClose: () => void;
}

export interface Order {
	id: number;
	delivery_type: number;
	note: string | null;
	total: number;
	cpf: string;
	cellphone: string;
	delivery_hour: string;
	adress_history: string;
	shipping: number;
	payment_type: number;
	users_id: number;
	orders_status_id: number;
	payments_methods_id: number;
	payment_id: number | null;
	created_at: string;
	updated_at: string | null;
	rating_app: number | null;
	rating_buy: number | null;
	rating_delivery: number | null;
	average: number | null;
	comment: string;
	orders_id: number;
	name: string;
	color: string;
}

export interface UserOrder {
	id: number;
	name: string;
	email: string;
	birthday: string;
	type: number;
	created_at: string;
	updated_at: string | null;
}

export interface OrderRating {
	id?: 1;
	rating_app: number | null;
	rating_buy: number | null;
	rating_delivery: number | null;
	average: number | null;
	comment: string;
	orders_id: number;
	created_at?: string;
	updated_at?: string | null;
}

export interface OrderRatingPayload {
	rating_app: number;
	rating_buy: number;
	rating_delivery: number;
	average: string,
	comment: string,
	orders_id: number
}

export interface OrderStatus {
	id: number;
	name: string;
	color: string;
	created_at: string | null;
	updated_at: string | null;
}

export interface PaymentMethod {
	id: number;
	name: string;
	created_at: string | null;
	updated_at: string | null;
}

export interface OrderDetails {
	order: Order;
	user: UserOrder;
	rating: OrderRating | null;
	orders_status: OrderStatus;
	payment_method: PaymentMethod;
	card?: Card;
	products: CartItem[];
}

export interface PagesProps {
	navigation: StackNavigationProp<any>;
}

export interface ProductDetailsPageProps {
	navigation: StackNavigationProp<any>;
	route: RouteProp<{ params: { item: Products, quantity?: number, cartsId?: number }}, 'params'>
}

export interface OrderDetailsPageProps {
	navigation: StackNavigationProp<any>;
	route: RouteProp<{ params: { orderId: number }}, 'params'>
}

export interface PaymentButtonProps {
	isActive: boolean;
	onPress: () => void;
	leftIconName?: string | null;
	rightIconName: string ;
	label: string;
	hasButton?: boolean | null;
	secondaryLabel?: string | null;
	thirdLabel?: string | null;
	rightIconBtn?: { (): void} | null;
}

export interface SearchAddressModalParams {
	onSubmit: (address: UserAddress) => void;
	isVisible: boolean;
	onRequestClose: () => void;
	editableAddress: EditableAddress | null,
}

export interface PaymentContextData {
	address: Address | null;
	setAddress: Dispatch<SetStateAction<Address | null>>;
	deliveryType: number | null;
	setDeliveryType: Dispatch<SetStateAction<number | null>>;
	paymentType: number | null;
	setPaymentType: Dispatch<SetStateAction<number | null>>;
	setCard: Dispatch<SetStateAction<SavedCard | null>>;
	card: SavedCard | null;
	formOfPayment: number | null;
	setFormOfPayment: Dispatch<SetStateAction<number | null>>;
	moneyChange: string;
	setMoneyChange: Dispatch<SetStateAction<string>>;
	verifyTypePaymentComplete: () => boolean;
	verifyDeliveryType: () => boolean;
	additionalInfos: AdditionalInfos | null;
	setAdditionalInfos: Dispatch<SetStateAction<AdditionalInfos | null>>;
	submitOrder: (onSuccess: (protocol: string) => void) => void;
	setShippingValue: (value: number | null) => void;
	shipping: number | null;
	cardNumber: string;
	setCardNumber: Dispatch<SetStateAction<string>>;
}

export interface ModalConfirmedProps {
	protocol: string;
	text?: string;
}

export interface PaymentContextProvider {
	children: ReactNode
}

export interface SavedCard {
	id: number;
	cvv: string;
}

export interface OrderPayload {
	adress_id : number | null;
	delivery_type : number;
	cellphone : string;
	payments_methods_id : number | null;
	payment_type : number;
	cpf : string;
	note : string;
	change: number;
	billing_info?: null | BillingInfo
	saved_card: null | SavedCard;
	birthday: string;
}

export interface CardPayload {
	users_id : number,
	card_name : string,
	holder_name : string,
	number : string,
	expiration_month : string,
	expiration_year : string,
}

export interface EditCardPayload {
	card_name : string,
	holder_name : string,
	number : string,
	expiration_month : string,
	expiration_year : string,
}

export interface UserCard {
	card_name: string;
	created_at: string | null;
	expiration_month: number;
	expiration_year: number;
	holder_name: string;
	id: number;
	number: number;
	updated_at: string | null;
	users_id: number;
	cvv?: string;
}

export interface OnlineTypeProps {
	setIsLoading: Dispatch<SetStateAction<boolean>>;
	onAdd: (userCard: UserCard) => void;
	onEdit: (userCard: UserCard) => void;
	cards: UserCard[];
}

export interface BillingInfo {
	credit_card: {
		holder_name: string;
		number: string;
		cvv: number;
		expiration_month: number | string;
		expiration_year: number | string;
	}
}

export interface AddressModalProps {
	isVisible: boolean;
	address: UserAddress | null;
	onCloseRequest: () => void;
	onSubmitPress: (address: UserAddress) => void;
}

export interface EditableAddress {
	editAddress: string;
	userAddressId: number;
}

export interface Card {
	id: number;
	nickname: string;
	holderName: string;
	cpf: string;
	number: string;
	cvv: number;
	validate: string;
}

export interface MaskedInputProps {
	maskedType: TextInputMaskTypeProp;
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
}

export interface InsertCardModalProps {
	card: UserCard | null;
	onCloseRequest: () => void;
	onSubmit: (card: Card) => void;
}

export interface MultilineInputProps {
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
	placeholder: string;
	label: string;
}

export interface AdditionalInfos {
	birthDate: string;
	cpf: string;
	phoneNumber: string;
	comments?: string;
}

export interface OrderBoxProps {
	title: string;
	value: string;
}

export interface OrderItemProps {
	orderItem: Order
}

export interface RateProps {
	rate: number | null;
	orderId: number;
	rating: OrderRating
}

export interface OrderItemDetails {
	id: number,
	product_name: string,
	price: number,
	amount: number,
	max_amount: null | number,
	unity: null | number,
	orders_id: number,
	sale: number,
	created_at: null | string,
	updated_at: null | string,
	products_id: number,
	ean: null | string,
	name: string,
	description: string,
	photo: string,
	sale_date_expiration: string | null,
	last_price: null | number | string,
	deleted_at: null | string
	cart_items_id?: number;
}

export interface OrderProductItemProps {
	item: OrderItemDetails
}

export interface EvaluatePageProps {
	navigation: StackNavigationProp<any>;
	route: RouteProp<{ params: {
		isRated?: boolean;
		orderId: number;
		rating: OrderRating | null;
	}}, 'params'>
}

export interface PickerBoxOptions {
	label: string;
	value: number;
}

export interface PickerBoxProps {
	label: string;
	value: number | null;
	setValue: Dispatch<SetStateAction<number | null>>;
	options: PickerBoxOptions[];
	disabled?: boolean;
}

export interface OrdersContextData {
	orders: Order[];
	changeOrderRate: (orderId: number, rate: number) => void;
	getOrderDetails: (orderId: number) => void;
	orderDetails: OrderDetails | null;
	isLoadingOrders: boolean;
	submitRating: (rating: OrderRatingPayload, onSuccess: () => void) => void;
	loadingItems: boolean;
	orderItems: OrderItemDetails[];
	cancelOrder: (orderId: number, payment_id: number | null) => void;
	loadOrders: () => void;
}

export interface OrdersContextProviderProps {
	children: ReactNode
}

export interface ProductsContextProviderProps {
	children: ReactNode
}

export interface ProductsContextData {
	products: Products[];
	promotions: PromotionsByCategories[];
	highlightsProducts: Products[];
	getFilteredProducts: (categoriesId: number, productName: string) => void;
	getAllProducts: () => void;
	isLoadingProducts: boolean;
}

export interface Help {
	id: number;
	isActive: boolean;
	question: string;
	aswner: string;
}

export interface HelpOption {
	item: Help;
	onPress: (id: number) => void;
}

export interface SubtitleProps {
	label: string;
}

export interface PromotionsByCategories {
	id: number,
	name: string,
	products: Products[]
}

export interface CategoriesContextProviderProps {
	children: ReactNode
}

export interface InformationsContextProviderProps {
	children: ReactNode
}

export interface CategoriesContextData {
	categories: Category[];
}

export interface InformationsContextData {
	informations: Informations | null;
	userAddInformations: UserAdditionalInfos | null;
	loadInformations: () => void;
	loadAdditionalInformations: (userId: number) => void;
}

export interface LoadingModalProps {
	visible: boolean;
	text: string | null;
}

export interface OrderNotification {
	codParams: string;
	vibrate: string;
}

export interface AlertModalProps {
	visible: boolean;
	payload: ModalAlertPayload | null;
	onPress?: {(): void} | null;
}
