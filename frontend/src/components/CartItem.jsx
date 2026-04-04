import React from 'react';
import { PRODUCT_CARD_PLACEHOLDER } from '../utils/imageFallbacks';

const CartItem = ({ item, product, onQuantityChange, onRemove }) => {
  const subtotal = product.price * item.quantity;

  return (
    <div className="rd-card p-4 flex flex-col md:flex-row gap-4 md:items-center transition-all duration-300 hover:shadow-md">
      <img src={product.primaryImageUrl || PRODUCT_CARD_PLACEHOLDER} alt={product.name} className="w-full md:w-28 h-28 rounded-xl object-cover" />
      <div className="flex-1">
        <h3 className="font-semibold text-xl text-[#1E1B6A]">{product.name}</h3>
        <p className="text-sm text-slate-500 mb-2">INR {product.price}</p>
        <div className="flex gap-3 items-center">
          <label className="text-sm text-slate-600">Qty</label>
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(event) => onQuantityChange(item.productId, Number(event.target.value))}
            className="w-20 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-[#1E1B6A] focus:ring-2 focus:ring-[#1E1B6A]/10"
          />
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold text-lg text-[#1E1B6A]">INR {subtotal}</p>
        <button onClick={() => onRemove(item.productId)} className="text-sm text-red-600 mt-2 hover:text-red-700 transition-colors">Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
