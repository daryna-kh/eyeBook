import { ConfigProvider, Space } from 'antd';
import { useEffect } from 'react';

import { getCurrentDateFormatted } from './helpers/helpers';
import { useDispatch, useSelector } from './store';
import { setAccessToken, setCurrentDate } from './store/screens';
import { screensSelector } from './store/screens/selectors';
import { getToken } from './api/getToken/getToken';
import { Header } from './components/Header/Header';
import { StepContent } from './components/StepContent/StepContent';

export const App = () => {
  const { accessToken, loaded, currentDate } = useSelector(screensSelector);
  const dispatch = useDispatch();

  async function fetchToken() {
    const token = await getToken();
    dispatch(setAccessToken(token));
  }

  useEffect(() => {
    if (accessToken === null) {
      fetchToken();
    }
    if (currentDate.length === 0) {
      dispatch(setCurrentDate(getCurrentDateFormatted()));
    }

    const tokenInterval = setInterval(fetchToken, 55 * 60 * 1000);

    return () => clearInterval(tokenInterval);
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1C1D1D',
          controlHeight: 48,
          colorTextPlaceholder: '#666666',
        },
        components: {
          Steps: {
            iconSize: 32,
            iconFontSize: 14,
            iconTop: 0,
            fontSize: 14,
            fontWeightStrong: 500,
            colorText: '#fff',
            colorTextDescription: '#fff',
            colorPrimary: '#059669',
          },
        },
      }}
    >
      <Header />
      <div className='container'>
        <div className='wrapper'>
          <StepContent />
        </div>
      </div>
    </ConfigProvider>
  );
};
