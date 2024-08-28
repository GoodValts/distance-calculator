import './app.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/404/404';
import { selectTheme } from './store/reducers/appSettingsSlice';
import { useAppSelector } from './store/hooks';
import { useEffect } from 'react';
import MainPage from './pages/main/mainPage';

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
