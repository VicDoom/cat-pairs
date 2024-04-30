import { Flex } from 'antd';
import './leader-card.css';
import { HOST, PREFIX_RESOURCES } from '@/helpers/constants/api';

interface LeaderCardProps {
  position: number;
  avatar?: string;
  name: string;
  score: number;
}

export const LeaderCard: React.FC<LeaderCardProps> = ({
  position,
  avatar,
  name,
  score,
}) => {
  // Нельзя было сохранять на сервер яндекса полный путь к картинке
  const getAvatar = (avatar?: string) => {
    if (!avatar) return undefined;
    if (/ya-praktikum\.tech\/[^#]+/.test(avatar)) {
      const match = avatar.match(/[^/]+\/[^/]+$/) || [];
      const parsed = match[0];
      if (parsed === 'v2/resourcesnull') return undefined;
      avatar = `/${parsed}`;
    }
    return `${HOST}${PREFIX_RESOURCES}${avatar}`;
  };

  const avatarUser = getAvatar(avatar);
  return (
    <Flex align='center' justify='center' className='leader-card'>
      <div className='leader-card__icon'></div>
      <div className='leader-card__position'>{position}</div>
      <img
        className='leader-card__avatar'
        src={avatarUser || '/public/cat-background.png'}
        alt={name}
      />
      <div className='leader-card__name'>{name}</div>
      <div className='leader-card__score'>{score}</div>
    </Flex>
  );
};
