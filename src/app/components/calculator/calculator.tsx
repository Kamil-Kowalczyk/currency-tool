import styles from './calculator.module.scss';

import { useState } from "react";
import { useCurrencyContext } from '../../contexts/currency-data-context/currency-data-context';
import AmountInput from './amount-input/amount-input';
import CurrencySelect, { SelectOption } from './currency-select/currency-select';
import { Currency } from 'src/app/contexts/currency-data-context/models/currency-model';
import { SingleValue } from 'react-select';

export interface CalculatorFormProps {
    currencyTable: Currency[]
}

function CalculatorForm({ currencyTable } : CalculatorFormProps) {
    const [amount, setAmount] = useState<string>("1")
    const [hasFirstChanged, setHasFirtsChanged] = useState<boolean>(false)
    const [firstCur, setFirstCur] = useState<number>(0)
    const [secondCur, setSecondCur] = useState<number>(0)

    const calculateRate = () => {
        let calculatedRate = currencyTable[firstCur].rate / currencyTable[secondCur].rate
        return calculatedRate
    }

    const handleAmountChange = (value: string, firstChanged: boolean) => {
        setAmount(value)
        setHasFirtsChanged(firstChanged)
    }

    let firstAmount: string
    let secondAmount: string
    let rate: number = calculateRate()
    
    rate = calculateRate()
    if (firstCur == secondCur) {
        firstAmount = amount
        secondAmount = amount
    } else if (hasFirstChanged) {
        firstAmount = amount
        secondAmount = (parseFloat(amount) * rate).toFixed(2)
    } else {
        secondAmount = amount
        firstAmount = (parseFloat(amount) / rate).toFixed(2)
    }
    

    return (
        <form>
            <div className="row">
                <div className="col-6 text-center">
                    <CurrencySelect 
                        data={currencyTable} 
                        value={firstCur}
                        onChange={option => setFirstCur(option ? option.value : 0)}
                    />
                </div>
                <div className="col-6 text-center">
                    <CurrencySelect 
                        data={currencyTable} 
                        value={secondCur} 
                        onChange={option => setSecondCur(option ? option.value : 0)}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col text-center">
                    <h2 className="display-2 text-white">≈</h2>
                </div>
            </div>
            <div className="row">
                <div className="col text-center">
                    <AmountInput 
                        value={firstAmount} 
                        onChange={value => handleAmountChange(value, true)}
                        min={0}
                    />
                </div>
                <div className="col text-center">
                    <AmountInput 
                        value={secondAmount} 
                        onChange={value => handleAmountChange(value, false)}
                        min={0}
                    />
                </div>
            </div>
        </form>
    )
}

export function Calculator() {
    const currencyTable = useCurrencyContext();

    return (
        <div className="container h-100">
            <h2 className="text-center mb-4 mt-4">Kalkulator</h2>
            <div className={`container ${styles.calcContainer} col-xl-6 col-lg-7 col-md-10 col-sm-12 rounded-5`}>
                <div className="row h-100">
                    <div className="col my-auto mx-auto">
                        {
                            currencyTable.length > 0 ? (
                                <CalculatorForm currencyTable={currencyTable} />
                            ) : (
                                <p className="text-center">Ładowanie danych, proszę czekać...</p>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calculator