import { Currency } from "../models/currency-model";
import { BASE_CURRENCY } from "./table-fetcher";

export interface Rate {
    date: string,
    rate: number
}

export type Period = '1w' | '2w' | '1m' | '3m' | '6m' | '1y' 

const fetchRatesRange = (currency: Currency, period: Period) => {
    var startDate = ''
    var endDate = ''

    let today = new Date()
    let year =  today.getUTCFullYear()
    let month = today.getUTCMonth()
    let days = today.getUTCDate()

    endDate = `${year}-${month < 9 ? '0' + (month + 1) : (month + 1)}-${days <= 9 ? '0' + days : days}`

    let pastDate: Date

    switch (period) {
        case '1w':
            pastDate = new Date(today.setUTCDate(days - 7))
            break;
        case "2w":
            pastDate = new Date(today.setUTCDate(days - 14))
            break;
        case "1m":
            pastDate = new Date(today.setUTCMonth(month - 1))
            break;
        case "3m":
            pastDate = new Date(today.setUTCMonth(month - 3))
            break;
        case "6m":
            pastDate = new Date(today.setUTCMonth(month - 6))
            break;
        case "1y":
            pastDate = new Date(today.setUTCFullYear(year - 1))
            break;
    }

    year =  pastDate.getUTCFullYear()
    month = pastDate.getUTCMonth()
    days = pastDate.getUTCDate()

    startDate = `${year}-${month < 9 ? '0' + (month + 1) : (month + 1)}-${days <= 9 ? '0' + days : days}`

    return fetch(`http://api.nbp.pl/api/exchangerates/rates/a/${currency.code}/${startDate}/${endDate}/?format=json`)
        .then(response => response.json())
        .then(data => {
            var rates : Rate[] = []
        
            data['rates'].forEach((row: { [x: string]: any; }) => {
                rates.push({
                    date: row['effectiveDate'],
                    rate: row['mid']
                })
            });

            return rates
        })
}


export const getRatesRange = async(baseCur: Currency, targetCur: Currency, period: Period) => {
    var targetRates: Rate[] = []
    var calculatedRates: Rate[] = []
    var baseRates: Rate[] = []

    if (baseCur != BASE_CURRENCY) {
        baseRates = await fetchRatesRange(baseCur, period)
        if (targetCur == BASE_CURRENCY) {
            return baseRates
        }
        targetRates = await fetchRatesRange(targetCur, period) 
    } else {
        targetRates = await fetchRatesRange(targetCur, period) 
        baseRates = targetRates.map<Rate>((ra) => (
            {
                date: ra.date,
                rate: 1
            }
        ))
    }

    calculatedRates = baseRates.map<Rate>((ra, index) => (
        {
            date: ra.date,
            rate: parseFloat((ra.rate * (BASE_CURRENCY.rate / targetRates[index].rate)).toFixed(6))
        }
    ))

    return calculatedRates
}