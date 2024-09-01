import './app.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/404/404';
import {
  selectLanguage,
  selectTheme,
} from './store/reducers/app-settings-slice';
import { useAppSelector } from './store/hooks';
import { useEffect } from 'react';
import MainPage from './pages/main/main-page';
import getDocTitle from './common/get-document-title';

function App() {
  const theme = useAppSelector(selectTheme);
  const lang = useAppSelector(selectLanguage);

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('data-theme', theme);
    document.documentElement.lang = lang;
    document.title = getDocTitle(lang);
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
