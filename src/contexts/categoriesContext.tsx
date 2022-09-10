import React, { createContext, useEffect, useState } from 'react'
import { CategoriesContextData, CategoriesContextProviderProps, Category } from '../interfaces'
import services from '../services'

export const CategoriesContext = createContext({} as CategoriesContextData)

const CategoriesProvider = ({ children }: CategoriesContextProviderProps) => {
	const [categories, setCategories] = useState<Category[]>([])

	useEffect(() => {
		const loadCategories = async () => {
			const response = await services.categories.getAllCategories()
			if (!response.error) {
				const categoriesTemp = response.data
				setCategories(categoriesTemp.map((category: Category) => ({ ...category, checked: false })))
			} else {
				console.log(response.error)
			}
		}

		loadCategories()
	}, [])

	return (
		<CategoriesContext.Provider value={{
			categories
		}}>
			{children}
		</CategoriesContext.Provider>
	)
}

export default CategoriesProvider
