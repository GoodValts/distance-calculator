import './app.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/404/404';
import { selectLanguage, selectTheme } from './store/reducers/appSettingsSlice';
import { useAppSelector } from './store/hooks';
import { useEffect } from 'react';
import MainPage from './pages/main/mainPage';
import { selectIsMetric } from './store/reducers/userSettingsSlice';

function App() {
  const theme = useAppSelector(selectTheme);

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
