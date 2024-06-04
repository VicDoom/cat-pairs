import { theme as antdTheme } from 'antd';
import React from 'react';
import './page-wrapper.css';
import { Header } from '@/components';

export interface PageWrapperProps {
  children: JSX.Element | string;
  withMenu?: boolean;
}

export const PageWrapper = (props: PageWrapperProps): JSX.Element => {
  const { children, withMenu = true } = props;
  const { token: theme } = antdTheme.useToken();
  return (
    <div className='page-wrapper' style={{ background: theme.colorPrimary }}>
      <Header withMenu={withMenu} />
      <div className='page-wrapper__content'>{children}</div>
    </div>
  );
};
