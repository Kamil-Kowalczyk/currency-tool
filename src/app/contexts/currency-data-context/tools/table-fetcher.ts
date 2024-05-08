import { Currency } from "../models/currency-model";
import { sortCurTable } from "./currency-tools";

export const BASE_CURRENCY: Currency = {
    code: 'PLN',
    name: 'złoty polski',
    rate: 1,
    imageSrc: 'src/assets/country-icons/png/pln.png'
}

export const fetchTable = () => {
    return  fetch("https://api.nbp.pl/api/exchangerates/tables/a/?format=json")
            .then(response => response.json())
            .then(data => {
                var processedData: Currency[] = [BASE_CURRENCY]
                data[0]['rates'].forEach((row: { [x: string]: any; }) => {
                    processedData.push({
                        code: row['code'], 
                        name: row['currency'], 
                        rate: row['mid'],
                        imageSrc: `src/assets/country-icons/png/${row['code'].toLowerCase()}.png`
                    })
                });
                processedData = sortCurTable(processedData)
                return processedData.filter((value) => value.code != 'XDR')
            })
}
