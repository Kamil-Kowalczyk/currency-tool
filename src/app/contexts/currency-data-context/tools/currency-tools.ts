import { Currency } from "../models/currency-model"

export type CurrencyComparator = (a: Currency, b: Currency) => number

export const calculateRate = (firstCur: Currency, secondCur: Currency) => {
    let calculatedRate = firstCur.rate / secondCur.rate
    return calculatedRate
}

export const rateAscComparator = (a: Currency, b: Currency) => {
    return a.rate - b.rate
}

export const rateDescComparator = (a: Currency, b: Currency) => {
    return b.rate - a.rate
}

export const codeAscComparator = (a: Currency, b: Currency) => {
    if (a.name > b.name)
        return 1

    if (a.name < b.name)
        return -1

    return 0
}

export const codeDescComparator = (a: Currency, b: Currency) => {
    if (a.name < b.name)
        return 1
    
    if (a.name > b.name)
        return -1

    return 0
}

export const nameAscComparator = (a: Currency, b: Currency) => {
    let nameA = a.name.toLowerCase()
    let nameB = b.name.toLowerCase()

    if (nameA > nameB)
        return 1

    if (nameA < nameB)
        return -1

    return 0
}

export const nameDescCopmparator = (a: Currency, b: Currency) => {
    let nameA = a.name.toLowerCase()
    let nameB = b.name.toLowerCase()

    if (nameA < nameB)
        return 1

    if (nameA > nameB)
        return -1

    return 0
}