import { AppSettingsInterface } from '../../store/reducers/app-settings-slice';

const notFoundText: {
  [key in AppSettingsInterface['language']]: {
    header: string;
    button: string;
  };
} = {
  en: {
    header: 'Page not found!',
    button: 'Return to main page',
  },
  ru: {
    header: 'Страница не найдена!',
    button: 'Вернуться на главную',
  },
  bel: {
    header: 'Старонка не знойдзена!',
    button: 'Вярнуцца на галоўную',
  },
};

export default notFoundText;
