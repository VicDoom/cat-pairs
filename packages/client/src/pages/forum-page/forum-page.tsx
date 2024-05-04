import { setPageTitle } from '@/helpers/helper';
import { PageWrapper } from '@/components';
import { ForumTopicsList } from '@/components';
import { FORUM_TOPICS_LIST } from '@/helpers/constants/forum';
import { ExitButton } from '@/components';
import { withAuthRouteHOC } from '@/helpers/hooks/withAuthRouteHOC';

const ForumPage = () => {
  setPageTitle('Форум');
  //тестовый запрос
  const handleTestCreateTopic = async () => {
    const response = await fetch(
      'http://localhost:3001/api/server/topic/create',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInVzZXJOYW1lIjoidGVzdDIwIiwiaWF0IjoxNzE0Nzk3MDkzLCJleHAiOjE3MTQ4ODM0OTN9.To_WYDVb0fP3aHfm0wLTvqZmpqMCq5Ky72xRfO5u53g',
        },
        body: JSON.stringify({
          topicName: 'тестовая тема',
          description: 'описание тестовой темы',
        }),
      }
    );

    const result = await response.json();
    console.log(result);
  };

  return (
    <PageWrapper>
      <>
        <button onClick={handleTestCreateTopic}>создать тему</button>
        <ForumTopicsList list={FORUM_TOPICS_LIST} />
        <ExitButton />
      </>
    </PageWrapper>
  );
};

export default withAuthRouteHOC(ForumPage);
