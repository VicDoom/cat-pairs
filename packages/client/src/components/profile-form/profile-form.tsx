import './profile-form.css';
import { Button } from '@/components/button';
import { Form, type FormProps } from 'antd';
import {
  validateEmail,
  validateFirstName,
  validateLogin,
  validatePhone,
  validateRequired,
  validateSecondName,
} from '@/helpers';
import { Input } from '@/components';
import { useAppDispatch, useAppSelector } from '@/helpers/hooks/storeHooks';
import { fetchChangeCurrentUser } from '@/store/userSlice';
import { ProfileFieldType } from '@/helpers/types/user';
import { useNotification } from '@/providers/notification-provider';

export const ProfileForm = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(state => state.user.currentUser);
  const error = useAppSelector(state => state.user.error);
  const { notify } = useNotification();
  const onFinish: FormProps<ProfileFieldType>['onFinish'] = data => {
    dispatch(fetchChangeCurrentUser(data));
    if (error) {
      notify(
        'error',
        'Ошибка авторизации',
        `Не удалось заменить данные пользователя: ${error}`
      );
      return;
    }
    notify('success', undefined, 'Данные пользователя успешно изменены');
  };

  return (
    <>
      <Form
        name='basic'
        layout='horizontal'
        initialValues={currentUser}
        onFinish={onFinish}
        autoComplete='off'
        className='profile-form'>
        <div className='profile-form__input-container'>
          <Form.Item<ProfileFieldType>
            name='first_name'
            label='Имя'
            className='profile-form__label'
            rules={[
              { validator: validateFirstName },
              { validator: validateRequired },
            ]}>
            <Input className='profile-form__input' />
          </Form.Item>
        </div>
        <div className='profile-form__input-container'>
          <Form.Item<ProfileFieldType>
            name='second_name'
            label='Фамилия'
            className='profile-form__label'
            rules={[
              { validator: validateSecondName },
              { validator: validateRequired },
            ]}>
            <Input className='profile-form__input' />
          </Form.Item>
        </div>
        <div className='profile-form__input-container'>
          <Form.Item<ProfileFieldType>
            name='email'
            label='Емаил'
            className='profile-form__label'
            rules={[
              { validator: validateEmail },
              { validator: validateRequired },
            ]}>
            <Input className='profile-form__input' />
          </Form.Item>
        </div>
        <div className='profile-form__input-container'>
          <Form.Item<ProfileFieldType>
            name='phone'
            label='Телефон'
            className='profile-form__label'
            rules={[
              { validator: validatePhone },
              { validator: validateRequired },
            ]}>
            <Input className='profile-form__input' />
          </Form.Item>
        </div>
        <div className='profile-form__input-container'>
          <Form.Item<ProfileFieldType>
            name='login'
            label='Логин'
            className='profile-form__label'
            rules={[
              { validator: validateLogin },
              { validator: validateRequired },
            ]}>
            <Input className='profile-form__input' />
          </Form.Item>
        </div>
        <Button htmlType='submit' label={'Редактировать'} />
      </Form>
    </>
  );
};
