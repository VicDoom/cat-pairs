import { PageWrapper, ProfileAvatar, ProfileForm } from '@/components';
import './profile-page.css';
import { useNavigate } from 'react-router-dom';
import { ExitButton } from '@/components/exit-button';
import { withAuthRouteHOC } from '@/helpers/hooks/withAuthRouteHOC';

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <div className='profile-page'>
        <div className='profile-page__container'>
          <ProfileAvatar />
          <ProfileForm />
          <p
            className='profile-page__change-password'
            onClick={() => navigate('../change-password')}>
            Сменить пароль
          </p>
        </div>
        <div className='profile-page__exit'>
          <ExitButton />
        </div>
      </div>
    </PageWrapper>
  );
};

export default withAuthRouteHOC(ProfilePage);
