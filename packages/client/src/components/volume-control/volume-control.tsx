import React, { useEffect, useRef, useState } from 'react';
import { MutedOutlined, SoundOutlined } from '@ant-design/icons';
import './volume-control.css';
import { localStorageGetItem, localStorageSetItem } from '@/helpers';

interface VolumeControlProps {
  src: string;
}

export const VolumeControl: React.FC<VolumeControlProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState<boolean>(() => {
    const storedMuted = localStorageGetItem('muted');
    return storedMuted ? JSON.parse(storedMuted) : true;
  });
  const [volume, setVolume] = useState(() => {
    const storedVolume = localStorageGetItem('volume');
    return storedVolume ? parseFloat(storedVolume) : 0.5;
  });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    localStorageSetItem('muted', JSON.stringify(muted));
    localStorageSetItem('volume', volume.toString());
    if (audioRef.current) {
      audioRef.current.muted = muted;
      audioRef.current.volume = volume;
    }
  }, [muted, volume]);

  const handleToggleMute = () => {
    if (muted) {
      audioRef.current?.play();
    }
    setMuted(!muted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div
      className='volume-control'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      {hovered && (
        <input
          type='range'
          min='0'
          max='1'
          step='0.01'
          value={volume}
          onChange={handleVolumeChange}
          className='volume-control__volume'
        />
      )}
      <button onClick={handleToggleMute} className={'volume-control__button'}>
        {muted ? <MutedOutlined /> : <SoundOutlined />}
      </button>
      <audio ref={audioRef} src={src} autoPlay loop></audio>
    </div>
  );
};
