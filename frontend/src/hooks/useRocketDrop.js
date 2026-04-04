import { useContext } from 'react';
import { RocketDropContext } from '../context/RocketDropContextObject';

export const useRocketDrop = () => {
  const context = useContext(RocketDropContext);
  if (!context) {
    throw new Error('useRocketDrop must be used inside RocketDropProvider');
  }
  return context;
};
