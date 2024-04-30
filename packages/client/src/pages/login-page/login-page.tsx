import {
  AuthWrapper,
  Button,
  IconButton,
  Input,
  PageWrapper,
} from '@/components';
import { AuthService } from '@/services';
import { Flex, Form, FormProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  setPageTitle,
  validateLogin,
  validatePassword,
  validateRequired,
} from '@/helpers';
import { redirectToUrl } from '@/helpers/redirect-helper';
import { HOST, REDIRECT_TO_LOGIN } from '@/helpers/constants/api';
import { useNotification } from '@/providers/notification-provider';

type LoginFieldType = {
  login: string;
  password: string;
};

const navigateOauth = (serviceId: string, redirectUri: string) => {
  window.open(
    `https://oauth.yandex.ru/authorize?response_type=code&client_id=${serviceId}&redirect_uri=${redirectUri}`,
    '_self'
  );
};

export const LoginPage = () => {
  setPageTitle('Войти');
  const { notify } = useNotification();
  const navigate = useNavigate();

  const onOauth = async () => {
    notify('warning', 'Загрузка', 'Авторизация начнется через мгновение :)');
    new AuthService()
      .getServiceId()
      .then(serviceId =>
        navigateOauth(serviceId, `${HOST}${REDIRECT_TO_LOGIN}`)
      )
      .catch(err => {
        console.error(err);
        notify(
          'error',
          'Ошибка авторизации',
          'Невозможно подключиться к сервису Yandex, попробуйте чуть позже'
        );
      });
  };

  const onFinish: FormProps<LoginFieldType>['onFinish'] = async ({
    login,
    password,
  }) => {
    new AuthService()
      .login({ login, password })
      .then(() => redirectToUrl('/'))
      .catch(err => {
        notify(
          'error',
          'Ошибка авторизации',
          `Не удалось войти: ${err?.message}`
        );
      });
  };

  return (
    <PageWrapper withMenu={false}>
      <div className='container-vertical-center'>
        <AuthWrapper darkTheme={false} label='Вход'>
          <Form
            name='basic'
            layout='horizontal'
            initialValues={{}}
            onFinish={onFinish}
            autoComplete='off'
            className='login-form'>
            <Flex vertical gap={32}>
              <Flex vertical className='login-form__top' align='center' gap={8}>
                <Form.Item<LoginFieldType>
                  name='login'
                  rules={[
                    { validator: validateLogin },
                    { validator: validateRequired },
                  ]}>
                  <Input placeholder='Логин' />
                </Form.Item>
                <Form.Item<LoginFieldType>
                  name='password'
                  rules={[
                    { validator: validatePassword },
                    { validator: validateRequired },
                  ]}>
                  <Input placeholder='Пароль' type='password' />
                </Form.Item>
              </Flex>
              <Flex
                vertical
                className='login-form__bottom'
                align='center'
                gap={8}>
                <div className='text'>
                  Не зарегистрированы?&nbsp;
                  <span
                    className='text link'
                    onClick={() => navigate('/registration')}>
                    Регистрация
                  </span>
                </div>
                <Button block label='Войти' htmlType='submit' />
                <Flex align='center' gap={8}>
                  <span>Войти с помощью: </span>
                  <IconButton
                    type='default'
                    icon={<img src='yandex-icon.svg' />}
                    onClick={onOauth}
                  />
                </Flex>
              </Flex>
            </Flex>
          </Form>
        </AuthWrapper>
      </div>
    </PageWrapper>
  );
};
