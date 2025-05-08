import styles from './footer.module.scss';

export function Footer() {
  return (
    <div className={`container-fluid mt-5 pt-3 ${styles.holder}`}>
      <div className='container'>
        <h6 className='text-start' >Stworzone przez: Kamil-Kowalczyk</h6>
      </div>
    </div>
  )
}

export default Footer;
