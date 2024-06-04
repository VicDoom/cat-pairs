import { PageWrapper, ProfileAvatar, ProfileForm } from '@/components';
import './profile-page.css';
import { useNavigate } from 'react-router-dom';
import { ExitButton } from '@/components/exit-button';
import { withAuthRouteHOC } from '@/helpers/hooks/withAuthRouteHOC';
import { useAppSelector } from '@/helpers/hooks/storeHooks';
import { Theme } from '@/helpers/constants/global';

const ProfilePage = () => {
  const navigate = useNavigate();
  const theme = useAppSelector(state => state.user.theme);

  return (
    <PageWrapper>
      <>
        <div
          className={[
            'profile-page',
            theme === Theme.Dark ? 'profile-page--dark' : null,
          ].join(' ')}>
          <div className='profile-page__container'>
            <ProfileAvatar />
            <ProfileForm />
            <p
              className='profile-page__change-password'
              onClick={() => navigate('../change-password')}>
              Сменить пароль
            </p>
          </div>
        </div>
        <div className='profile-page__exit'>
          <ExitButton />
        </div>
      </>
    </PageWrapper>
  );
};

export default withAuthRouteHOC(ProfilePage);
