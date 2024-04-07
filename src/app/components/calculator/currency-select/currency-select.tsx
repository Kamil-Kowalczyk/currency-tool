import { Currency } from 'src/app/contexts/currency-data-context/models/currency-model';
import styles from './currency-select.module.scss';

export interface CurrencySelectProps {
  data: Currency[],
  name: string,
  onChange: React.ChangeEventHandler<HTMLSelectElement>,
}

export function CurrencySelect({data, name, onChange}: CurrencySelectProps) {
  return (
    <div className="d-inline-flex w-75">
      {/* <img className={styles.image} src='src/assets/country-icons/png/aud.png' /> */}
      <select className={`${styles.selectPill} form-select form-select-lg text-center rounded-pill ms-3 me-3`}
        name={name} onChange={onChange}>
        {
          data.map((currency: Currency, index: number) => (
            <option key={index} value={index}>
              {/* <img src={`src/assets/country-icons/png/${currency.code}.png`} /> */}
              {currency.code}
            </option>
          ))
        }
      </select>
    </div>
  );
}

export default CurrencySelect;
