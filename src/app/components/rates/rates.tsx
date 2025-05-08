import styles from './rates.module.scss';

import { useCurrencyContext } from "../../contexts/currency-data-context/currency-data-context";
import { Currency } from '../../contexts/currency-data-context/models/currency-model';
import IconButton from '../reusable/icon-button/icon-button';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { SingleValue } from 'react-select';
import { SortBy, SortType, calculateRate, sortCurTable } from '../../contexts/currency-data-context/tools/currency-tools';
import TextImage from '../reusable/text-image/text-image';
import CurrencySelect from '../calculator/currency-select/currency-select';
import { BASE_CURRENCY } from '../../contexts/currency-data-context/tools/table-fetcher';
import HistoryDialog from './history-dialog/history-dialog';

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
  showHistoryDialog: (currency: Currency) => void
  selectedCurrency: Currency
}

interface MainCurSelectorProps {
    curTable: Currency[]
    value: Currency
    onChange: (option: SingleValue<Currency>) => void
}

interface TableProps {
    curTable: Currency[]
    selectedCur : Currency
    showHistoryDialog: (currency: Currency) => void
}

function TableHeadCol({ colSpan, className, content, handleClick }: TableHeadColProps) {
    return (
        <th className={`${className.th} ${styles.yellowBg}`} colSpan={colSpan} onClick={handleClick}>
            <div className='d-flex'>
                <div className={`d-flex mx-auto`}>
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
        th: `${styles.borders} col-1 border border-3`,
        carets: {
            upper: '',
            lower: ''
        }
    }
    let byNameClassName = {
        th: 'col-3 border-3 border-top-0 border-bottom-3',
        carets: {
            upper: '',
            lower: ''
        }
    }
    let byRateClassName = {
        th: `${styles.borders} col-4 border border-3`,
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
            <tr className={`text-center ${styles.tableRow}`}>
                <TableHeadCol 
                    className={byCodeClassName}
                    content='Code'
                    handleClick={clickHandlers.byCode}
                />
                <TableHeadCol
                    className={byNameClassName}
                    content='Currency'
                    handleClick={clickHandlers.byName}
                />
                <TableHeadCol 
                    className={byRateClassName}
                    content='Mid exchange rate'
                    colSpan={2}
                    handleClick={clickHandlers.byRate}
                />
            </tr>
        </thead>
    )
}

function TableBody({ table, rate, showHistoryDialog, selectedCurrency }: TableBodyProps) {
    return (
        <tbody>
            {
                table.map((currency: Currency) => (
                    <tr className={`text-center text-white ${styles.tableRow}`} key={currency.code}>
                        <td className={`${styles.borders} col-1 align-middle border border-3`}>
                            <TextImage 
                                src={currency.imageSrc} 
                                alt={`${currency.code.toLowerCase()}.png`} 
                                text={`${currency.code} x 1`}
                                className={{image: 'me-2'}}
                            />
                        </td>
                        <td className='col-3 align-middle border border-3 border-top-0 text-capitalize'>{currency.name}</td>
                        <td className={`${styles.borders} col-2 align-middle border border-3`}>
                            <span>{(currency.rate * rate).toFixed(6)} {selectedCurrency.code}</span>
                        </td>
                        <td className={`${styles.borders} col-2 align-middle border border-3`}>
                            <button 
                                className={`btn ${styles.yellowBg} pt-2 pb-2`}
                                onClick={() => showHistoryDialog(currency)}
                            >
                                Exchange rate history
                            </button>
                        </td>
                    </tr>
                ))
            }
        </tbody>
    )
}

function Table({ curTable, selectedCur, showHistoryDialog  }: TableProps) {
    
    const [sortingType, setSortingType] = useState<SortType>(SortType.NONE)
    const [sortingBy, setSortingBy] = useState<SortBy>(SortBy.NAME)
    const [prevSortBy, setPrevSortBy] = useState<SortBy>(SortBy.NAME)

    let rate = calculateRate(BASE_CURRENCY, selectedCur)
    
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
                    table={sortCurTable(curTable, sortingBy, sortingType)
                        .filter((value) => value.code != selectedCur.code)} 
                    rate={rate}
                    showHistoryDialog={showHistoryDialog}
                    selectedCurrency={selectedCur}
                />
            </table>
        </div>
    );
}

function MainCurSelector({ curTable, value, onChange }: MainCurSelectorProps) {
    return (
        <div className='mt-2 mb-4 row'>
            <h5 className='text-center mb-4'>Choose the base currency</h5>
            <CurrencySelect 
                options={curTable} 
                value={value} 
                className={`${styles.currencySelect} mx-auto`}
                onChange={onChange}
            />
        </div>
    )
}

function Header() {
    return <h2 className='text-center m-4'>Currency exchange rates</h2>;
}

export function Rates() {
    const curTable = useCurrencyContext()
    const [selectedCur, setSelectedCur] = useState<Currency>(BASE_CURRENCY)
    const [targetCur, setTargetCur] = useState<Currency>(BASE_CURRENCY)
    const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false)

    const showHistoryDialog = (currency: Currency) => {
        setTargetCur(currency)
        setIsDialogVisible(true)
    }

    const handleDialogClose = () => {
        setIsDialogVisible(false)
    }
    
    return (
        <div className={` mx-auto p-4 mt-5 rounded-4 ${styles.holder}`}>
            <Header />
            {
                curTable.length > 0 ? (
                    <div>
                        <HistoryDialog 
                            initialCur={selectedCur} 
                            targetCur={targetCur}
                            show={isDialogVisible}
                            handleClose={handleDialogClose}
                        />
                        <MainCurSelector 
                            curTable={curTable} 
                            value={selectedCur} 
                            onChange={(option) => setSelectedCur(option ? option : BASE_CURRENCY)}
                        />
                        <Table 
                            curTable={curTable} 
                            selectedCur={selectedCur} 
                            showHistoryDialog={showHistoryDialog} 
                        />
                        
                    </div>
                ) : (
                    <p className='text-center'>Loading the data, please wait...</p>
                )
            }
        </div>
    );
}

export default Rates