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
  oldpassword: string;
  newpassword: string;
  newpassword2: string;
};

const onFinishFailed: FormProps<RegistrationFieldType>['onFinishFailed'] =
  errorInfo => {
    console.error('Failed:', errorInfo);
  };

export const NewPassword = () => {
  const [message, setMessage] = useState<string>('');
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [form] = Form.useForm();

  const handleChangePassword = async ({
    oldPassword,
    newPassword,
  }: DataChangePassword) => {
    new UserService()
      .changePassword({
        oldPassword,
        newPassword,
      })
      .then(() => {
        setMessage('Пароль успешно изменен');
        setIsPopupOpen(true);
      })
      .catch(err => {
        console.error(err);
        setMessage('Не удалось поменять пароль');
        setIsPopupOpen(true);
      });
  };
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const onFinish: FormProps<RegistrationFieldType>['onFinish'] = values => {
    handleChangePassword({
      oldPassword: values.oldpassword,
      newPassword: values.newpassword,
    });
  };
  const darkTheme = false;
  return (
    <PageWrapper withMenu={false}>
      <div className='container-vertical-center'>
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
                name='oldpassword'
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
      </div>
    </PageWrapper>
  );
};

export default withAuthRouteHOC(NewPassword);
