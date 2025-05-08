import { ReactNode } from 'react';
import styles from './home.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface HomeProps {}

interface CardProps {
  title: string
  children?: ReactNode
  icon: IconProp
}

function Card({ title, children, icon }: CardProps) {
  return (
    <div className={`m-5 p-4  d-flex ${styles.cardHolder}`}>
      <div className={styles.cardIconHolder}>
      <FontAwesomeIcon icon={icon} size='2xl' color='#d2d0d1'/>
      </div>
      <div className={styles.cardContentHolder}>
        <h4>{title}</h4>
        <div className='ms-4' >
          {children}
        </div>
      </div>
      
    </div>
  )
}

export function Home(props: HomeProps) {
  return (
    <div className={`mx-auto p-4 mt-5 h-100 rounded-4 ${styles.holder}`}>
      <h2 className='text-center m-4'>Welcome to the Currency Tool!</h2>
      <div className='mt-5'>
        <Card title='Notice' icon={faCircleInfo}>
        <p>The tool operates on exchange rates and exchange rate tables sourced from the <a href='http://api.nbp.pl/'> API of the National Bank of Poland.</a></p>
        <p>In the <span className='fw-bolder'>Exchange Rates</span> tab, after selecting your base currency, the corresponding amounts for purchasing one unit of a foreign currency are displayed.</p>
        <p>Additionally, you can view the exchange rate history for currency pairs by clicking the <span className='fw-bolder'>Exchange Rate History</span> button.</p>
        <p>The <span className='fw-bolder'>Calculator</span> tab contains a calculator that allows you to convert between currencies.</p>

        </Card>
        <Card title='Links to the country flag icons used in the app' icon={faUserCircle}> 
          <div style={{fontSize: '0.9rem'}}>
            <div className='mt-2 mb-2'>Icons were created by <a href="https://www.freepik.com" title="Freepik">Freepik</a> and are available on <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            <div className='mt-2 mb-2'>Icons were created by <a href="https://www.flaticon.com/authors/roundicons" title="Roundicons">Roundicons</a> and are available on <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            <div className='mt-2 mb-2'>Icons were created by <a href="https://www.flaticon.com/authors/geekclick" title="GeekClick">GeekClick</a> and are available on <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            <div className='mt-2 mb-2'>Icons were created by <a href="https://www.flaticon.com/authors/iconsbox" title="IconsBox">IconsBox</a> and are available on <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            <div className='mt-2 mb-2'>Icons were created by <a href="https://www.flaticon.com/authors/rifal-hari-topan" title="Rifal Hari Topan">Rifal Hari Topan</a> and are available on <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            <div className='mt-2 mb-2'>Icons were created by <a href="https://www.flaticon.com/authors/riajulislam" title="riajulislam">riajulislam</a> and are available on <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            <div className='mt-2 mb-2'>Icons were created by <a href="https://www.flaticon.com/authors/hight-quality-icons" title="Hight Quality Icons">Hight Quality Icons</a> and are available on <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            <div className='mt-2 mb-2'>Icons were created by <a href="https://www.flaticon.com/authors/marcus-christensen" title="Marcus Christensen">Marcus Christensen</a> and are available on <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
          </div>
          
        </Card>
      </div>
    </div>
  );
}

export default Home;
