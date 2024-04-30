import React, { createContext, useContext } from 'react';
import { notification } from 'antd';
import { Color } from '@/helpers';

type NotificationType = 'success' | 'warning' | 'error' | 'info';

type Notify = (
  type: NotificationType,
  message?: string,
  description?: string
) => void;

type NotificationContextType = {
  notify: Notify;
};

const NotificationContext = createContext<NotificationContextType>({
  notify: () => console.error('notify is not set'),
});

export const useNotification = () => useContext(NotificationContext);

interface NotificationProviderProps {
  children: React.ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [api, contextHolder] = notification.useNotification();

  const notify: Notify = (type, message?, description?) => {
    api[type]({
      message: message && <div style={{ color: Color.Light }}>{message}</div>,
      description: description && (
        <div style={{ color: Color.Light }}>{description}</div>
      ),
      style: {
        backgroundColor: Color.Dark,
      },
    });
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};
