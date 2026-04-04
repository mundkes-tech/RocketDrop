import React from 'react';
import { Clock3, Flame } from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import { Link } from 'react-router-dom';
import Badge from './Badge';
import { PRODUCT_CARD_PLACEHOLDER } from '../utils/imageFallbacks';

const DropCard = ({ product, serverTime }) => {
  const isLive = product.status === 'LIVE';
  const soldOut = product.status === 'SOLD_OUT';

  const badge = isLive ? 'live' : soldOut ? 'soldout' : 'upcoming';

  return (
    <article className="rd-card p-4 flex gap-4 items-start transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
      <img src={product.primaryImageUrl || PRODUCT_CARD_PLACEHOLDER} alt={product.name} className="w-20 h-20 rounded-xl object-cover" />
      <div className="flex-1">
        <div className="flex items-center justify-between gap-3 mb-1">
          <h3 className="font-semibold text-lg text-[#1E1B6A]">{product.name}</h3>
          <Badge variant={badge}>
            {isLive ? 'LIVE' : soldOut ? 'SOLD OUT' : 'UPCOMING'}
          </Badge>
        </div>
        <p className="text-sm text-slate-500 mb-2">INR {product.price}</p>
        {!isLive && !soldOut ? (
          <div className="flex items-center gap-2 text-slate-600">
            <Clock3 size={16} />
            <CountdownTimer dropTime={product.dropTime} compact serverTime={serverTime} />
          </div>
        ) : (
          <div className="flex items-center gap-2 text-[#1E1B6A]">
            <Flame size={16} />
            <span className="text-sm font-semibold">{soldOut ? 'Release Ended' : 'Live right now'}</span>
          </div>
        )}
        <Link to={`/products/${product.id}`} className="text-sm text-[#1E1B6A] hover:text-[#15134f] font-semibold mt-2 inline-block transition-colors">View Product</Link>
      </div>
    </article>
  );
};

export default DropCard;
