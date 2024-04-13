import { Currency } from "../models/currency-model";

export const fetchTable = () => {
    return  fetch("https://api.nbp.pl/api/exchangerates/tables/a/?format=json")
            .then(response => response.json())
            .then(data => {
                var processedData: Currency[] = [{
                    code: 'PLN',
                    name: 'złoty polski',
                    rate: 1,
                    imageSrc: 'src/assets/country-icons/png/pln.png'
                }]
                data[0]['rates'].forEach((row: { [x: string]: any; }) => {
                    processedData.push({
                        code: row['code'], 
                        name: row['currency'], 
                        rate: row['mid'],
                        imageSrc: `src/assets/country-icons/png/${row['code'].toLowerCase()}.png`
                    })
                });
                processedData.pop()
                return processedData
            })
}
