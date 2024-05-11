import { PageWrapper } from '@/components';
import { ForumLogin } from '@/components';
import { withAuthRouteHOC } from '@/helpers/hooks/withAuthRouteHOC';

const ForumLoginPage = () => {
  return (
    <PageWrapper>
      <ForumLogin />
    </PageWrapper>
  );
};

export default withAuthRouteHOC(ForumLoginPage);
