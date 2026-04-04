import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { useRocketDrop } from '../hooks/useRocketDrop';
import SectionContainer from '../components/SectionContainer';
import Button from '../components/Button';

const CheckoutPage = () => {
  const { cart, products, addresses, actions } = useRocketDrop();
  const [selectedAddressId, setSelectedAddressId] = useState(addresses[0]?.id || '');
  const navigate = useNavigate();

  const total = useMemo(() => {
    return cart.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return sum;
      return sum + product.price * item.quantity;
    }, 0);
  }, [cart, products]);

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) return;
    await actions.placeOrder(selectedAddressId);
    navigate('/orders');
  };

  return (
    <MainLayout>
      <section className="bg-gradient-to-r from-[#FFF7ED] to-[#F8FAFC] text-[#1E1B6A] rounded-2xl border border-[#E5E7EB] mt-8">
        <div className="container py-10">
          <h1 className="text-4xl md:text-5xl font-bold">Checkout</h1>
          <p className="text-slate-600 mt-2">Confirm address and place your order securely.</p>
        </div>
      </section>

      <SectionContainer className="bg-white">
        <div className="grid lg:grid-cols-[1fr_340px] gap-6">
          <section className="rd-card p-6">
            <h2 className="text-2xl font-semibold mb-4 text-[#1E1B6A]">Delivery Address</h2>
            {addresses.length ? (
              <div className="space-y-3">
                {addresses.map((address) => (
                  <label key={address.id} className="flex gap-3 items-start border border-slate-200 rounded-xl p-3 hover:border-[#1E1B6A]/40 transition-colors">
                    <input type="radio" checked={selectedAddressId === address.id} onChange={() => setSelectedAddressId(address.id)} />
                    <span className="text-sm text-slate-700">{address.label}: {address.line1}, {address.city}, {address.state}, {address.zip}</span>
                  </label>
                ))}
              </div>
            ) : (
              <p className="text-slate-500">Add address in profile before checkout.</p>
            )}
          </section>

          <aside className="rd-card p-5 h-fit sticky top-24">
              <h3 className="text-xl font-semibold mb-3 text-[#1E1B6A]">Order Summary</h3>
              <p className="text-sm text-slate-500 mb-2">Items: {cart.length}</p>
              <p className="text-2xl font-bold mb-4 text-[#1E1B6A]">INR {total}</p>
            <Button onClick={handlePlaceOrder} disabled={!cart.length || !selectedAddressId} className="w-full">Place Order</Button>
          </aside>
        </div>
      </SectionContainer>
    </MainLayout>
  );
};

export default CheckoutPage;
