import { Currency } from 'src/app/contexts/currency-data-context/models/currency-model';
import styles from './currency-select.module.scss';
import ReactSelect, { SingleValue, StylesConfig } from 'react-select';

export interface CurrencySelectProps {
  data: Currency[],
  value: number,
  onChange: (value: SingleValue<SelectOption>) => void,
}

export interface SelectOption {
  value: number;
  currency: Currency
}

const selectStyles: StylesConfig<SelectOption> = {
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

const selectOptionLabel = (option: SelectOption) => (
  <div className='d-flex h-100'>
    <div className='d-inline-flex my-auto w-100 justify-content-left'>
      <img className={`${styles.image} my-auto ms-1 me-1`} 
        src={option.currency.imageSrc} 
        alt={`${option.currency.code.toLowerCase()}.png`}
      />
      <p className={`${styles.codeSection} my-auto text-white`}>{option.currency.code}</p>
    </div>
  </div>
)

export function CurrencySelect({data, value, onChange}: CurrencySelectProps) {
  const options: SelectOption[] = data.map((currency, index) => ({
    value: index,
    currency: currency
  }))

  return (
    <div className={`${styles.holder} d-inline-flex w-100`}>
      <ReactSelect 
        className='w-100 text-center'
        styles={selectStyles}
        isMulti={false}
        options={options}
        value={options[value]}
        onChange={onChange}
        noOptionsMessage={() => ("Brak waluty")}
        getOptionValue={(option) => option.currency.code}
        formatOptionLabel={selectOptionLabel}
      />
    </div>
  );
}

export default CurrencySelect;
