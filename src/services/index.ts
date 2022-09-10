import axios, { AxiosInstance } from 'axios'
import productsServices from './products'
import usersServices from './user'
import categoriesServices from './categories'
import ordersServices from './orders'
import ratingServices from './rating'
import cartServices from './cart'
import addressServices from './address'
import informationsServices from './informations'
import cardServices from './card'

const isProd = process.env.NODE_ENV === 'production';
const ngrokUrl = 'https://5304-164-163-18-33.ngrok.io';

export const httpClient = <AxiosInstance & {headers: {accept: string, Authorization: string}}>axios.create({
	baseURL: (isProd) ? 'https://api.oasisdistribuidora.com.br/api' : ngrokUrl+'/api',
	headers: {
		accept: 'application/json'
	}
})

export const setAuthorizationToken = (token: string) => {
	httpClient.defaults.headers.Authorization = `Bearer ${token}`
}

export default {
	products: productsServices(httpClient),
	users: usersServices(httpClient),
	categories: categoriesServices(httpClient),
	orders: ordersServices(httpClient),
	rating: ratingServices(httpClient),
	cart: cartServices(httpClient),
	address: addressServices(httpClient),
	information: informationsServices(httpClient),
	card: cardServices(httpClient)
}
