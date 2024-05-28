import { Currency } from "../models/currency-model"

export enum SortType {
    ASC,
    DESC,
    NONE
}

export enum SortBy {
    CODE,
    NAME,
    RATE
}

export type CurrencyComparator = (a: Currency, b: Currency) => number

export const calculateRate = (firstCur: Currency, secondCur: Currency) => {
    let calculatedRate = firstCur.rate / secondCur.rate
    return calculatedRate
}

export const rateAscComparator = (a: Currency, b: Currency) => {
    if (a === undefined && b === undefined) return 0
    if (a === undefined) return 1
    if (b === undefined) return -1
    
    return a.rate - b.rate
}

export const codeAscComparator = (a: Currency, b: Currency) => {
    if (a === undefined && b === undefined) return 0
    if (a === undefined) return 1
    if (b === undefined) return -1

    if (a.code > b.code)
        return 1

    if (a.code < b.code)
        return -1

    return 0
}

export const nameAscComparator = (a: Currency, b: Currency) => {
    if (a === undefined && b === undefined) return 0
    if (a === undefined) return 1
    if (b === undefined) return -1

    let nameA = a.name.toLowerCase()
    let nameB = b.name.toLowerCase()

    if (nameA > nameB)
        return 1

    if (nameA < nameB)
        return -1

    return 0
}

export const sortCurTable = (table: Currency[], sortBy: SortBy = SortBy.NAME, sortType: SortType = SortType.ASC) => {
    if (table.length < 2 || table === undefined) return table
    if (sortType == SortType.NONE) return table

    let sortedTable = [...table]
    let comparator: CurrencyComparator

    switch (sortBy) {
        case SortBy.CODE:
            comparator = codeAscComparator
            break;
        case SortBy.NAME:
            comparator = nameAscComparator
            break;
        case SortBy.RATE:
            comparator = rateAscComparator
            break;
    }

    sortedTable.sort(comparator)

    if (sortType == SortType.DESC)
        sortedTable.reverse()

    return sortedTable
}