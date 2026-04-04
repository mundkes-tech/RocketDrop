import React from 'react';
import { useRocketDrop } from '../hooks/useRocketDrop';
import OrderCard from '../components/OrderCard';
import { AlertTriangle } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import SectionContainer from '../components/SectionContainer';
import SkeletonCard from '../components/SkeletonCard';

const MyOrdersPage = () => {
  const { orders, loading, error, products } = useRocketDrop();

  const productMap = React.useMemo(() => {
    const map = new Map();
    products.forEach((product) => {
      map.set(product.id, product);
    });
    return map;
  }, [products]);


  const renderContent = () => {
    if (loading) {
      return (
        <div className="grid md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, index) => <SkeletonCard key={index} />)}
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-64 bg-red-50 text-red-700 rounded-lg border border-red-200">
          <AlertTriangle className="w-12 h-12 mb-4" />
          <h3 className="text-xl font-semibold">Failed to load orders</h3>
          <p>{error}</p>
        </div>
      );
    }

    if (!orders.length) {
      return (
        <div className="rd-card text-center py-16">
          <h2 className="text-2xl font-semibold text-[#1E1B6A] mb-2">No Orders Yet</h2>
          <p className="text-slate-500">Looks like you have not placed any orders yet. Start shopping to see them here.</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} productMap={productMap} />
        ))}
      </div>
    );
  };

  return (
    <MainLayout>
      <section className="bg-gradient-to-r from-[#FFF7ED] to-[#F8FAFC] text-[#1E1B6A] rounded-2xl border border-[#E5E7EB] mt-8">
        <div className="container py-10">
          <h1 className="text-4xl md:text-5xl font-bold">My Orders</h1>
          <p className="text-slate-600 mt-2">Track your past and present orders in one place.</p>
        </div>
      </section>

      <SectionContainer className="bg-white">
        {renderContent()}
      </SectionContainer>
    </MainLayout>
  );
};

export default MyOrdersPage;
