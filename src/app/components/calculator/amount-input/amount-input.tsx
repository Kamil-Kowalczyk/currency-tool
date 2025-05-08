import styles from './amount-input.module.scss';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef } from 'react';
import IconButton from '../../reusable/icon-button/icon-button';

export interface AmountInputProps {
  value: string
  min?: number | undefined
  onChange: (value: string) => void 
}

export function AmountInput({ value , min = undefined, onChange }: AmountInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const decrement = (val: string) => {
    let calculatedVal
    let parsedVal = parseFloat(val)

    if (min == undefined)
      calculatedVal = parsedVal - 1
    else
      calculatedVal = parsedVal > min ? parsedVal - 1 : min

    calculatedVal = Math.ceil(calculatedVal)
    return calculatedVal.toString()
  }

  const increment = (val: string) => {
    let calculatedVal = parseFloat(val) + 1
    calculatedVal = Math.floor(calculatedVal)
    
    return calculatedVal.toString()
  }

  const handleIncrement = () => {
    onChange(increment(inputRef.current? inputRef.current.value : ""))
  }

  const handleDecrement = () => {
    onChange(decrement(inputRef.current? inputRef.current.value : ""))
  }

  return (
      <div className={`${styles.holder} d-inline-flex w-100 `}>
        <input 
          type='number' 
          className={`${styles.input} form-control`}
          min={min} 
          value={value} 
          ref={inputRef}
          onChange={(e) => onChange(e.target.value)}
        />
        <div className={`${styles.buttonsHolder}`}>
          <div className={`${styles.buttonsInnerHolder}`}>
            <IconButton 
              icon={faCaretUp} 
              className={`${styles.incrementButton}`} 
              onClick={handleIncrement}
              
            />
            <IconButton 
              icon={faCaretDown} 
              className={`${styles.decrementButton}`}
              onClick={handleDecrement}
            />
          </div>
        </div>
      </div>
  )
}

export default AmountInput;