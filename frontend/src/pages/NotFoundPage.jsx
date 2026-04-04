import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/Button';

const NotFoundPage = () => {
  return (
    <MainLayout>
      <div className="bg-[#F8FAFC] text-[#1E1B6A]">
        {/* Hero 404 Section */}
        <section className="bg-gradient-to-r from-[#FFF7ED] to-[#F8FAFC] py-32 text-[#1E1B6A] border-y border-[#E5E7EB]">
          <div className="container px-4 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-[#F2D3A3]/20 p-6 rounded-2xl">
                <AlertTriangle size={80} className="text-[#F2D3A3]" />
              </div>
            </div>
            <h1 className="text-9xl md:text-[120px] font-black mb-4 text-[#F2D3A3]">404</h1>
            <p className="text-2xl md:text-4xl font-bold mb-4">Page Not Found</p>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8">
              Oops! We couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
            </p>
          </div>
        </section>

        {/* Help Section */}
        <section className="bg-white py-16">
          <div className="container px-4">
            <div className="rd-card p-12 text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-[#1E1B6A] mb-4">Let's get you back on track</h2>
              <p className="text-slate-600 mb-8">
                Check out our latest drops, browse our product catalog, or explore by category
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button as={Link} to="/" className="flex items-center justify-center gap-2">
                  <Home size={20} />
                  Go to Home
                </Button>
                <Button
                  as={Link}
                  to="/drops"
                  variant="secondary"
                  className="flex items-center justify-center gap-2"
                >
                  View Drops
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Suggestions Section */}
        <section className="bg-slate-50 py-16">
          <div className="container px-4">
            <h2 className="text-3xl font-bold text-[#1E1B6A] text-center mb-12">Popular Pages</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <Link
                to="/products"
                className="rd-card p-6 text-center hover:shadow-md transition-all duration-300"
              >
                <div className="bg-[#1E1B6A]/10 p-3 rounded-lg w-fit mx-auto mb-3">
                  <span className="text-2xl">🛍️</span>
                </div>
                <h3 className="font-semibold text-[#1E1B6A] mb-2">Shop Products</h3>
                <p className="text-xs text-slate-500">Browse our complete catalog</p>
              </Link>

              <Link
                to="/drops"
                className="rd-card p-6 text-center hover:shadow-md transition-all duration-300"
              >
                <div className="bg-[#F2D3A3]/20 p-3 rounded-lg w-fit mx-auto mb-3">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="font-semibold text-[#1E1B6A] mb-2">Explore Drops</h3>
                <p className="text-xs text-slate-500">Check live and upcoming releases</p>
              </Link>

              <Link
                to="/cart"
                className="rd-card p-6 text-center hover:shadow-md transition-all duration-300"
              >
                <div className="bg-emerald-100 p-3 rounded-lg w-fit mx-auto mb-3">
                  <span className="text-2xl">🛒</span>
                </div>
                <h3 className="font-semibold text-[#1E1B6A] mb-2">View Cart</h3>
                <p className="text-xs text-slate-500">See your saved items</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default NotFoundPage;
