import styles from './app.module.scss';
import Navbar from './layouts/navbar/navbar';
import Footer from './layouts/footer/footer';
import MainHolder from './layouts/main-holder/main-holder';

export function App() {
  return (
    <div className={`${styles.app} vh-100 flex-column d-flex`}>
      <Navbar/>
      <MainHolder />
      <Footer/>
    </div>
  );
}

export default App;
