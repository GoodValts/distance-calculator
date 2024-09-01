import { AppSettingsInterface } from '../store/reducers/app-settings-slice';

const titlesContext: {
  [key in AppSettingsInterface['language']]: string;
} = {
  en: 'Distance calculator',
  ru: 'Калькулятор пути',
  bel: 'Калькулятар адлегласцi',
};

const getDocTitle = (lang: AppSettingsInterface['language']): string => {
  return titlesContext[lang];
};

export default getDocTitle;
