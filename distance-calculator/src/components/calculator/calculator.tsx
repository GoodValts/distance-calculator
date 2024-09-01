import { useState } from 'react';
import transformKmhToDistance from '../../common/calculate-distance';
import styles from './calculator.module.scss';
import calculatorText from './lang-data';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  selectLanguage,
  selectTheme,
} from '../../store/reducers/app-settings-slice';
import {
  selectIsMetric,
  setIsTable,
} from '../../store/reducers/user-settings-slice';

const Calculator = () => {
  const lang = useAppSelector(selectLanguage);
  const isMetric = useAppSelector(selectIsMetric);
  const theme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();

  const [time, setTime] = useState(0);
  const [speed, setSpeed] = useState(0);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.calculator}>
          <div>
            <label className={styles.label}>
              {calculatorText[lang].time.placeholder}:
            </label>
            <input
              className={styles.input}
              type="number"
              placeholder={calculatorText[lang].time.label}
              min="0"
              max="10"
              step=".1"
              onChange={(event) => {
                const inputTime = parseFloat(event.target.value);
                inputTime ? setTime(inputTime) : setTime(0);
              }}
            />
            <p className={styles.errorMessage}>
              {time ? calculatorText[lang].time.label : ''}
            </p>
          </div>
          <div>
            <label className={styles.label}>
              {calculatorText[lang].speed.placeholder}:
            </label>
            <input
              className={styles.input}
              type="number"
              placeholder={
                isMetric
                  ? calculatorText[lang].speed.labelForMetric
                  : calculatorText[lang].speed.labelForImperial
              }
              min="0"
              max="300"
              step="5"
              onChange={(event) => {
                const inputSpeed = parseFloat(event.target.value);
                inputSpeed ? setSpeed(inputSpeed) : setSpeed(0);
              }}
            />
            <p className={styles.errorMessage}>
              {speed
                ? isMetric
                  ? calculatorText[lang].speed.labelForMetric
                  : calculatorText[lang].speed.labelForImperial
                : ''}
            </p>
          </div>
          <div>
            <label className={styles.label}>
              {calculatorText[lang].distance.placeholder}:
            </label>
            <p
              className={styles.result}
              style={
                parseFloat(transformKmhToDistance(speed, time, isMetric)) === 0
                  ? { color: theme === 'dark' ? '#708090' : '#778899' }
                  : parseFloat(transformKmhToDistance(speed, time, isMetric)) <
                      5
                    ? { color: theme === 'dark' ? '#7fcd32' : '#228B22' }
                    : parseFloat(
                          transformKmhToDistance(speed, time, isMetric)
                        ) < 10
                      ? { color: '#FF8C00' }
                      : { color: theme === 'dark' ? '#DC143C' : '#B22222' }
              }
            >
              {speed && time
                ? transformKmhToDistance(speed, time, isMetric).concat(
                    ` ${calculatorText[lang].distance.label}`
                  )
                : `0 ${calculatorText[lang].distance.label}`}
            </p>
          </div>
          <p
            className={styles.button}
            onClick={() => dispatch(setIsTable(true))}
          >
            {calculatorText[lang].table}
          </p>
        </div>
      </div>
    </>
  );
};

export default Calculator;
