import { useState } from 'react';
import styles from './mainPage.module.scss';
import Calculator from '../../components/calculator/calculator';
import Table from '../../components/table/table';

const MainPage = () => {
  const [isCalculator, setIsCalculator] = useState(true);

  const switchComponent = () => {
    setIsCalculator(isCalculator ? false : true);
  };

  return (
    <>
      <main className={styles.main}>
        <Calculator
          isCalculator={isCalculator}
          switchComponent={switchComponent}
        />
        <Table isCalculator={isCalculator} switchComponent={switchComponent} />
      </main>
    </>
  );
};

export default MainPage;
