import { useNavigate } from 'react-router-dom';
import { Button, Flex, Form, type FormProps } from 'antd';
import { Input } from '@/components';

type FieldType = {
  userName: string;
};

export const ForumLogin = (): JSX.Element => {
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>['onFinish'] = async values => {
    const response = await fetch(
      'http://localhost:3001/api/server/user/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      }
    );
    const result = await response.json();

    if (response.status === 200) {
      localStorage.setItem('forumAuthToken', result.token);
      navigate('/forum');
    }
  };
  return (
    <Flex justify='center'>
      <Form onFinish={onFinish}>
        <Form.Item<FieldType>
          label='Пожалуйста, представьтесь'
          name='userName'
          rules={[{ required: true, message: 'Пожалуйста, заполните поле' }]}>
          <Input />
        </Form.Item>
        <Button type='primary' htmlType='submit'>
          Продолжить
        </Button>
      </Form>
    </Flex>
  );
};
