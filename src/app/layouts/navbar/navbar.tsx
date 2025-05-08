import styles from './navbar.module.scss'
import NavItem from './nav-item/nav-item';
import { useLocation } from 'react-router';

export function Navbar() {
  const location = useLocation()

  return (
    <header className={`${styles.navContainer} sticky-top container-fluid flex-column pt-2 pb-2`}>
      <div className='container'>
        <nav className='navbar navbar-expand'>
          <a className='navbar-brand text-white fw-bold fs-3 d-flex align-items-center'>
            <div>
              <img className={`${styles.logo}`} src='/currency_tool.ico'/>
            </div>
            <div>
              Narzędzie walutowe
            </div>
            
          </a>
          <div className='collapse navbar-collapse'>
            <ul className='navbar-nav' >
              <NavItem 
                path={'/'} 
                title={'Strona główna'} 
                isCurrentPage={location.pathname === '/' ? true : false}
              />
              <NavItem 
                path={'/exchange-rates'}
                title={'Kursy walut'} 
                isCurrentPage={location.pathname === '/exchange-rates' ? true : false}
              />
              <NavItem 
                path={'/calculator'}
                title={'Kalkulator'} 
                isCurrentPage={location.pathname === '/calculator' ? true : false}
              />
            </ul>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar;