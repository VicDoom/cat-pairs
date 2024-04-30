import { useEffect, useState } from 'react';
import './profile-avatar.css';
import { ProfilePopup } from '@/components/profile-popup';
import { HOST, PREFIX_RESOURCES } from '@/helpers/constants/api';
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
    setImage(`${HOST}${PREFIX_RESOURCES}${val}`);
  };

  useEffect(() => {
    if (avatar) {
      setImage(`${HOST}${PREFIX_RESOURCES}${avatar}`);
    }
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
