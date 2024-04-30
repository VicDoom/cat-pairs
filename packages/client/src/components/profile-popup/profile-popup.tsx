import './profile-popup.css';
import { CloseOutlined } from '@ant-design/icons';
import { MouseEvent, useRef, useState } from 'react';
import { UserService } from '@/services/user';
import { useNotification } from '@/providers/notification-provider';

const DEFAULT_NAME_FILE = 'Выберите файл';

interface ProfilePopupProps {
  isPopupOpen: boolean;
  handleClosePopup: () => void;
  handleSetAvatar: (val: string) => void;
}

export const ProfilePopup = ({
  isPopupOpen,
  handleClosePopup,
  handleSetAvatar,
}: ProfilePopupProps) => {
  const { notify } = useNotification();
  const fileInput = useRef<HTMLInputElement>(null);
  const popupClass = `popup  ${isPopupOpen ? 'popup_opened' : ''}`;

  const [file, setFile] = useState<File | null>(null);
  const [nameFile, setNameFile] = useState<string>(DEFAULT_NAME_FILE);

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);
      new UserService()
        .changeAvatar(formData)
        .then(result => {
          handleSetAvatar(result.avatar);
          handleClosePopup();
          setFile(null);
        })
        .catch(err => notify('error', err?.message));
    } else {
      notify('error', DEFAULT_NAME_FILE);
      setNameFile(DEFAULT_NAME_FILE);
    }
  };

  const heandleOnChange = () => {
    const files = fileInput.current?.files || [];
    if (files.length > 0) {
      const file = files[0];
      setNameFile(file.name);
      setFile(file);
    }
  };

  const onClose = () => {
    handleClosePopup();
    setFile(null);
    setNameFile(DEFAULT_NAME_FILE);
  };

  return (
    <div className={popupClass}>
      <div className='popup__form-container'>
        <button
          className='popup__close-button'
          type='button'
          aria-label='закрыть'
          onClick={() => onClose()}>
          <CloseOutlined
            rev={undefined}
            style={{ fontSize: '150%', color: '#565A5D' }}
          />
        </button>
        <form className='popup__form'>
          <label htmlFor='fileInput' className='popup__form-input'>
            <input
              id='fileInput'
              className=''
              type='file'
              ref={fileInput}
              onChange={() => heandleOnChange()}
            />
            <span className='popup__form-button-choose'>{nameFile}</span>
          </label>
          <button
            className='popup__form-button'
            type='submit'
            onClick={e => handleSubmit(e)}>
            Поменять аватар
          </button>
        </form>
      </div>
    </div>
  );
};
