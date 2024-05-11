import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setPageTitle } from '@/helpers/helper';
import { PageWrapper } from '@/components';
import { ForumTopicsList } from '@/components';
import { FORUM_TOPICS_LIST } from '@/helpers/constants/forum';
import { ExitButton } from '@/components';
import { withAuthRouteHOC } from '@/helpers/hooks/withAuthRouteHOC';

const ForumPage = () => {
  // const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();
  // const forumAuthToken = localStorage.getItem('forumAuthToken');
  const [forumTopicsList, setForumTopicsList] = useState(null);

  useEffect(() => {
    // if (!isAuthorized) {
    //   navigate('/forum/login');
    // }
    const fetchForumTopics = async () => {
      const forumAuthToken = localStorage.getItem('forumAuthToken') || '';
      const response = await fetch(
        'http://localhost:3001/api/server/topic/getAll',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${encodeURIComponent(forumAuthToken)}`,
          },
        }
      );

      const result = await response.json();

      if (response.status === 403) {
        navigate('/forum/login');
      }
      console.log(response.status);
      console.log(result);
      setForumTopicsList(result);
    };

    fetchForumTopics();
  }, []);

  setPageTitle('Форум');

  return (
    <PageWrapper>
      <>
        {forumTopicsList && <ForumTopicsList list={forumTopicsList} />}
        <ExitButton />
      </>
    </PageWrapper>
  );
};

export default withAuthRouteHOC(ForumPage);
