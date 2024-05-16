import styles from './navbar.module.scss'
import NavItem from './nav-item/nav-item';
import { useLocation } from 'react-router';
import { useEffect } from 'react';

export function Navbar() {
  const location = useLocation()

  useEffect(() => {
    console.log(location)
  }, [location])

  return (
    <header className={`${styles.navContainer} container-fluid flex-column pt-2 pb-2`}>
      <div className='container'>
        <nav className='navbar navbar-expand'>
          <a className='navbar-brand text-white fw-bold fs-3'>Narzędzie walutowe</a>
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