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
      <h2 className='text-center m-4'>Witaj w narzędziu walutowym!</h2>
      <div className='mt-5'>
        <Card title='Informacja' icon={faCircleInfo}>
          <p>Narzędzie operuje na kursach oraz tabelach kursów pochodzących z <a href='http://api.nbp.pl/'> API Narodowego Banku Polskiego.</a></p>
          <p>W zakładce <span className='fw-bolder'> Kursy walut</span> po wybraniu naszej wejściowej waluty wyświetlają się należne kwoty za kupno jednej jednostki obcej waluty.</p>
          <p>Oprócz tego możemy wyświetlać historię kursów dla par walut po naciśnięciu przycisku <span className='fw-bolder'> Historia kursów</span>.</p>
          <p>W zakładce <span className='fw-bolder'> Kalkulator</span> znajduje się kalkulator pozwalający przeliczać waluty między sobą.</p>
        </Card>
        <Card title='Linki do autorów flag krajów wykorzystanych w apliakcji' icon={faUserCircle}> 
          <div style={{fontSize: '0.9rem'}}>
            <div className='mt-2 mb-2'>Ikony zostały stworzone przez <a href="https://www.freepik.com" title="Freepik">Freepik</a> oraz są dostępne na stronie <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            <div className='mt-2 mb-2'>Ikony zostały stworzone przez <a href="https://www.flaticon.com/authors/roundicons" title="Roundicons">Roundicons</a> oraz są dostępne na stronie <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            <div className='mt-2 mb-2'>Ikony zostały stworzone przez <a href="https://www.flaticon.com/authors/geekclick" title="GeekClick">GeekClick</a> oraz są dostępne na stronie <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            <div className='mt-2 mb-2'>Ikony zostały stworzone przez <a href="https://www.flaticon.com/authors/iconsbox" title="IconsBox">IconsBox</a> oraz są dostępne na stronie <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            <div className='mt-2 mb-2'>Ikony zostały stworzone przez <a href="https://www.flaticon.com/authors/rifal-hari-topan" title="Rifal Hari Topan">Rifal Hari Topan</a> oraz są dostępne na stronie <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            <div className='mt-2 mb-2'>Ikony zostały stworzone przez <a href="https://www.flaticon.com/authors/riajulislam" title="riajulislam">riajulislam</a> oraz są dostępne na stronie <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            <div className='mt-2 mb-2'>Ikony zostały stworzone przez <a href="https://www.flaticon.com/authors/hight-quality-icons" title="Hight Quality Icons">Hight Quality Icons</a> oraz są dostępne na stronie <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            <div className='mt-2 mb-2'>Ikony zostały stworzone przez <a href="https://www.flaticon.com/authors/marcus-christensen" title="Marcus Christensen">Marcus Christensen</a> oraz są dostępne na stronie <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
          </div>
          
        </Card>
      </div>
    </div>
  );
}

export default Home;
