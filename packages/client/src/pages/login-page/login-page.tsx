import { AuthWrapper, Button, Input, PageWrapper } from '@/components';
import { AuthService } from '@/services';
import { Flex, Form, FormProps, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import './login-page.css';
import {
  setPageTitle,
  validateLogin,
  validatePassword,
  validateRequired,
} from '@/helpers';
import { useAuth } from '@/helpers/hooks/useAuth';

type LoginFieldType = {
  login: string;
  password: string;
};

export const LoginPage = () => {
  setPageTitle('Войти');
  const navigate = useNavigate();
  const [notify, contextHolder] = notification.useNotification();
  const { setAuth } = useAuth();

  const onFinish: FormProps<LoginFieldType>['onFinish'] = async ({
    login,
    password,
  }) => {
    const result = await AuthService.login({ login, password });
    if (result?.isOk) {
      setAuth?.();
      navigate('/');
      return;
    }
    const errorMessage = `Не удалось войти: ${result?.reason}`;
    notify.error({
      message: 'Ошибка авторизации',
      description: errorMessage,
      className: 'notification-bar',
    });
  };

  return (
    <PageWrapper withMenu={false}>
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
              {contextHolder}
              <Button block label='Войти' htmlType='submit' />
            </Flex>
          </Flex>
        </Form>
      </AuthWrapper>
    </PageWrapper>
  );
};
