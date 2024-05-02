import styles from './rates.module.scss';

import { useCurrencyContext } from "../../contexts/currency-data-context/currency-data-context";
import { Currency } from '../../contexts/currency-data-context/models/currency-model';
import IconButton from '../reusable/icon-button/icon-button';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import CurrencySelect, { CurrencySelectOption } from '../calculator/currency-select/currency-select';
import { useEffect, useState } from 'react';
import { SingleValue } from 'react-select';
import { SortBy, SortType, calculateRate, sortCurTable } from '../../contexts/currency-data-context/tools/currency-tools';
import TextImage from '../reusable/text-image/text-image';

interface TableHeadColProps {
    colSpan?: number
    className: {
        th?: string
        carets?: {
            lower?: string
            upper?: string
        }
    }
    content: string
    handleClick: () => void

}

interface TableHeadProps {
    clickHandlers: {
        byCode: () => void,
        byName: () => void,
        byRate: () => void,
    }
    sortType: SortType
    sortBy: SortBy
}

interface TableBodyProps {
  table: Currency[]
  rate: number
  baseCurName: string
}

interface MainCurSelectorProps {
    curTable: Currency[]
    value: number
    onChange: (option: SingleValue<CurrencySelectOption>) => void
}

interface TableProps {
    curTable: Currency[]
}

function TableHeadCol({ colSpan, className, content, handleClick }: TableHeadColProps) {
    return (
        <th className={className.th} colSpan={colSpan} onClick={handleClick}>
            <div className='d-flex'>
                <div className={`${styles.thContainer} d-flex mx-auto`}>
                    <div className='my-auto'>
                        {content}
                    </div>
                    <div className={`${styles.sortCaretsHolder} my-auto `}>
                        <div>
                            <IconButton 
                                icon={faSortUp}
                                className={`${className.carets?.upper} ${styles.upperCaret}`}
                                isLongPress={false}
                            />
                        </div>
                        <div>
                            <IconButton
                                icon={faSortDown}
                                className={`${className.carets?.lower} ${styles.lowerCaret}`}
                                isLongPress={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </th>
    )
}

function TableHead({ clickHandlers, sortBy, sortType }: TableHeadProps) {
    let byCodeClassName = {
        th: `${styles.borders} col-1 bg-warning border border-3`,
        carets: {
            upper: '',
            lower: ''
        }
    }
    let byNameClassName = {
        th: 'col-3 bg-warning border-3 border-top-0 border-bottom-3',
        carets: {
            upper: '',
            lower: ''
        }
    }
    let byRateClassName = {
        th: `${styles.borders} col-4 bg-warning border border-3`,
        carets: {
            upper: '',
            lower: ''
        }
    }

    const properCaretsStyle = () => {
        let upper = ''
        let lower = ''
        if (sortType == SortType.ASC) {
            upper = `${styles.activeCaret}`
        } else if (sortType == SortType.DESC) {
            lower = `${styles.activeCaret}`
        }

        return {upper, lower}
    }

    switch (sortBy) {
        case SortBy.CODE:
            byCodeClassName.carets = properCaretsStyle()
            break;
        case SortBy.NAME:
            byNameClassName.carets = properCaretsStyle()
            break;
        case SortBy.RATE:
            byRateClassName.carets = properCaretsStyle()
            break;
    }

    return (
        <thead>
            <tr className='text-center'>
                <TableHeadCol 
                    className={byCodeClassName}
                    content='Kod'
                    handleClick={clickHandlers.byCode}
                />
                <TableHeadCol
                    className={byNameClassName}
                    content='Waluta'
                    handleClick={clickHandlers.byName}
                />
                <TableHeadCol 
                    className={byRateClassName}
                    content='Średni kurs'
                    colSpan={2}
                    handleClick={clickHandlers.byRate}
                />
            </tr>
        </thead>
    )
}

function TableBody({ table, rate, baseCurName }: TableBodyProps) {
    return (
        <tbody className='table-dark'>
            {
                table.map((currency: Currency) => (
                    <tr className='text-center' key={currency.code}>
                        <td className={`${styles.borders} col-1 align-middle border border-3`}>
                            <TextImage 
                                src={currency.imageSrc} 
                                alt={`${currency.code.toLowerCase()}.png`} 
                                text={currency.code}
                                className={{image: 'me-2'}}
                            />
                        </td>
                        <td className='col-3 align-middle border border-3 border-top-0'>{currency.name}</td>
                        <td className={`${styles.borders} col-2 align-middle border border-3`}>
                            <span>{(currency.rate * rate).toFixed(6)} {baseCurName}</span>
                        </td>
                        <td className={`${styles.borders} col-2 align-middle border border-3`}>
                            <button className='btn btn-warning'>Historia kursów</button>
                        </td>
                    </tr>
                ))
            }
        </tbody>
    )
}

function Table({ curTable }: TableProps) {
    const [selectedCurIndex, setSelectedCurIndex] = useState<number>(0)
    const [sortingType, setSortingType] = useState<SortType>(SortType.NONE)
    const [sortingBy, setSortingBy] = useState<SortBy>(SortBy.NAME)
    const [prevSortBy, setPrevSortBy] = useState<SortBy>(SortBy.NAME)
    
    useEffect(() => {
        console.log(sortingType, sortingBy)
    }, [sortingBy, sortingType])

    let rate = calculateRate(curTable[0], curTable[selectedCurIndex])
    
    if (sortingBy != prevSortBy) {
        setPrevSortBy(sortingBy)
        setSortingType(SortType.ASC)
    }

    const handleSortChange = (sortingBy: SortBy) => {
        setSortingBy(sortingBy)
        setSortingType((value) => value == SortType.ASC ? SortType.DESC : SortType.ASC)
    }

    const byCodeHandler = () => {
        handleSortChange(SortBy.CODE)
    }
    

    const byNameHandler = () => {
        handleSortChange(SortBy.NAME)
    }

    const byRateHandler = () => {
        handleSortChange(SortBy.RATE)
    }

    return (
        <div>
            <MainCurSelector 
                curTable={curTable} 
                value={selectedCurIndex} 
                onChange={(option) => setSelectedCurIndex(option ? option.value : 0)}
            />
            <table className={`table mb-0 ${styles.currencyTable}`}>
                <TableHead 
                    clickHandlers={{
                        byCode: byCodeHandler, 
                        byName: byNameHandler, 
                        byRate: byRateHandler
                    }}
                    sortBy={sortingBy}
                    sortType={sortingType}
                />
                <TableBody 
                    table={sortCurTable(curTable, sortingBy, sortingType).filter((value) => value.code != curTable[selectedCurIndex].code)} 
                    baseCurName={curTable[selectedCurIndex].code}
                    rate={rate}
                />
            </table>
        </div>
    );
}

function MainCurSelector({ curTable, value, onChange }: MainCurSelectorProps) {
    return (
        <div className='mt-2 mb-4 row'>
            <h5 className='text-center mb-4'>Wybierz walutę, dla której będą wyświetlane odpowiadające jej kursy</h5>
            <CurrencySelect 
                data={curTable} 
                value={value} 
                className={`${styles.currencySelect} mx-auto`}
                onChange={onChange}
            />
        </div>
    )
}

function Header() {
    return <h2 className='text-center m-4'>Kursy walut</h2>;
}

export function Rates() {
    const curTable = useCurrencyContext()
    
    return (
        <div className='col-9 mx-auto bg-dark p-4 mt-3'>
            <Header />
            {
                curTable.length > 0 ? (
                    <Table curTable={curTable} />
                ) : (
                    <p className='text-center'>Ładawanie danych, proszę czekać...</p>
                )
            }
        </div>
    );
}

export default Rates