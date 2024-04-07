import styles from './navbar.module.scss'
import NavItem from './nav-item/nav-item';

export function Navbar() {
  return (
    <header className={`${styles.navContainer} container-fluid flex-column pt-2 pb-2`}>
      <div className='container'>
        <nav className='navbar navbar-expand'>
          <a className='navbar-brand text-white'>Narzędzie walutowe</a>
          <div className='collapse navbar-collapse'>
            <ul className='navbar-nav' >
              <NavItem path={'/'} title={'Strona główna'} />
              <NavItem path={'/exchange-rates'} title={'Kursy walut'} />
              <NavItem path={'/calculator'} title={'Kalkulator'} />
            </ul>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar;