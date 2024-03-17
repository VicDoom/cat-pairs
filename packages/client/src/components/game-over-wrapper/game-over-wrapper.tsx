/*import { Button } from 'antd';*/
import { useNavigate } from 'react-router-dom';
import './game-over-wrapper.css';
import { Button } from '@/components/button';

interface GameOverWrapperProps {
  title: string;
  message: string;
  buttonText: string;
}

export const GameOverWrapper = ({
  title,
  message,
  buttonText,
}: GameOverWrapperProps) => {
  const navigate = useNavigate();
  return (
    <div className='game-over-wrapper'>
      <h1 className='game-over-wrapper__title'>{title}</h1>
      <p className='game-over-wrapper__text'>{message}</p>
      <Button label={buttonText} onClick={() => navigate('/start')} />
    </div>
  );
};
