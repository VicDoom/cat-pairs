import { useEffect, useState } from 'react';
import './profile-avatar.css';
import { ProfilePopup } from '@/components/profile-popup';
import { YANDEX_API_HOST } from '@/helpers/constants/api';
import { useAppSelector } from '@/helpers/hooks/storeHooks';

export const ProfileAvatar = () => {
  const [image, setImage] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const avatar = useAppSelector(state => state.user.currentUser.avatar);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSetAvatar = (val: string) => {
    setImage(`${YANDEX_API_HOST}/resources${val}`);
  };

  useEffect(() => {
    setImage(`${YANDEX_API_HOST}/resources${avatar}`);
  }, []);

  return (
    <>
      <ProfilePopup
        isPopupOpen={isPopupOpen}
        handleClosePopup={handleClosePopup}
        handleSetAvatar={handleSetAvatar}
      />
      <div className='profile-avatar' onClick={handleOpenPopup}>
        {image ? (
          <img
            className='profile-avatar__img'
            src={image}
            alt='фото пользователя'
          />
        ) : (
          <p className='profile-avatar__text'>фото</p>
        )}
      </div>
    </>
  );
};
