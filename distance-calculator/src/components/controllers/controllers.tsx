import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  AppSettingsInterface,
  selectLanguage,
  selectTheme,
  setLanguage,
  setTheme,
} from '../../store/reducers/appSettingsSlice';
import getAppVersion from '../../common/getAppVersion';
import darkThemeLogo from '../../assets/dark-theme-logo.png';
import lightThemeLogo from '../../assets/light-theme-logo.png';
import styles from './controllers.module.scss';
import {
  selectIsMetric,
  setIsMetric,
} from '../../store/reducers/userSettingsSlice';
import controllersText from './langData';

const langBtnArr: {
  name: string;
  value: AppSettingsInterface['language'];
}[] = [
  { name: 'En', value: 'en' },
  { name: 'Рус', value: 'ru' },
  { name: 'Бел', value: 'bel' },
];

const Controllers = () => {
  const lang = useAppSelector(selectLanguage);
  const theme = useAppSelector(selectTheme);
  const isMetric = useAppSelector(selectIsMetric);
  const dispatch = useAppDispatch();

  return (
    <header className={styles.header}>
      <button
        className={`${styles.defButton} ${styles.defButton_metricSys}`}
        onClick={() => dispatch(setIsMetric(isMetric ? false : true))}
      >
        {isMetric
          ? controllersText[lang].labelForMetric[0]
              .toUpperCase()
              .concat(controllersText[lang].labelForMetric.slice(1))
          : controllersText[lang].labelForImperial[0]
              .toUpperCase()
              .concat(controllersText[lang].labelForImperial.slice(1))}
      </button>
      <button
        className={styles.defButton}
        onClick={() => {
          const currIndex = langBtnArr.findIndex((el) => el.value === lang);
          dispatch(
            setLanguage(
              langBtnArr[currIndex + 1]
                ? langBtnArr[currIndex + 1].value
                : langBtnArr[0].value
            )
          );
        }}
      >
        {langBtnArr[langBtnArr.findIndex((el) => el.value === lang)].name}
      </button>
      <button
        className={styles.themeBlock}
        onClick={() => dispatch(setTheme(theme === 'light' ? 'dark' : 'light'))}
      >
        <div className={styles.themeToggler}>
          <img
            className={styles.themeTogglerImage}
            src={theme === 'dark' ? darkThemeLogo : lightThemeLogo}
            alt={theme === 'dark' ? 'darkTheme' : 'lightTheme'}
          />
        </div>
      </button>
    </header>
  );
};

export default Controllers;
