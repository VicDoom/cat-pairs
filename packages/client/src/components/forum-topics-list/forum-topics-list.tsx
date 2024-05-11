import { useState } from 'react';
import { Button, ConfigProvider, Flex, Form, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components';
import { Color } from '@/helpers';
import './forum-topics-list.css';

interface ForumTopic {
  id: number;
  topicName: string;
  // messages: string;
}

interface ForumTopicsListProps {
  list: ForumTopic[];
}

export const ForumTopicsList = ({
  list,
}: ForumTopicsListProps): JSX.Element => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //тестовый запрос
  const handleTestCreateTopic = async () => {
    const forumAuthToken = localStorage.getItem('forumAuthToken') || '';
    const response = await fetch(
      'http://localhost:3001/api/server/topic/create',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Authorization:
          //   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInVzZXJOYW1lIjoidGVzdDIwIiwiaWF0IjoxNzE0Nzk3MDkzLCJleHAiOjE3MTQ4ODM0OTN9.To_WYDVb0fP3aHfm0wLTvqZmpqMCq5Ky72xRfO5u53g',
          Authorization: `Bearer ${encodeURIComponent(forumAuthToken)}`,
        },
        body: JSON.stringify({
          userId: 1,
          topicName: 'тестовая тема',
          description: 'описание тестовой темы',
        }),
      }
    );

    const result = await response.json();

    if (response.status === 403) {
      navigate('/forum/login');
    }
    console.log(response.status);
    console.log(result);
  };

  return (
    <Flex className='forum-topics-list' justify='center'>
      <button onClick={handleTestCreateTopic}>создать тему</button>
      <table className='forum-topics-list__table'>
        <thead>
          <tr>
            <th className='forum-topics-list__column-title'>Темы</th>
            <th className='forum-topics-list__column-title'>Сообщения</th>
          </tr>
        </thead>
        <tbody>
          {list.map(item => (
            <tr key={item.id}>
              <td>
                <Flex
                  className='forum-topics-list__item-title'
                  align='center'
                  onClick={() => navigate(`/forum/${item.id}`)}>
                  {item.topicName}
                </Flex>
              </td>
              <td>
                <Flex
                  className='forum-topics-list__item-messages-count'
                  align='center'
                  justify='center'>
                  123
                </Flex>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelButtonProps={{ className: 'forum-topics-list__cancel-button' }}
        okButtonProps={{ className: 'forum-topics-list__submit-button' }}
        okText='Создать тему'
        cancelText='Закрыть'
        className='forum-topics-list__modal'>
        <Form>
          <Input placeholder='Название темы' />
          <Input type='textarea' placeholder='Описание' />
        </Form>
      </Modal>
      <div className='forum-topics-list__right-column'>
        <ConfigProvider
          theme={{
            components: {
              Button: {
                defaultHoverColor: Color.Dark,
                defaultHoverBorderColor: Color.Dark,
                defaultHoverBg: 'transparent',
                defaultActiveBg: 'transparent',
              },
            },
          }}>
          <Button
            type='default'
            size='large'
            className='forum-topics-list__create-button'
            onClick={showModal}>
            Создать новую тему
          </Button>
        </ConfigProvider>
      </div>
    </Flex>
  );
};
