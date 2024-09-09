// src/LottieAnimation.js
import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

const LottieAnimation = () => {
  return (
    <Player
      src="https://lottie.host/654a6092-acc4-4ee6-bb26-399a588cba05/bEUJiDR8Wy.json"
      background="transparent"
      speed={1}
      style={{ width: 300, height: 300 }}
      loop
      autoplay
      controls
    />
  );
};

export default LottieAnimation;
