import { useState } from 'react';
import transformKmhToDistance from '../../common/calculateDistance';
import styles from './calculator.module.scss';
import calculatorText from './langData';
import { useAppSelector } from '../../store/hooks';
import { selectLanguage } from '../../store/reducers/appSettingsSlice';
import { selectIsMetric } from '../../store/reducers/userSettingsSlice';

const Calculator = ({
  isCalculator,
  switchComponent,
}: {
  isCalculator: boolean;
  switchComponent: () => void;
}) => {
  const [time, setTime] = useState(0);
  const [speed, setSpeed] = useState(0);

  const lang = useAppSelector(selectLanguage);
  const isMetric = useAppSelector(selectIsMetric);

  return (
    <>
      {isCalculator && (
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
                  parseFloat(transformKmhToDistance(speed, time, isMetric)) ===
                  0
                    ? { color: '#778899' }
                    : parseFloat(
                          transformKmhToDistance(speed, time, isMetric)
                        ) < 5
                      ? { color: '#228B22' }
                      : parseFloat(
                            transformKmhToDistance(speed, time, isMetric)
                          ) < 10
                        ? { color: '#FF8C00' }
                        : { color: '#B22222' }
                }
              >
                {speed && time
                  ? transformKmhToDistance(speed, time, isMetric).concat(
                      ` ${calculatorText[lang].distance.label}`
                    )
                  : `0 ${calculatorText[lang].distance.label}`}
              </p>
            </div>
            <p className={styles.button} onClick={() => switchComponent()}>
              {calculatorText[lang].table}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Calculator;
