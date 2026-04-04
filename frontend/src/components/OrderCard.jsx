import React from 'react';
import Badge from './Badge';

const orderStatusVariant = {
  DELIVERED: 'success',
  PENDING: 'warning',
  CANCELLED: 'danger',
};

const toStatusLabel = (status = '') => status.toString().replace('_', ' ');

const OrderCard = ({ order, productMap }) => {
  const normalizedStatus = (order.status || '').toUpperCase();
  const statusVariant = orderStatusVariant[normalizedStatus] || 'accent';
  const orderDate = order.createdAt || order.date;

  return (
    <article className="rd-card p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-xl font-semibold text-[#1E1B6A]">Order {order.id}</h3>
          <p className="text-sm text-slate-500">{orderDate ? new Date(orderDate).toLocaleString() : 'Recently placed'}</p>
        </div>
        <Badge variant={statusVariant}>{toStatusLabel(order.status)}</Badge>
      </div>
      <div className="space-y-2 mb-4">
        {order.items.map((item) => {
          const product = productMap.get(item.productId);
          const image = product?.primaryImageUrl || item.imageUrl;
          return (
            <div key={`${order.id}-${item.productId}`} className="flex items-center justify-between gap-3 rounded-lg border border-slate-100 p-3">
              <div className="flex items-center gap-3">
                {image && <img src={image} alt={product?.name || item.productId} className="h-14 w-14 rounded-lg object-cover" />}
                <div>
                  <p className="text-sm font-medium text-slate-800">{product?.name || item.productId}</p>
                  <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-[#1E1B6A]">INR {item.price * item.quantity}</span>
            </div>
          );
        })}
      </div>
      <div className="border-t border-slate-200 pt-3 flex justify-between font-semibold">
        <span className="text-slate-700">Total</span>
        <span className="text-[#1E1B6A]">INR {order.totalPrice || order.total}</span>
      </div>
    </article>
  );
};

export default OrderCard;
