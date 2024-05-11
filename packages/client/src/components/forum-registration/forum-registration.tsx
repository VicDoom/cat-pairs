import { Button, Flex, Form, type FormProps } from 'antd';
import { Input } from '@/components';

type FieldType = {
  userName: string;
};

export const ForumRegistration = (): JSX.Element => {
  const onFinish: FormProps<FieldType>['onFinish'] = async values => {
    const response = await fetch(
      'http://localhost:3001/api/server/user/registration',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      }
    );
    const result = await response.json();

    console.log(result);
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
