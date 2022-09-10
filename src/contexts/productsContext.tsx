import React, { createContext, useContext, useEffect, useState } from 'react'
import { Products, ProductsContextData, ProductsContextProviderProps, PromotionsByCategories } from '../interfaces'
import services from '../services'
import { GlobalModalsContext } from './globalModalsContext'

export const ProductsContext = createContext({} as ProductsContextData)

const ProductsProvider = ({ children }: ProductsContextProviderProps) => {
	const [products, setProducts] = useState<Products[]>([])
	const [highlightsProducts, setHighlightsProducts] = useState<Products[]>([])
	const [promotions, setPromotions] = useState<PromotionsByCategories[]>([])
	const { openLoadingModal, closeLoadingModal } = useContext(GlobalModalsContext)
	const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(false)

	const loadProducts = async () => {
		const response = await services.products.getBestSellers()
		if (!response.error) {
			setProducts(response.data)
		} else {
			setProducts([]);
			console.log(response.error)
		}
	}

	const loadPromotions = async () => {
		const response = await services.products.getPromotions()
		if (!response.error) {
			setPromotions(response.data)
		} else {
			console.log(response.error)
		}
	}

	const loadHighlightsProducts = async () => {
		const response = await services.products.getHighlightsProducts()
		if (!response.error) {
			setHighlightsProducts(response.data)
		} else {
			console.log(response.error)
		}
	}

	const getFilteredProducts = async (categoriesId: number, productName: string) => {
		setIsLoadingProducts(true)
		const response = await services.products.getFilterProducts(productName ?? null, categoriesId === 0 ? null : categoriesId)
		if (!response.error) {
			setProducts(response.data)
		} else {
			console.log(response.error)
			setProducts([])
		}
		setIsLoadingProducts(false)
	}

	const getAllProducts = async () => {
		setIsLoadingProducts(true)
		await loadProducts()
		setIsLoadingProducts(false)
	}

	useEffect(() => {
		const loadInitialData = async () => {
			openLoadingModal('Aguarde...')
			await loadProducts()
			await loadPromotions()
			await loadHighlightsProducts()
			closeLoadingModal()
		}

		loadInitialData()
	}, [])

	return (
		<ProductsContext.Provider value={{
			products,
			promotions,
			highlightsProducts,
			getFilteredProducts,
			getAllProducts,
			isLoadingProducts
		}}>
			{ children }
		</ProductsContext.Provider>
	)
}

export default ProductsProvider
