import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Sparkles } from 'lucide-react';
import { useRocketDrop } from '../hooks/useRocketDrop';
import CountdownTimer from './CountdownTimer';
import { PRODUCT_CARD_PLACEHOLDER } from '../utils/imageFallbacks';
import Badge from './Badge';
import Button from './Button';

const ProductCard = ({ product, serverTime, layout = 'compact' }) => {
  const { actions, wishlist } = useRocketDrop();
  const isWishlisted = wishlist.includes(product.id);
  const hasDrop = Boolean(product.dropTime);
  const canAddToCart = product.status === 'LIVE' && product.stock > 0;
  const isLive = product.status === 'LIVE';
  const isEditorial = layout === 'editorial';

  const statusBadge =
    product.status === 'LIVE'
      ? 'live'
      : product.status === 'SOLD_OUT'
      ? 'soldout'
      : 'upcoming';

  const rating = Number(product.rating || 4.6).toFixed(1);

  return (
    <article className={`group relative flex h-full overflow-hidden border border-slate-200/90 bg-white shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-slate-300/40 ${
      isEditorial
        ? 'rounded-3xl md:grid md:grid-cols-[42%_58%]'
        : 'flex-col rounded-2xl hover:-translate-y-1.5'
    }`}>
      <div className="pointer-events-none absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-[#F2D3A3] to-[#1E1B6A] opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#F2D3A3]/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className={`relative overflow-hidden bg-slate-100 ${isEditorial ? 'h-52 md:h-full' : 'h-44 md:h-48'}`}>
        <img
          src={product.primaryImageUrl || PRODUCT_CARD_PLACEHOLDER}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent opacity-60" />

        <div className="absolute left-3 top-3 z-10">
          <Badge variant={statusBadge}>{product.status.replace('_', ' ')}</Badge>
        </div>

        <button
          onClick={() => actions.toggleWishlist(product.id)}
          className="absolute right-3 top-3 z-10 rounded-full border border-white/70 bg-white/95 p-2 text-slate-600 shadow-sm backdrop-blur transition hover:scale-105 hover:text-[#1E1B6A]"
          title="Add to wishlist"
        >
          <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>

        {isLive && (
          <div className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#1E1B6A] backdrop-blur">
            <Sparkles size={12} />
            Hot Drop
          </div>
        )}

        {product.stock <= 10 && product.stock > 0 && (
          <div className="absolute bottom-3 left-3 z-10 rounded-full bg-[#1E1B6A]/90 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
            Only {product.stock} left
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/65">
            <span className="text-white font-bold text-lg">Sold Out</span>
          </div>
        )}
      </div>

      <div className={`flex flex-grow flex-col ${isEditorial ? 'p-5 md:p-6' : 'p-4 md:p-5'}`}>
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className={`font-bold text-[#1E1B6A] ${isEditorial ? 'line-clamp-2 text-xl md:text-2xl' : 'line-clamp-1 text-lg md:text-xl'}`}>
            {product.name}
          </h3>
          <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-600">
            <Star size={14} className="text-[#F2D3A3] fill-[#F2D3A3]" />
            {rating}
          </span>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.12em] text-slate-500">
          <span>{hasDrop ? `${product.status} Release` : 'Standard Product'}</span>
          <span className="h-1 w-1 rounded-full bg-slate-300" />
          <span>{product.categoryName || 'Curated'}</span>
        </div>

        {hasDrop && (
          <div className={`rounded-xl border border-slate-200 bg-slate-50/80 ${isEditorial ? 'mb-4 p-3' : 'mb-3 p-2.5'}`}>
            <CountdownTimer dropTime={product.dropTime} compact serverTime={serverTime} />
          </div>
        )}

        <div className="mt-auto">
          <div className={`flex items-center justify-between ${isEditorial ? 'mb-4' : 'mb-3'}`}>
            <span className={`font-black tracking-tight text-[#1E1B6A] ${isEditorial ? 'text-[1.9rem]' : 'text-2xl md:text-[1.7rem]'}`}>
              Rs {product.price}
            </span>
            <span className="text-xs uppercase tracking-wider text-slate-500">{product.stock > 0 ? 'In Stock' : 'Unavailable'}</span>
          </div>

          <div className={`grid gap-2 ${isEditorial ? 'grid-cols-2' : 'grid-cols-2'}`}>
            <Button
              as={Link}
              to={`/products/${product.id}`}
              variant="secondary"
              className="w-full text-center text-sm"
            >
              <Sparkles size={16} />
              View Details
            </Button>

            <Button
              onClick={() => actions.addToCart(product.id, 1)}
              className="w-full"
              disabled={!canAddToCart}
            >
              <ShoppingCart size={16} />
              {canAddToCart ? 'Add' : 'N/A'}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
