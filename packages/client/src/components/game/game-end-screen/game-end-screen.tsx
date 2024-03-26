import './game-end-screen.css';
import { GameEndWrapper } from '@/components';
import Confetti from 'react-confetti';
import { ExitButton } from '@/components/exit-button';
import React from 'react';
import { GameStatus } from '@/components/game/types';

interface GameEndScreenProps {
  status: GameStatus;
  onRestartGame: () => void;
}
export const GameEndScreen: React.FC<GameEndScreenProps> = ({
  status,
  onRestartGame,
}) => {
  return (
    <>
      {status === GameStatus.WON && (
        <div>
          <Confetti style={{ outline: '1px solid red' }} />
          <GameEndWrapper
            title='Поздравляем!'
            message='Вы перешли на следующий уровень'
            buttonText='Продолжить игру'
            handleClick={onRestartGame}
          />
        </div>
      )}
      {status === GameStatus.LOST && (
        <GameEndWrapper
          title='Вы проиграли'
          message='Попробуйте еще раз'
          buttonText='Играть'
          handleClick={onRestartGame}
        />
      )}
      <ExitButton onClick={onRestartGame} />
    </>
  );
};
