import styles from './app.module.scss';
import { CurrencyDataContextProvider } from './contexts/currency-data-context/currency-data-context';
import { Link, Route, Routes } from 'react-router-dom';
import RatesPage from './components/rates-page/rates-page';
import HomePage from './components/home-page/home-page';
import CalculatorPage from './components/calculator-page/calculator-page';

interface NavigationItemParams {
  path: string,
  title: string,
}

function NavigationItem({path, title}: NavigationItemParams) {
  return (
    <li className='nav-item active me-2'>
      <Link className={`nav-link ${styles.navLink}`} to={path}>{title}</Link>
    </li>
  )
}

function Header() {
  return (
    <header className='container-fluid flex-column pt-2 pb-2'>
      <div className='container'>
        <nav className='navbar navbar-expand'>
          <a className='navbar-brand text-white'>Narzędzie walutowe</a>
          <div className='collapse navbar-collapse'>
            <ul className='navbar-nav' >
              <NavigationItem path={'/'} title={'Strona główna'} />
              <NavigationItem path={'/exchange-rates'} title={'Kursy walut'} />
              <NavigationItem path={'/calculator'} title={'Kalkulator'} />
            </ul>
          </div>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <div className='container mt-5'>
      <h6 className='text-start' >Autor: Kamil Kowalczyk</h6>
    </div>
  )
}

function Body() {
  return (
    <div className='container flex-fill'>
      <CurrencyDataContextProvider>  
        <Router/>
      </CurrencyDataContextProvider>
    </div>
  )
}

function Router() {
  return (
    <Routes>
      <Route path='/calculator' element={<CalculatorPage />} />
      <Route path='/exchange-rates' element={<RatesPage />} />
      <Route path='/' element={<HomePage />} />
    </Routes>
  )
}

export function App() {
  return (
    <div className={`${styles.app} vh-100 flex-column d-flex`}>
      <Header/>
      <Body />
      <Footer/>
    </div>
    
  );
}

export default App;
