import { AppSettingsInterface } from '../../store/reducers/appSettingsSlice';

const tableText: {
  [key in AppSettingsInterface['language']]: {
    tableHeader: string;
    speed: {
      labelForMetric: string;
      labelForImperial: string;
    };
    distance: string;
    time: string;
    calculator: string;
  };
} = {
  en: {
    tableHeader: 'Distance table for time and speed',
    speed: {
      labelForMetric: 'km/h',
      labelForImperial: 'mph',
    },
    distance: 'm',
    time: 's',
    calculator: 'Calculator',
  },
  ru: {
    tableHeader: 'Таблица пути от времени и скорости',
    speed: {
      labelForMetric: 'км/ч',
      labelForImperial: 'миль/ч',
    },
    distance: 'м',
    time: 'с',
    calculator: 'Калькулятор',
  },
  bel: {
    tableHeader: 'Табліца адлегласцi па часе і хуткасці',
    speed: {
      labelForMetric: 'км/г',
      labelForImperial: 'мiль/г',
    },
    distance: 'м',
    time: 'с',
    calculator: 'Калькулятар',
  },
};

export default tableText;
