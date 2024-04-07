import styles from './calculator.module.scss';

import { useState } from "react";
import { useCurrencyContext } from '../../contexts/currency-data-context/currency-data-context';
import AmountInput from './amount-input/amount-input';
import CurrencySelect from './currency-select/currency-select';
import { Currency } from 'src/app/contexts/currency-data-context/models/currency-model';

export interface CalculatorFormProps {
    currencyTable: Currency[]
}

function CalculatorForm({currencyTable} : CalculatorFormProps) {

    const [amount, setAmount] = useState<number>(0)
    const [hasFirstChanged, setHasFirtsChanged] = useState<boolean>(false)
    const [firstCur, setFirstCur] = useState<number>(0)
    const [secondCur, setSecondCur] = useState<number>(0)

    let firstAmount: number
    let secondAmount: number
    let rate: number = calculateRate()
    if (hasFirstChanged) {
        firstAmount = amount
        secondAmount = amount * rate
    } else {
        secondAmount = amount
        firstAmount = amount / rate
    }

    function calculateRate(): number {
        let calculatedRate = currencyTable[firstCur].rate / currencyTable[secondCur].rate
        return calculatedRate
    }

    function handleAmountChange(event: React.ChangeEvent<HTMLInputElement>, firstChanged: boolean) {
        event.preventDefault()
        if (event.target.value == "")
            setAmount(0)
        else
            setAmount(parseInt(event.target.value))
        setHasFirtsChanged(firstChanged)
    }

    return (
        <form>
            <div className="row">
                <div className="col text-center">
                    <CurrencySelect data={currencyTable} name={'firstCurrency'} 
                        onChange={e => {
                                setFirstCur(parseInt(e.target.value))
                                setHasFirtsChanged(true)
                            }
                        }/>
                </div>
                <div className="col text-center">
                    <CurrencySelect data={currencyTable} name={'secondCurrency'} 
                        onChange={e => {
                                setSecondCur(parseInt(e.target.value))
                                setHasFirtsChanged(false)
                            }
                        }/>
                </div>
            </div>
            <div className="row">
                <div className="col text-center">
                    <h2 className="display-2 text-white">≈</h2>
                </div>
            </div>
            <div className="row">
                <div className="col text-center">
                    <AmountInput name={'firstAmount'} value={firstAmount} 
                        onChange={e => handleAmountChange(e, true)}/>
                </div>
                <div className="col text-center">
                    <AmountInput name={'secondAmount'} value={secondAmount} 
                        onChange={e => handleAmountChange(e, false)}/>
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