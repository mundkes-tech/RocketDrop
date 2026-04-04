import React from 'react';
import { Rocket } from 'lucide-react';

const SplashScreen = () => {
  return (
    <div className="splash-screen" role="status" aria-label="RocketDrop loading screen">
      <div className="splash-wrap">
        <div className="splash-orbit flex items-center justify-center">
          <Rocket size={52} className="text-white/90 animate-float" />
        </div>
        <h1 className="splash-title">RocketDrop</h1>
        <p className="splash-subtitle">Smart Commerce. Real-Time Drops.</p>
      </div>
    </div>
  );
};

export default SplashScreen;
