import React, { useMemo } from 'react';
import MainLayout from '../layouts/MainLayout';
import OrderCard from '../components/OrderCard';
import { useRocketDrop } from '../hooks/useRocketDrop';

const OrderHistoryPage = () => {
  const { orders, products } = useRocketDrop();
  const productMap = useMemo(() => new Map(products.map((product) => [product.id, product])), [products]);

  return (
    <MainLayout>
      <h1 className="text-4xl font-bold mb-6">Orders</h1>
      {orders.length ? (
        <div className="space-y-4">
          {orders.map((order) => <OrderCard key={order.id} order={order} productMap={productMap} />)}
        </div>
      ) : (
        <div className="card p-8 text-center text-slate-500">No orders yet.</div>
      )}
    </MainLayout>
  );
};

export default OrderHistoryPage;
