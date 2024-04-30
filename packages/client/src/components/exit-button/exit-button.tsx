import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './exit-button.css';
import { Color } from '@/helpers/constants/global';
import { AuthService } from '@/services/auth';
import { MessagePopup } from '@/components';
import { deleteCurrentUser } from '@/store/userSlice';
import { useAppDispatch } from '@/helpers/hooks/storeHooks';
import { useState } from 'react';
import React from 'react';
import { useAuth } from '@/helpers/hooks/useAuth';
import { REDIRECT_TO_LOGIN } from '@/helpers/constants/api';

interface ExitButtonProps extends JSX.IntrinsicAttributes {
  onClick?: () => void;
}

export const ExitButton: React.FC<ExitButtonProps> = props => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { deleteAuth } = useAuth();

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleExit = async () => {
    new AuthService()
      .logout()
      .then(() => {
        dispatch(deleteCurrentUser());
        deleteAuth?.();
        navigate(REDIRECT_TO_LOGIN);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => handleOpenPopup());
  };
  return (
    <>
      <MessagePopup
        message='Не удалось выйти из игры'
        backPath='/'
        isPopupOpen={isPopupOpen}
        handleClosePopup={handleClosePopup}
      />
      <div className='exit-button' onClick={props.onClick ?? handleExit}>
        <button role='exit' className='exit-button__button'>
          <p className='exit-button__button-text'>выход из игры</p>
          <LogoutOutlined
            style={{ fontSize: '150%', color: Color.Dark }}
            rev={undefined}
          />
        </button>
      </div>
    </>
  );
};
