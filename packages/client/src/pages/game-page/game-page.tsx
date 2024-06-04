import {
  ExitButton,
  GameEndScreen,
  GameLoader,
  GameStartScreen,
  PageWrapper,
  VolumeControl,
} from '@/components';
import { Difficulty, GameStatus } from '@/components/game/types';
import React, { useState } from 'react';
import './game-page.css';
import { Game } from '@/components/game/game';
import { withAuthRouteHOC } from '@/helpers/hooks/withAuthRouteHOC';
import { useAppSelector } from '@/helpers/hooks/storeHooks';
import { Theme } from '@/helpers/constants/global';
import { useNavigate } from 'react-router-dom';

const GamePage = () => {
  const theme = useAppSelector(state => state.user.theme) as Theme;
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.PRE_GAME);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(
    Difficulty.EASY
  );
  const navigate = useNavigate();
  const handleExitGame = () => {
    navigate('/');
  };

  return (
    <PageWrapper>
      <>
        <div className='game-page'>
          <VolumeControl src='/media/song.mp3' />
          {gameStatus === GameStatus.PRE_GAME && (
            <GameStartScreen
              theme={theme}
              selectedDifficulty={selectedDifficulty}
              onStartGame={() => {
                setGameStatus(GameStatus.LOAD);
              }}
              onDifficultyChange={difficulty =>
                setSelectedDifficulty(difficulty)
              }
            />
          )}
          {gameStatus === GameStatus.LOAD && (
            <GameLoader
              theme={theme}
              changeGameStatus={status => {
                setGameStatus(status);
              }}
            />
          )}
          {gameStatus === GameStatus.PLAYING && (
            <Game
              changeGameStatus={status => {
                setGameStatus(status);
              }}
              gameStatus={gameStatus}
              selectedDifficulty={selectedDifficulty}
              theme={theme}
            />
          )}
          {(gameStatus === GameStatus.WON ||
            gameStatus === GameStatus.LOST) && (
            <GameEndScreen
              status={gameStatus}
              onRestartGame={() => {
                setGameStatus(GameStatus.LOAD);
              }}
            />
          )}
        </div>
        <div className='game__exit-wrapper'>
          <ExitButton onClick={handleExitGame} />
        </div>
      </>
    </PageWrapper>
  );
};

export default withAuthRouteHOC(GamePage);
