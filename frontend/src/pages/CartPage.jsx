import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import CartItem from '../components/CartItem';
import { useRocketDrop } from '../hooks/useRocketDrop';
import SectionContainer from '../components/SectionContainer';
import Button from '../components/Button';

const CartPage = () => {
  const { cart, products, actions } = useRocketDrop();

  const productMap = useMemo(() => new Map(products.map((product) => [product.id, product])), [products]);

  const total = cart.reduce((sum, item) => {
    const product = productMap.get(item.productId);
    if (!product) return sum;
    return sum + product.price * item.quantity;
  }, 0);

  return (
    <MainLayout>
      <section className="bg-gradient-to-r from-[#FFF7ED] to-[#F8FAFC] text-[#1E1B6A] rounded-2xl border border-[#E5E7EB] mt-8">
        <div className="container py-10">
          <h1 className="text-4xl md:text-5xl font-bold">Your Cart</h1>
          <p className="text-slate-600 mt-2">Review your selected products before checkout.</p>
        </div>
      </section>

      <SectionContainer className="bg-white">
        {cart.length ? (
          <div className="grid lg:grid-cols-[1fr_340px] gap-6">
            <div className="space-y-4">
              {cart.map((item) => {
                const product = productMap.get(item.productId);
                if (!product) return null;
                return (
                  <CartItem
                    key={item.id}
                    item={item}
                    product={product}
                    onQuantityChange={actions.updateCartItem}
                    onRemove={actions.removeCartItem}
                  />
                );
              })}
            </div>

            <aside className="rd-card p-5 h-fit sticky top-24">
              <h2 className="text-2xl font-bold mb-4 text-[#1E1B6A]">Summary</h2>
              <div className="flex justify-between text-sm mb-2 text-slate-600"><span>Items</span><span>{cart.length}</span></div>
              <div className="flex justify-between text-lg font-semibold border-t border-slate-200 pt-3 mt-3 text-[#1E1B6A]"><span>Total</span><span>INR {total}</span></div>
              <Button as={Link} to="/checkout" className="w-full mt-4">Proceed to Checkout</Button>
            </aside>
          </div>
        ) : (
          <div className="rd-card p-8 text-center">
            <p className="text-slate-500 mb-4">Your cart is empty.</p>
            <Button as={Link} to="/products">Browse Products</Button>
          </div>
        )}
      </SectionContainer>
    </MainLayout>
  );
};

export default CartPage;
