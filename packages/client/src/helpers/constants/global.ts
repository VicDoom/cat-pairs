import { ThemeConfig } from 'antd/es/config-provider/context';

export const enum Color {
  Dark = '#565A5D',
  Light = '#EFE5CC',
}

export const enum Theme {
  Dark = 'dark',
  Light = 'light',
}

export const THEME_ANTD_LIGHT: ThemeConfig = {
  token: {
    colorPrimary: Color.Light,
    colorText: Color.Light,
    colorIcon: Color.Dark,
    colorLink: Color.Dark,
    linkDecoration: 'underline',
    colorLinkActive: Color.Dark,
    colorLinkHover: Color.Dark,
  },
  components: {
    Typography: {
      colorText: Color.Dark,
    },
  },
};

export const THEME_ANTD_DARK: ThemeConfig = {
  token: {
    colorPrimary: Color.Dark,
    colorText: Color.Dark,
    colorIcon: Color.Light,
    colorLink: Color.Light,
    linkDecoration: 'underline',
    colorLinkActive: Color.Light,
    colorLinkHover: Color.Light,
  },
  components: {
    Typography: {
      colorText: Color.Light,
    },
  },
};
