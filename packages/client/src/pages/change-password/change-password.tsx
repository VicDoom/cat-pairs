import {
  AuthWrapper,
  Button,
  Input,
  MessagePopup,
  PageWrapper,
} from '@/components';
import { Form, type FormProps } from 'antd';
import { UserService } from '@/services/user';
import { DataChangePassword } from '@/helpers/types';
import { useState } from 'react';
import './change-password.css';
import {
  validateConfirmPassword,
  validatePassword,
  validateRequired,
} from '@/helpers';
import { withAuthRouteHOC } from '@/helpers/hooks/withAuthRouteHOC';

type RegistrationFieldType = {
  oldpasswod: string;
  newpassword: string;
  newpassword2: string;
};

const onFinishFailed: FormProps<RegistrationFieldType>['onFinishFailed'] =
  errorInfo => {
    // eslint-disable-next-line no-console
    console.log('Failed:', errorInfo);
  };

export const NewPassword = () => {
  const [message, setMessage] = useState<string>('');
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [form] = Form.useForm();

  const handleChangePassword = async ({
    oldPassword,
    newPassword,
  }: DataChangePassword) => {
    const result = await UserService.changePassword({
      oldPassword,
      newPassword,
    });
    if (result && result.isOk) {
      setMessage('Пароль успешно изменен');
      setIsPopupOpen(true);
    } else {
      setMessage('Не удалось поменять пароль');
      setIsPopupOpen(true);
    }
  };
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const onFinish: FormProps<RegistrationFieldType>['onFinish'] = values => {
    handleChangePassword({
      oldPassword: values.oldpasswod,
      newPassword: values.newpassword,
    });
  };
  const darkTheme = false;
  return (
    <PageWrapper withMenu={false}>
      <AuthWrapper darkTheme={darkTheme} label=''>
        <>
          <Form
            form={form}
            name='basic'
            layout='horizontal'
            initialValues={{}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
            className='new-password__form'>
            <Form.Item<RegistrationFieldType>
              name='oldpasswod'
              rules={[
                { validator: validatePassword },
                { validator: validateRequired },
              ]}>
              <Input placeholder='Старый пароль' type='password' />
            </Form.Item>
            <Form.Item<RegistrationFieldType>
              name='newpassword'
              rules={[
                { validator: validatePassword },
                { validator: validateRequired },
              ]}>
              <Input placeholder='Новый пароль' type='password' />
            </Form.Item>
            <Form.Item<RegistrationFieldType>
              name='newpassword2'
              rules={[
                { validator: validatePassword },
                { validator: validateRequired },
                {
                  validator: (ob, value) =>
                    validateConfirmPassword(
                      form.getFieldValue('newpassword'),
                      value
                    ),
                },
              ]}>
              <Input
                placeholder='Введите новый пароль еще раз'
                type='password'
              />
            </Form.Item>
            <Button
              darkTheme={darkTheme}
              label='Поменять пароль'
              htmlType='submit'
              size='large'
            />
          </Form>
          <MessagePopup
            isPopupOpen={isPopupOpen}
            handleClosePopup={handleClosePopup}
            message={message}
            backPath='../profile'
          />
        </>
      </AuthWrapper>
    </PageWrapper>
  );
};

export default withAuthRouteHOC(NewPassword);
