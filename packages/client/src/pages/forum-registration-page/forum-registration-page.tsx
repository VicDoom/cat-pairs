import { ForumRegistration } from '@/components';
import { withAuthRouteHOC } from '@/helpers/hooks/withAuthRouteHOC';

const ForumRegistrationPage = () => {
  return <ForumRegistration />;
};

export default withAuthRouteHOC(ForumRegistrationPage);
