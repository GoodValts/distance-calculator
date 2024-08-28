import { useState } from 'react';
import styles from './mainPage.module.scss';
import Calculator from '../../components/calculator/calculator';
import Table from '../../components/table/table';
import {
  AppSettingsInterface,
  selectLanguage,
  selectTheme,
  setLanguage,
  setTheme,
} from '../../store/reducers/appSettingsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const langBtnArr: {
  name: string;
  value: AppSettingsInterface['language'];
}[] = [
  { name: 'En', value: 'en' },
  { name: 'Рус', value: 'ru' },
  { name: 'Бел', value: 'bel' },
];

const MainPage = () => {
  const lang = useAppSelector(selectLanguage);
  const theme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();

  const [isCalculator, setIsCalculator] = useState(true);

  const switchComponent = () => {
    setIsCalculator(isCalculator ? false : true);
  };

  return (
    <>
      <main className={styles.main}>
        <header className={styles.header}>
          <button
            className={styles.langButton}
            onClick={() => {
              const currIndex = langBtnArr.findIndex((el) => el.value === lang);
              dispatch(
                langBtnArr[currIndex + 1]
                  ? setLanguage(langBtnArr[currIndex + 1].value)
                  : setLanguage(langBtnArr[0].value)
              );
            }}
          >
            {langBtnArr[langBtnArr.findIndex((el) => el.value === lang)].name}
          </button>
          <button
            className={styles.themeBlock}
            onClick={() => {
              theme === 'light'
                ? dispatch(setTheme('dark'))
                : dispatch(setTheme('light'));
            }}
          >
            th
          </button>
        </header>
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
