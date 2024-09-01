import getAppVersion from '../../common/getAppVersion';
import { useAppSelector } from '../../store/hooks';
import {
  selectLanguage,
  selectTheme,
} from '../../store/reducers/appSettingsSlice';
import tgIcon from '../../assets/tg-icon.png';
import tgIconDark from '../../assets/tg-icon-dark.png';
import linkedIcon from '../../assets/linked-icon.png';
import linkedIconDark from '../../assets/linked-icon-dark.png';
import gitIcon from '../../assets/git-icon.png';
import gitIconDark from '../../assets/git-icon-dark.png';
import styles from './footer.module.scss';

const Footer = () => {
  const lang = useAppSelector(selectLanguage);
  const theme = useAppSelector(selectTheme);

  return (
    <footer className={styles.footer}>
      <p className={styles.footerText}>v{getAppVersion()}</p>
      <div>
        <a
          href="https://t.me/szczuczynszczyna"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={theme === 'light' ? tgIcon : tgIconDark}
            className={styles.footerImg}
            alt="telegram"
          />
        </a>
        <a
          href="https://www.linkedin.com/in/goodvalts/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={theme === 'light' ? linkedIcon : linkedIconDark}
            className={styles.footerImg}
            alt="linkedIn"
          />
        </a>
        <a
          href="https://github.com/GoodValts/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={theme === 'light' ? gitIcon : gitIconDark}
            className={styles.footerImg}
            alt="github"
          />
        </a>
      </div>
      <p className={styles.footerText}>© GoodValts, 2024</p>
    </footer>
  );
};

export default Footer;
