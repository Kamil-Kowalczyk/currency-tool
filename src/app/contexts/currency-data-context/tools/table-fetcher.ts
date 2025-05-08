import { Currency } from "../models/currency-model";
import { sortCurTable } from "./currency-tools";

export const BASE_CURRENCY: Currency = {
    code: 'PLN',
    name: 'Polish Złoty',
    rate: 1,
    imageSrc: 'src/assets/country-icons/png/pln.png'
}

const translateNameToEng = (code: string) : string => {
    switch (code) {
        case 'THB':
          return 'Thai baht';
        case 'USD':
          return 'US dollar';
        case 'AUD':
          return 'Australian dollar';
        case 'HKD':
          return 'Hong Kong dollar';
        case 'CAD':
          return 'Canadian dollar';
        case 'NZD':
          return 'New Zealand dollar';
        case 'SGD':
          return 'Singapore dollar';
        case 'EUR':
          return 'Euro';
        case 'HUF':
          return 'Forint (Hungary)';
        case 'CHF':
          return 'Swiss franc';
        case 'GBP':
          return 'Pound sterling';
        case 'UAH':
          return 'Hryvnia (Ukraine)';
        case 'JPY':
          return 'Japanese yen';
        case 'CZK':
          return 'Czech koruna';
        case 'DKK':
          return 'Danish krone';
        case 'ISK':
          return 'Icelandic krona';
        case 'NOK':
          return 'Norwegian krone';
        case 'SEK':
          return 'Swedish krona';
        case 'RON':
          return 'Romanian leu';
        case 'BGN':
          return 'Bulgarian lev';
        case 'TRY':
          return 'Turkish lira';
        case 'ILS':
          return 'Israeli new shekel';
        case 'CLP':
          return 'Chilean peso';
        case 'PHP':
          return 'Philippine peso';
        case 'MXN':
          return 'Mexican peso';
        case 'ZAR':
          return 'South African rand';
        case 'BRL':
          return 'Brazilian real';
        case 'MYR':
          return 'Malaysian ringgit';
        case 'IDR':
          return 'Indonesian rupiah';
        case 'INR':
          return 'Indian rupee';
        case 'KRW':
          return 'South Korean won';
        case 'CNY':
          return 'Chinese yuan renminbi';
        default:
          return 'Currency code not recognized';
      }
}

export const fetchTable = () => {
    return  fetch("https://api.nbp.pl/api/exchangerates/tables/a/?format=json")
            .then(response => response.json())
            .then(data => {
                var processedData: Currency[] = [BASE_CURRENCY]
                data[0]['rates'].forEach((row: { [x: string]: any; }) => {
                    processedData.push({
                        code: row['code'], 
                        name: translateNameToEng(row['code']), 
                        rate: row['mid'],
                        imageSrc: `src/assets/country-icons/png/${row['code'].toLowerCase()}.png`
                    })
                });
                processedData = sortCurTable(processedData)
                return processedData.filter((value) => value.code != 'XDR')
            })
}
