import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { selectLanguage } from '../../store/reducers/app-settings-slice';
import styles from './404.module.scss';
import notFoundText from './lang-data';

const NotFoundPage = () => {
  const lang = useAppSelector(selectLanguage);
  const navTo = useNavigate();

  const backToMain = () => {
    navTo('/');
  };

  return (
    <section className={styles.page}>
      <div>
        <div className={styles.header}>{notFoundText[lang].header}</div>
        <button className={styles.button} onClick={backToMain}>
          {notFoundText[lang].button}
        </button>
      </div>
    </section>
  );
};

export default NotFoundPage;
