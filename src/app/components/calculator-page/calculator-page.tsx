import styles from './calculator-page.module.scss';

import {  useEffect, useState } from "react";
import { useCurrencyContext } from '../../contexts/currency-data-context/currency-data-context';
import { Currency } from 'src/app/contexts/currency-data-context/models/currency-model';

interface CurrencySelectParams {
  data: Currency[],
  name: string,
  onChange: React.ChangeEventHandler<HTMLSelectElement>,
}

interface AmountInputParams {
  name: string,
  value: number,
  onChange: React.ChangeEventHandler<HTMLInputElement>,
}

function CurrencySelect({data, name, onChange}: CurrencySelectParams) {
    return (
        <div className="d-inline-flex w-75">
            <select className={`${styles.selectPill} form-select form-select-lg text-center rounded-pill ms-3 me-3`}
                name={name} onChange={onChange}>

                <option defaultChecked value={-1}>PLN</option>
                {(data.length > 0) && data.map((currency: Currency, index: number) => (
                  <option key={index} value={index}>{currency.code}</option>
                ))}
            </select>
        </div>
    );
}

function AmountInput({name, value, onChange}: AmountInputParams) {
    return (
        <div className="d-inline-flex w-75">
            <input type="number" className="form-control form-control-lg text-center rounded-pill ms-3 me-3"
                min={0} value={value} name={name} onChange={onChange}/>
        </div>
    )
}

function CalculatorForm() {
    const currenciesTable = useCurrencyContext();
    
    const [firstAmount, setFirstAmount] = useState<number>(0);
    const [secondAmount, setSecondAmount] = useState<number>(0);
    const [firstCurrency, setFirstCurrency] = useState<number>(-1);
    const [secondCurrency, setSecondCurrency] = useState<number>(-1);

    useEffect(() => {
        const rate = 1
        console.log("pierwszy kod")
        setSecondAmount(firstAmount * 2)
    }, [firstAmount, firstCurrency])

    useEffect(() => {
        console.log("drugi kod")
        setFirstAmount(secondAmount * 0.5)
    }, [secondAmount, secondCurrency])


    return (
        <form>
            <div className="row">
                <div className="col text-center">
                    <CurrencySelect data={currenciesTable} name={'firstCurrency'} 
                        onChange={e => setFirstCurrency(parseInt(e.target.value))}/>
                </div>
                <div className="col text-center">
                    <CurrencySelect data={currenciesTable} name={'secondCurrency'} 
                        onChange={e => setSecondCurrency(parseInt(e.target.value))}/>
                </div>
            </div>
            <div className="row">
                <div className="col text-center">
                    <h2 className="display-4 text-white">=</h2>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col text-center">
                    <AmountInput name={'firstAmount'} value={firstAmount} 
                        onChange={e => setFirstAmount(parseFloat(e.target.value))}/>
                </div>
                <div className="col text-center">
                    <AmountInput name={'secondAmount'} value={secondAmount} 
                        onChange={e => setSecondAmount(parseFloat(e.target.value))}/>
                </div>
            </div>
        </form>
    )
}

export function CalculatorPage() {
    return (
        <div className="container">
            <h2 className="text-center mb-4 mt-4">Kalkulator</h2>
            <div className={`container ${styles.calcContainer} col-xl-6 col-lg-7 col-md-10 col-sm-12 rounded-5`}>
                <div className="row h-100 w-100">
                    <div className="col my-auto">
                        <CalculatorForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CalculatorPage