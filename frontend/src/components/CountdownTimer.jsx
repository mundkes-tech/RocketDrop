import React from 'react';
import { useCountdown } from '../hooks/useCountdown';

const CountdownTimer = ({ dropTime, compact = false, serverTime = null }) => {
  const { hours, minutes, seconds, isLive: countdownIsLive, hasEnded } = useCountdown(dropTime, serverTime);

  if (hasEnded && countdownIsLive) {
    return <span className={compact ? 'text-red-600 font-semibold' : 'text-red-600 font-bold text-2xl animate-pulse'}>LIVE NOW</span>;
  }

  if (compact) {
    return <span className="font-mono text-sm tabular-nums">{hours}:{minutes}:{seconds}</span>;
  }

  return (
    <div className="text-center">
      <p className="text-sm text-gray-600 mb-2">Starts in</p>
      <div className="countdown-timer font-mono">
        <span className="text-green-600">{hours}</span>
        <span className="text-gray-800">:</span>
        <span className="text-green-600">{minutes}</span>
        <span className="text-gray-800">:</span>
        <span className="text-green-600">{seconds}</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
