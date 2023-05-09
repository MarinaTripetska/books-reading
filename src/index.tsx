import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { I18nextProvider } from 'react-i18next';
import i18n from './locales/i18n';
import { store, persistor } from './redux/app/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import setupInterceptors from './services/auth/setupInterceptors';
import GlobalStyle from './GlobalStyles';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <GlobalStyle />
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);

setupInterceptors(store);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
