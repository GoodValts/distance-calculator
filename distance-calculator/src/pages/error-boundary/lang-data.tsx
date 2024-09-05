import { AppSettingsInterface } from '../../store/reducers/app-settings-slice';

const errorText: {
  [key in AppSettingsInterface['language']]: {
    message: string;
    button: string;
  };
} = {
  en: {
    message: 'Oops! Something went wrong. Please, reload this page..',
    button: 'Reload',
  },
  ru: {
    message: 'Похоже, что-то сломалось. Пожалуйста, перезагрузите страницу..',
    button: 'Перезагрузить',
  },
  bel: {
    message: 'Здаецца, нешта зламалася. Калі ласка, перазагрузіце старонку..',
    button: 'Перазагрузіць',
  },
};

export default errorText;
