import { cpf } from 'cpf-cnpj-validator'
import jwtDecode, { JwtPayload } from 'jwt-decode'
import Toast from 'react-native-toast-message'
import { User, userAddressSearch } from '../interfaces'

export function formatPrice (value: number | string): string {
	if (typeof (value) === 'string') {
		return parseFloat(value).toFixed(2).toString().replace('.', ',')
	}

	return value.toFixed(2).toString().replace('.', ',')
}

export function telMask (tel: string): string {
	let r = tel.replace(/\D/g, '')
	r = r.replace(/^0/, '')
	if (r.length > 10) {
		r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, '($1) $2-$3')
	} else if (r.length > 5) {
		r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, '($1) $2-$3')
	} else if (r.length > 2) {
		r = r.replace(/^(\d\d)(\d{0,5})/, '($1) $2')
	} else {
		r = r.replace(/^(\d*)/, '($1')
	}
	return r
}

export function validateEmail (email: string): boolean {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return re.test(String(email).toLowerCase())
}

export function testCreditCardNumber (creditCardNumber: string) {
	const re = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/
	return re.test(creditCardNumber)
}

export function validateCreditCard (number: string, cvv: string, expirationDate: string): boolean {
	if (testCreditCardNumber(number.replace(/\s/g, '')) && cvv.length >= 3 && expirationDate.length === 5) {
		const expirationSplitted = expirationDate.split('/')
		const month = Number(expirationSplitted[0])
		if (month <= 12 && month > 0) return true
		else return false
	} else {
		return false
	}
}

export function validateCPF (val: string) {
	return cpf.isValid(val)
}

function leapYear (year: number) {
	return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)
}

function monthHas31Days (month: number) {
	switch (month) {
		case 1:
			return true
		case 3:
			return true
		case 5:
			return true
		case 7:
			return true
		case 8:
			return true
		case 10:
			return true
		case 12:
			return true
		default:
			return false
	}
}

export function birthdayFormat (timestamp: string) {
	let tempDate: string | Date = ''
	if (timestamp.includes(' ')) {
		tempDate = new Date(timestamp.replace(' ', 'T'))
	} else {
		tempDate = new Date(timestamp)
	}

	const day = tempDate.getDate()
	const month = (tempDate.getMonth() + 1).toString().padStart(2, '0')
	const year = tempDate.getFullYear().toString()
	return `${(day + 1).toString().padStart(2, '0')}/${month}/${year}`
}

export function validateBirthday (date: string) {
	// const splited = val.split('/')
	// const day = Number(splited[0])
	// const month = Number(splited[1])
	// const year = Number(splited[2])
	// const birthday = new Date(year, month - 1, day)
	// const currentDay = new Date()

	// if ((day <= 31 && day > 0) && (month <= 12 && month > 0) && (birthday <= currentDay)) {
	// 	if (day === 29 && month === 2) {
	// 		return leapYear(year)
	// 	} else if (day === 31) {
	// 		return monthHas31Days(month)
	// 	} else {
	// 		return true
	// 	}
	// } else {
	// 	return false
	// }

	const year = new Date().getFullYear();
    let month:string | number = new Date().getMonth() + 1;
    let day:string | number = new Date().getDate();
    month = month < 10 ? '0'+month : month;
    day = day < 10 ? '0'+day : day;

    let yearValidate = false;
    if(date.split('/')[2] && date.split('/')[2].length === 4) {
        if (Number(date.split('/')[2]) > (year - 110) && Number(date.split('/')[2]) <= year) {
            yearValidate = true;
        }
    }
    const monthValidate = Number(date.split('/')[1]) <= 12;
    let dayValidate = Number(date.split('/')[0]) <= 31;
	if (dayValidate && (Number(date.split('/')[0]) === 29 && Number(date.split('/')[1]) === 2)) {
		dayValidate = leapYear(year);
	};
	const fullDateValidate = date.length === 10 ? true : false;

    let dateValidate = false;
    const currentDate = `${day}/${month}/${year}`;
    let arrayDate = [date, currentDate];
    arrayDate = arrayDate.sort( (a, b) => Number(a.split('/')[0]) - Number(b.split('/')[0]) );
    arrayDate = arrayDate.sort( (a, b) => Number(a.split('/')[1]) - Number(b.split('/')[1]) );
    arrayDate = arrayDate.sort( (a, b) => Number(a.split('/')[2]) - Number(b.split('/')[2]) );
    dateValidate = arrayDate[1] === date ? false : true;
	
    const birthdayValidate = (yearValidate && monthValidate && dayValidate && fullDateValidate && dateValidate) ? true : false;
    return birthdayValidate;
}

export function isOlder18 (date: string) {
	const [day, month, year] = date.split('/')
	const birthday = new Date(`${year}/${month}/${day}`)
	const current = new Date()
	let diff = (current.getTime() - birthday.getTime()) / 1000
	diff = diff / (60 * 60 * 24)
	diff = Math.abs(diff / 365.25)
	return diff >= 18
}

export function showSuccessToast (text1: string, text2: string) {
	Toast.show({
		position: 'top',
		type: 'success',
		text1: text1,
		text2: text2,
		autoHide: true,
		visibilityTime: 6000
	})
}

export function showErrorToast (text1: string, text2: string) {
	Toast.show({
		position: 'top',
		type: 'error',
		text1: text1,
		text2: text2,
		autoHide: true,
		visibilityTime: 6000
	})
}

export function dateFormat (timestamp: string) {
	let tempDate: string | Date = ''
	if (timestamp.includes(' ')) {
		tempDate = new Date(timestamp.replace(' ', 'T'))
	} else {
		tempDate = new Date(timestamp)
	}

	const day = tempDate.getDate().toString().padStart(2, '0')
	const month = (tempDate.getMonth() + 1).toString().padStart(2, '0')
	const year = tempDate.getFullYear().toString()
	return `${day}/${month}/${year}`
}

export function getLabelRate (rate: Number) {
	if (rate > 0 && rate <= 3) {
		return 'Muito Insatisfeito'
	} else if (rate > 3 && rate <= 5) {
		return 'Insatisfeito'
	} else if (rate > 5 && rate <= 7) {
		return 'Regular'
	} else if (rate > 7 && rate <= 9) {
		return 'Satisfeito'
	} else {
		return 'Muito Satisfeito'
	}
}

export function decodeJWT (token: string) {
	return jwtDecode<JwtPayload & { usr: User}>(token)
}

export function validateAdditionalAddressInfo (street: string, city: string, number: string, district: string) {
	if (street.length > 0 && city.length > 0 && number.length > 0 && district.length > 0) {
		if (city === 'Poços de Caldas' || city === 'poços de caldas' || city === 'Pocos de Caldas' || city === 'pocos de caldas') {
			return { success: true, message: null }
		} else {
			return { success: false, message: "Não fazemos entrega fora de Poços de Caldas" }
		}
	} else {
		if (street.length === 0) return { success: false, message: 'Preencha o nome da rua' }
		if (city.length === 0) return { success: false, message: 'Preencha o nome da cidade' }
		if (number.length === 0) return { success: false, message: 'Preencha o número da residência' }
		if (district.length === 0) return { success: false, message: 'Preencha o nome do bairro' }

		return { success: false, message: 'Não foi possível cadastrar seu endereço' }
	}
}

export function mountUserAddressObj (geocodeResponse: any) {
/*
	administrative_area_level_2 = city
	administrative_area_level_1 = country
	route = street
	political = district
*/

	const addressTemp: userAddressSearch = {
		number: '',
		street: '',
		district: '',
		city: '',
		state: '',
		latitude: 0,
		longitude: 0
	}

	addressTemp.latitude = geocodeResponse.geometry.location.lat
	addressTemp.longitude = geocodeResponse.geometry.location.lng

	geocodeResponse.address_components.map((component: any) => {
		if (component.types) {
			switch (component.types[0]) {
				case 'street_number':
					addressTemp.number = component.long_name
					break
				case 'route':
					addressTemp.street = component.long_name
					break
				case 'political':
					if (component.types[2] && component.types[2] === 'sublocality_level_1') {
						addressTemp.district = component.long_name
					}
					break
				case 'administrative_area_level_2':
					addressTemp.city = component.long_name
					break
				case 'administrative_area_level_1':
					addressTemp.state = component.long_name
					break
			}
		}
	})
	return addressTemp
}

export function maskedCreditCardNumber (cardNumber: string | number) {
	const cardNumberString = cardNumber.toString()
	let splitedCardNumber: String[] = [];
	let stringToAddInCard: String = '';
	for(let i = 0; i < 17; i++){
		stringToAddInCard += cardNumberString[i];
		if((i+1) % 4 == 0){
			splitedCardNumber.push(stringToAddInCard);
			stringToAddInCard = '';
		}		
	}
	
	if (splitedCardNumber.length === 4) {
		return `${splitedCardNumber[0]} **** **** ${splitedCardNumber[3]}`
	} else {
		return `${cardNumberString.substring(0, 4)} **** **** ${cardNumberString.substring(12, 4)}`
	}
}