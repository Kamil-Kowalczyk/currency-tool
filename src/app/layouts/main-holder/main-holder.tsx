import { CurrencyDataContextProvider } from '../../contexts/currency-data-context/currency-data-context';
import styles from './main-holder.module.scss';
import Router from '../../router';

export function MainHolder() {
  return (
    <div className='container flex-fill'>
      <CurrencyDataContextProvider>  
        <Router/>
      </CurrencyDataContextProvider>
    </div>
  )
}

export default MainHolder;
