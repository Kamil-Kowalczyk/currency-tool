import styles from './rates-page.module.scss';

import { useCurrencyContext } from "./../../contexts/currency-data-context/currency-data-context";
import { Currency } from '../../contexts/currency-data-context/models/currency-model';

interface TableBodyParams {
  data: Currency[]
}

function TableHead() {
    return (
        <thead className="sticky-top">
            <tr className="text-center">
                <th className="col-1 p-4 bg-warning border border-3 border-top-0 border-start-0 border-end-0">Kod</th>
                <th className="col-3 p-4 bg-warning border-3 border-top-0 border-bottom-3">Waluta</th>
                <th colSpan={2} className="col-4 p-4 bg-warning border border-3 border-top-0 border-start-0 border-end-0">Średni kurs</th>
            </tr>
        </thead>
    )
}



function TableBody({data}: TableBodyParams) {
    return (
        <tbody className="table-dark">
            {/* todo: images for currencies */}
            {data.map((currency: Currency, index: number) => (
                <tr className="text-center" key={index}>
                    <td className="col-1 align-middle border border-3 border-top-0 border-start-0 border-end-0">{currency.code}</td>
                    <td className="col-3 align-middle border border-3 border-top-0">{currency.name}</td>
                    <td className="col-2 align-middle border border-3 border-top-0 border-start-0 border-end-0">
                        <span className="">{currency.rate} PLN</span>
                    </td>
                    <td className="col-2 align-middle border border-3 border-start-0 border-end-0 border-top-0">
                        <button className="btn btn-warning">Historia kursów</button>
                    </td>
                </tr>
            ))}
        </tbody>
    )
}

function Table() {
    const currenciesTable: Currency[] = useCurrencyContext();
    
    return currenciesTable.length > 0 ? (
        <div>
            <table className={`table mb-0 ${styles.currencyTable}`}>
                <TableHead />
                <TableBody data={currenciesTable} />
            </table>
        </div>
    ) : (
        <div>
            <p className="text-center">Ładowanie danych, proszę czekać...</p>
        </div>
    );
}

function Header() {
    return <h2 className="text-center m-4">Kursy walut</h2>;
}

export function RatesPage() {
    return (
        <div className="col-8 mx-auto">
            <Header />
            <Table/>
        </div>
    );
}

export default RatesPage