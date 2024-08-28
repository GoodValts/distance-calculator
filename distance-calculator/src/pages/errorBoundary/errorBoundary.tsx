import React from 'react';
import store from '../../store/store';
import styles from './errorBoundary.module.scss';
import errorText from './langData';

interface ErrorBoundaryInterface {
  props: {
    children: React.ReactNode;
  };
  state: {
    hasError: boolean;
  };
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryInterface['props'],
  ErrorBoundaryInterface['state']
> {
  constructor(props: ErrorBoundaryInterface['props']) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  getLang() {
    return store.getState().appSettings.language;
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.section}>
          <>
            <p className={styles.message}>
              {errorText[this.getLang()]
                ? errorText[this.getLang()].message
                : 'Oops! Something went wrong. Please, reload this page..'}
              <button
                className={styles.button}
                onClick={() => {
                  location.reload();
                }}
                data-testid="errorBoundary"
              >
                {errorText[this.getLang()]
                  ? errorText[this.getLang()].button
                  : 'Reload'}
              </button>
            </p>
          </>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
