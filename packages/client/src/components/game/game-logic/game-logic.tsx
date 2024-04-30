import { Card, Difficulty, GameStatus } from '@/components/game/types';
import React from 'react';
import {
  calculateCardSize,
  loadImage,
  shuffleCards,
} from '@/utils/game-helpers';
import {
  CARD_SPACING,
  GAME_FIELD_SIZE,
  LEVEL_PAIR_COUNTS,
  PAIR_CARDS,
} from '@/components/game/constants';
import { drawCards } from '@/utils/graw-cards';
const THEME = 'light';

export class GameApi {
  cards: Card[] = [];
  foundPairs: number[] = [];
  level = 1;
  initialLevel = 1;
  countCards = 0;
  timerRunning = true;
  clickDisabled = false;
  paused = false;
  isFullscreen = false;
  cardBackImageName: string;
  cardBackImage: HTMLImageElement | null = null;
  cardImages: HTMLImageElement[] = [];
  remainingTime = 0;
  constructor(
    private readonly gameRef: React.RefObject<HTMLDivElement>,
    private readonly canvasRef: React.RefObject<HTMLCanvasElement>,
    private changeGameStatus: (status: GameStatus) => void,
    private readonly gameStatus: GameStatus = GameStatus.PRE_GAME,
    private selectedDifficulty: Difficulty = Difficulty.EASY,
    private readonly theme: 'light' | 'dark' = THEME
  ) {
    this.cardBackImageName =
      theme === THEME ? 'card-back-light.jpg' : 'card-back-dark.jpg';
    this.setLevel();
    this.initGame();
  }

  setLevel() {
    const savedLevel = localStorage.getItem('memory_game_level');
    if (savedLevel) {
      this.level = parseInt(savedLevel);
    }
  }
  private resetScore = () => {
    const savedScore = localStorage.getItem('memory_game_score');
    if (savedScore) {
      localStorage.setItem('memory_game_score', '');
    }
  };

  public initGame = async () => {
    this.resetScore();
    const numPairs = LEVEL_PAIR_COUNTS[this.level] || 32;
    this.countCards = numPairs * PAIR_CARDS;

    try {
      const cardBackImagePromise = loadImage(
        `public/images/cards/${this.cardBackImageName}`
      );
      const cardImagesPromises = Array.from(
        { length: numPairs },
        (_, index) => {
          return loadImage(`public/images/cards/card-${index + 1}.jpg`);
        }
      );

      const [cardBackImg, ...cardImgs] = await Promise.all([
        cardBackImagePromise,
        ...cardImagesPromises,
      ]);

      this.cardBackImage = cardBackImg;
      this.cardImages = cardImgs;

      const gameCards = Array.from(
        { length: numPairs },
        (_, index) => index + 1
      ).flatMap(value => [value, value]);
      shuffleCards(gameCards);

      this.cards = gameCards.map(value => ({
        value,
        flipped: false,
        x: 0,
        y: 0,
      }));

      this.timerRunning = true;
    } catch (error) {
      console.error('Failed to load images:', error);
    }
  };
  public setRemainingTime(time: number): void {
    this.remainingTime = time;
  }

  public handleCardClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const cardSize = calculateCardSize(
      this.cards.length,
      CARD_SPACING,
      GAME_FIELD_SIZE
    );
    if (this.clickDisabled || this.paused) return;

    const canvas = event.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    this.cards.forEach((card, index) => {
      if (
        mouseX >= card.x &&
        mouseX <= card.x + cardSize &&
        mouseY >= card.y &&
        mouseY <= card.y + cardSize
      ) {
        if (this.foundPairs.includes(card.value) || card.flipped) return;

        const newCards = [...this.cards];
        newCards[index].flipped = true;
        this.cards = newCards;

        const flippedCards = newCards.filter(
          card => card.flipped && !this.foundPairs.includes(card.value)
        );

        if (flippedCards.length === PAIR_CARDS) {
          this.clickDisabled = true;
          setTimeout(() => {
            const [firstCard, secondCard] = flippedCards;
            if (firstCard.value === secondCard.value) {
              this.foundPairs = [...this.foundPairs, firstCard.value];
              if (this.foundPairs.length === newCards.length / 2) {
                this.handleGameWon();
              }
            } else {
              this.cards = newCards.map(card => {
                if (card.flipped && !this.foundPairs.includes(card.value)) {
                  return { ...card, flipped: false };
                }
                return card;
              });
            }
            this.clickDisabled = false;
          }, 1000);
        }
      }
    });
  };

  private handleGameWon = () => {
    this.changeGameStatus(GameStatus.WON);
    const score =
      this.remainingTime *
      this.level *
      (this.selectedDifficulty === Difficulty.EASY ? 3 : 4);
    localStorage.setItem('memory_game_score', score.toString());
    this.timerRunning = false;
    const newLevel = this.level + 1;
    this.level = newLevel;
    this.foundPairs = [];
    localStorage.setItem('memory_game_level', newLevel.toString());
  };

  public handleGameOver = () => {
    this.changeGameStatus(GameStatus.LOST);
    this.timerRunning = false;
  };

  public handlePauseGame = () => {
    this.paused = !this.paused;
    this.timerRunning = !this.timerRunning;
    return this.paused;
  };
  public handleRestartGame = () => {
    this.paused = false;
    this.initGame();
  };
  public toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      const gameFieldWithControls = this.gameRef.current;

      gameFieldWithControls && gameFieldWithControls.requestFullscreen();
    } else {
      document.exitFullscreen();
    }

    this.isFullscreen = !this.isFullscreen;

    return this.isFullscreen;
  };

  public handleExitGame = () => {
    this.changeGameStatus(GameStatus.PRE_GAME);
    this.timerRunning = false;
    this.foundPairs = [];
    // Не уверен, нужно ли сбрасывать уровень при выходе из игры, если нет удалить
    this.level = this.initialLevel;
    localStorage.setItem('memory_game_level', this.initialLevel.toString());
  };

  public handleStartGame = () => {
    this.changeGameStatus(GameStatus.PLAYING);
    this.level = this.initialLevel;
    localStorage.setItem('memory_game_level', this.initialLevel.toString());
    this.initGame();
  };
  public getSelectedDifficulty = (): Difficulty => {
    return this.selectedDifficulty;
  };

  public setSelectedDifficulty = (selectedValue: Difficulty) => {
    this.selectedDifficulty = selectedValue;
  };
  public getLevel = () => {
    return this.level;
  };
  public getTimerRunning = () => {
    return this.timerRunning;
  };
  public getTimeLeft = () => {
    const baseTime =
      this.countCards * (this.selectedDifficulty === Difficulty.EASY ? 4 : 3) -
      10 * Math.max(this.level - 4, 0);
    return Math.round(baseTime / 10) * 10;
  };
  public getPaused = (): boolean => {
    return this.paused;
  };
  public getCards = () => {
    return this.cards;
  };
  public getCardImages = () => {
    return this.cardImages;
  };
  public getCardBackImage = () => {
    return this.cardBackImage;
  };

  public render = () => {
    const animate = () => {
      if (this.timerRunning && !this.paused) {
        this.drawCards();
      }
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  };

  public drawCards() {
    drawCards(this.canvasRef, this.cards, this.cardImages, this.cardBackImage);
  }
}
