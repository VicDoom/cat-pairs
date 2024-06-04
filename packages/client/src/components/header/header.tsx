import { useNavigate } from 'react-router-dom';
import { NavigationBar } from '@/components';
import './header.css';

export interface HeaderProps {
  withMenu?: boolean;
}

export const Header = ({ withMenu }: HeaderProps): JSX.Element => {
  const navigate = useNavigate();

  return (
    <header className='header'>
      <img
        src='/cat-background.png'
        alt='cat-background'
        className='header__cat-background'
        onClick={() => navigate('/')}
      />
      {withMenu && <NavigationBar className='header__navigation-bar' />}
    </header>
  );
};
