import { ReactNode } from 'react';
import styles from './home.module.scss';

export interface HomeProps {}

interface CardProps {
  title: string
  children?: ReactNode
  
}

function Card({ title, children }: CardProps) {
  return (
    <div className='m-5 p-4 border border-2 rounded-4'>
      <h4>{title}</h4>
      <div className='ms-4'>
        {children}
      </div>
    </div>
  )
}

export function Home(props: HomeProps) {
  return (
    <div className={`mx-auto p-4 mt-5 h-100 rounded-4 ${styles.holder}`}>
      <h2 className='text-center m-4'>Witaj w narzędziu walutowym!</h2>
      <div className='mt-5'>
        <Card title='Informacja'>
          Narzędzie operuje na kursach oraz tabelach kursów pochodzących z 
          <a href='http://api.nbp.pl/'> API Narodowego Banku Polskiego</a>
        </Card>
        <Card title='Linki do autorów flag krajów wykorzystanych w apliakcji'> 
          <div className='mt-2 mb-2'>Ikony zostały stworzone przez <a href="https://www.freepik.com" title="Freepik">Freepik</a> oraz są dostępne na stronie <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
          <div className='mt-2 mb-2'>Ikony zostały stworzone przez <a href="https://www.flaticon.com/authors/roundicons" title="Roundicons">Roundicons</a> oraz są dostępne na stronie <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
          <div className='mt-2 mb-2'>Ikony zostały stworzone przez <a href="https://www.flaticon.com/authors/geekclick" title="GeekClick">GeekClick</a> oraz są dostępne na stronie <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
          <div className='mt-2 mb-2'>Ikony zostały stworzone przez <a href="https://www.flaticon.com/authors/iconsbox" title="IconsBox">IconsBox</a> oraz są dostępne na stronie <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
          <div className='mt-2 mb-2'>Ikony zostały stworzone przez <a href="https://www.flaticon.com/authors/rifal-hari-topan" title="Rifal Hari Topan">Rifal Hari Topan</a> oraz są dostępne na stronie <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
          <div className='mt-2 mb-2'>Ikony zostały stworzone przez <a href="https://www.flaticon.com/authors/riajulislam" title="riajulislam">riajulislam</a> oraz są dostępne na stronie <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
          <div className='mt-2 mb-2'>Ikony zostały stworzone przez <a href="https://www.flaticon.com/authors/hight-quality-icons" title="Hight Quality Icons">Hight Quality Icons</a> oraz są dostępne na stronie <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
          <div className='mt-2 mb-2'>Ikony zostały stworzone przez <a href="https://www.flaticon.com/authors/marcus-christensen" title="Marcus Christensen">Marcus Christensen</a> oraz są dostępne na stronie <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </Card>
      </div>
    </div>
  );
}

export default Home;
