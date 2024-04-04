import { createContext, useContext, useEffect, useState } from "react";
import { fetchTable } from "./tools/table-fetcher";
import { Currency } from "./models/currency-model";
import { ReactElement } from "react";

const CurrencyDataContext = createContext<Currency[]>([])

export function CurrencyDataContextProvider({children}: {children: ReactElement}) {
    const [table, setTable] = useState<Currency[]>([]);

    useEffect(() => {
        fetchTable().then(data => setTable(data));
    }, []);

    return (
        <CurrencyDataContext.Provider value={table}>
            {children}
        </CurrencyDataContext.Provider>
    );
}

export function useCurrencyContext() {
    const context = useContext(CurrencyDataContext);
    if (!context) {
        throw new Error("Context must be used within a Provider");
      }
    return context;
}