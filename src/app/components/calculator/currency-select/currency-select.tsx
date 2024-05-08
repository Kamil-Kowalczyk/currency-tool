import { Currency } from 'src/app/contexts/currency-data-context/models/currency-model';
import styles from './currency-select.module.scss';
import ReactSelect, { SingleValue, StylesConfig } from 'react-select';
import TextImage from '../../reusable/text-image/text-image';

export interface CurrencySelectProps {
  options: Currency[],
  value: Currency,
  className?: string,
  onChange?: (option: SingleValue<Currency>) => void,
}

// export interface CurrencySelectOption {
//   value: number;
//   currency: Currency
// }

const selectStyles: StylesConfig<Currency> = {
  option: (styles) => ({
    ...styles,
    backgroundColor: '#2B2B2B',
    fontSize: '1.4rem',
    ":hover": {
      backgroundColor: '#404040'
    },
    color: 'white'
  }),
  menuList: (styles) => ({
    ...styles,
    backgroundColor: '#2B2B2B',
    maxHeight: '15rem'
  }),
  control: (styles) => ({
    ...styles,
    borderRadius: '50rem',
    fontSize: '1.4rem',
    minHeight: 'calc(1.5em + 1rem + calc(1px * 2))',
    paddingLeft: '0.25rem',
    backgroundColor: '#2B2B2B',
    borderColor: '#2B2B2B',
    border: '0',
    boxShadow: '0',
  }),
  input: (styles) => ({
    ...styles,
    color: 'white'
  }),
  noOptionsMessage: (styles) => ({
    ...styles,
    color: 'white'
  })
}

const selectOptionLabel = (option: Currency) => (
  <TextImage 
    src={option.imageSrc}
    alt={`${option.code.toLowerCase()}.png`}
    text={option.code}
  />
)

export function CurrencySelect({options, value, onChange, className}: CurrencySelectProps) {
  // const options: CurrencySelectOption[] = data.map((currency, index) => ({
  //   value: index,
  //   currency: currency
  // }))

  return (
    <div className={`${styles.holder} d-inline-flex ${className}`}>
      <ReactSelect 
        className='w-100 text-center'
        styles={selectStyles}
        isMulti={false}
        options={options}
        value={value}
        onChange={onChange}
        noOptionsMessage={() => ("Brak waluty")}
        //getOptionValue={(option) => option.currency.code}
        formatOptionLabel={selectOptionLabel}
      />
    </div>
  );
}

export default CurrencySelect;
