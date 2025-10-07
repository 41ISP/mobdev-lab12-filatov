import { createContext, useContext, useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';

const TelegramContext = createContext();

export const useTelegram = () => {
  const context = useContext(TelegramContext);
  if (!context) {
    throw new Error('useTelegram должен использоваться внутри TelegramProvider');
  }
  return context;
};

export const TelegramProvider = ({ children }) => {
  const [webApp] = useState(WebApp);
  const [user, setUser] = useState(null);

  useEffect(() => {
    WebApp.ready();

    const tgUser = WebApp.initDataUnsafe?.user;
    if (tgUser) setUser(tgUser);

    WebApp.expand();
    WebApp.disableVerticalSwipes();
    WebApp.setHeaderColor('bg_color');
    WebApp.setBackgroundColor('secondary_bg_color');

    applyTelegramTheme();
  }, []);

  const applyTelegramTheme = () => {
    const t = WebApp.themeParams;
    if (!t) return;

    document.documentElement.style.setProperty('--tg-theme-bg-color', t.bg_color || '#fff');
    document.documentElement.style.setProperty('--tg-theme-text-color', t.text_color || '#000');
    document.documentElement.style.setProperty('--tg-theme-link-color', t.link_color || '#2481cc');
    document.documentElement.style.setProperty('--tg-theme-button-color', t.button_color || '#2481cc');
    document.documentElement.style.setProperty('--tg-theme-button-text-color', t.button_text_color || '#fff');
    document.documentElement.style.setProperty('--tg-theme-secondary-bg-color', t.secondary_bg_color || '#f0f0f0');
  };

  const value = {
    webApp,
    user,
    showAlert: (msg) => WebApp.showAlert(msg),
    sendData: (d) => WebApp.sendData(d),
    close: () => WebApp.close(),
  };

  return (
    <TelegramContext.Provider value={value}>
      {children}
    </TelegramContext.Provider>
  );
};
