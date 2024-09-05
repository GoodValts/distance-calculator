import { AppSettingsInterface } from '../../store/reducers/app-settings-slice';
import calculatorText from '../calculator/lang-data';

const controllersText: {
  [key in AppSettingsInterface['language']]: {
    labelForMetric: string;
    labelForImperial: string;
  };
} = {
  en: {
    labelForMetric: calculatorText.en.speed.labelForMetric,
    labelForImperial: calculatorText.en.speed.labelForImperial,
  },
  ru: {
    labelForMetric: calculatorText.ru.speed.labelForMetric,
    labelForImperial: calculatorText.ru.speed.labelForImperial,
  },
  bel: {
    labelForMetric: calculatorText.bel.speed.labelForMetric,
    labelForImperial: calculatorText.bel.speed.labelForImperial,
  },
};

export default controllersText;
