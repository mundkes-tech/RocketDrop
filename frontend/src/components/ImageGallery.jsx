import React, { useState } from 'react';
import { GALLERY_PLACEHOLDER } from '../utils/imageFallbacks';

const ImageGallery = ({ images = [], alt }) => {
  const [active, setActive] = useState(0);
  const safe = images.length ? images : [GALLERY_PLACEHOLDER];

  return (
    <div className="space-y-3">
      <img src={safe[active]} alt={alt} className="w-full h-[420px] rounded-2xl object-cover" />
      <div className="grid grid-cols-4 gap-3">
        {safe.map((image, index) => (
          <button key={image + index} onClick={() => setActive(index)} className={`rounded-xl overflow-hidden border-2 ${active === index ? 'border-primary' : 'border-transparent'}`}>
            <img src={image} alt={`${alt}-${index}`} className="w-full h-20 object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
