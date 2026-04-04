import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ProductCard from '../components/ProductCard';
import { useRocketDrop } from '../hooks/useRocketDrop';
import SectionContainer from '../components/SectionContainer';
import Button from '../components/Button';

const WishlistPage = () => {
  const { wishlist, products } = useRocketDrop();
  const wishProducts = products.filter((product) => wishlist.includes(product.id));

  return (
    <MainLayout>
      <section className="bg-gradient-to-r from-[#FFF7ED] to-[#F8FAFC] text-[#1E1B6A] rounded-2xl border border-[#E5E7EB] mt-8">
        <div className="container py-10">
          <h1 className="text-4xl md:text-5xl font-bold">Wishlist</h1>
          <p className="text-slate-600 mt-2">Your saved favorites, ready when you are.</p>
        </div>
      </section>

      <SectionContainer className="bg-white">
        {wishProducts.length ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {wishProducts.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        ) : (
          <div className="rd-card p-8 text-center text-slate-500">
            <p className="mb-4">No saved items yet.</p>
            <Button as={Link} to="/products">Browse Products</Button>
          </div>
        )}
      </SectionContainer>
    </MainLayout>
  );
};

export default WishlistPage;
