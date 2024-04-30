import { AuthWrapper, Button, Input, PageWrapper } from '@/components';
import { Form, type FormProps } from 'antd';
import React from 'react';
import './registration-page.css';
import { setPageTitle } from '@/helpers/helper';
import {
  validateEmail,
  validateFirstName,
  validateLogin,
  validatePassword,
  validatePhone,
  validateRequired,
  validateSecondName,
} from '@/helpers';
import { useNavigate } from 'react-router-dom';
import { redirectToUrl } from '@/helpers/redirect-helper';
import { AuthService } from '@/services';
import { useNotification } from '@/providers/notification-provider';
import { RegistrationFieldDto } from '@/helpers/types';
import { REDIRECT_TO_LOGIN } from '@/helpers/constants/api';

export const RegistrationPage = () => {
  const navigate = useNavigate();
  const { notify } = useNotification();
  setPageTitle('Регистрация');

  const darkTheme = false;

  const onFinish: FormProps<RegistrationFieldDto>['onFinish'] = data => {
    new AuthService()
      .registration(data)
      .then(() => redirectToUrl('/'))
      .catch(err => {
        notify(
          'error',
          'Ошибка регистрации',
          `Не удалось зарегистрироваться: ${err?.message}`
        );
      });
  };

  const onFinishFailed: FormProps<RegistrationFieldDto>['onFinishFailed'] =
    () => {
      // code...
    };
  return (
    <PageWrapper withMenu={false}>
      <div className='container-vertical-center'>
        <AuthWrapper darkTheme={darkTheme} label='Регистрация'>
          <Form
            name='basic'
            layout='horizontal'
            initialValues={{}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
            className='registration-page__form'>
            <Form.Item<RegistrationFieldDto>
              name='first_name'
              rules={[
                { validator: validateFirstName },
                { validator: validateRequired },
              ]}>
              <Input placeholder='Имя' />
            </Form.Item>
            <Form.Item<RegistrationFieldDto>
              name='second_name'
              rules={[
                { validator: validateSecondName },
                { validator: validateRequired },
              ]}>
              <Input placeholder='Фамилия' />
            </Form.Item>
            <Form.Item<RegistrationFieldDto>
              name='email'
              rules={[
                { validator: validateEmail },
                { validator: validateRequired },
              ]}>
              <Input placeholder='Email' />
            </Form.Item>
            <Form.Item<RegistrationFieldDto>
              name='phone'
              rules={[
                { validator: validatePhone },
                { validator: validateRequired },
              ]}>
              <Input placeholder='Телефон' />
            </Form.Item>
            <Form.Item<RegistrationFieldDto>
              name='login'
              rules={[
                { validator: validateLogin },
                { validator: validateRequired },
              ]}>
              <Input placeholder='Логин' />
            </Form.Item>
            <Form.Item<RegistrationFieldDto>
              name='password'
              rules={[
                { validator: validatePassword },
                { validator: validateRequired },
              ]}>
              <Input placeholder='Пароль' type='password' />
            </Form.Item>
            <Button
              darkTheme={darkTheme}
              label='Зарегистрироваться'
              htmlType='submit'
            />
            <div className='registration-page__footer'>
              <span>Есть учетные данные? </span>
              <span
                className='text link'
                onClick={() => navigate(REDIRECT_TO_LOGIN)}>
                Войти
              </span>
            </div>
          </Form>
        </AuthWrapper>
      </div>
    </PageWrapper>
  );
};
