import { AppSettingsInterface } from '../../store/reducers/app-settings-slice';

const calculatorText: {
  [key in AppSettingsInterface['language']]: {
    time: {
      placeholder: string;
      label: string;
    };
    speed: {
      placeholder: string;
      labelForMetric: string;
      labelForImperial: string;
    };
    distance: {
      placeholder: string;
      label: string;
    };
    table: string;
  };
} = {
  en: {
    time: {
      placeholder: 'Time',
      label: 'sec',
    },
    speed: {
      placeholder: 'Speed',
      labelForMetric: 'km/h',
      labelForImperial: 'mph',
    },
    distance: {
      placeholder: 'Distance',
      label: 'm',
    },
    table: 'Table',
  },
  ru: {
    time: {
      placeholder: 'Время',
      label: 'сек',
    },
    speed: {
      placeholder: 'Скорость',
      labelForMetric: 'км/ч',
      labelForImperial: 'миль/ч',
    },
    distance: {
      placeholder: 'Расстояние',
      label: 'м',
    },
    table: 'Таблица',
  },
  bel: {
    time: {
      placeholder: 'Час',
      label: 'сек',
    },
    speed: {
      placeholder: 'Хуткасць',
      labelForMetric: 'км/г',
      labelForImperial: 'мiль/г',
    },
    distance: {
      placeholder: 'Адлегласць',
      label: 'м',
    },
    table: 'Таблiца',
  },
};

export default calculatorText;
