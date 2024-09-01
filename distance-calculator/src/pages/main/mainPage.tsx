import { useState } from 'react';
import styles from './mainPage.module.scss';
import Calculator from '../../components/calculator/calculator';
import Table from '../../components/table/table';
import Controllers from '../../components/controllers/controllers';
import Footer from '../../components/footer/footer';

const MainPage = () => {
  const [isCalculator, setIsCalculator] = useState(true);

  const switchComponent = () => {
    setIsCalculator(isCalculator ? false : true);
  };

  return (
    <main className={styles.main}>
      <Controllers />
      <Calculator
        isCalculator={isCalculator}
        switchComponent={switchComponent}
      />
      <Table isCalculator={isCalculator} switchComponent={switchComponent} />
      <Footer />
    </main>
  );
};

export default MainPage;
