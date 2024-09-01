import styles from './main-page.module.scss';
import Calculator from '../../components/calculator/calculator';
import Table from '../../components/table/table';
import Controllers from '../../components/controllers/controllers';
import Footer from '../../components/footer/footer';
import { useAppSelector } from '../../store/hooks';
import { selectIsTable } from '../../store/reducers/user-settings-slice';

const MainPage = () => {
  const isTable = useAppSelector(selectIsTable);

  return (
    <main className={styles.main}>
      <Controllers />
      {isTable && <Table />}
      {!isTable && <Calculator />}
      <Footer />
    </main>
  );
};

export default MainPage;
