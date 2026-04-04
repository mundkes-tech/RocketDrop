import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1E1B6A] text-white mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-white">
              <Rocket className="text-[#F2D3A3]" />
              <span>RocketDrop</span>
            </Link>
            <p className="text-white/70 mt-4 text-sm">
              The future of exclusive drops and premium products.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-white/70 hover:text-[#F2D3A3] transition-colors">Products</Link></li>
              <li><Link to="/drops" className="text-white/70 hover:text-[#F2D3A3] transition-colors">Drops</Link></li>
              <li><Link to="/categories" className="text-white/70 hover:text-[#F2D3A3] transition-colors">Categories</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Account</h4>
            <ul className="space-y-2">
              <li><Link to="/profile" className="text-white/70 hover:text-[#F2D3A3] transition-colors">My Profile</Link></li>
              <li><Link to="/orders" className="text-white/70 hover:text-[#F2D3A3] transition-colors">My Orders</Link></li>
              <li><Link to="/wishlist" className="text-white/70 hover:text-[#F2D3A3] transition-colors">Wishlist</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-white/70 hover:text-[#F2D3A3] transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-white/70 hover:text-[#F2D3A3] transition-colors">Contact</Link></li>
              <li><Link to="/faq" className="text-white/70 hover:text-[#F2D3A3] transition-colors">FAQ</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-white/15 pt-8 flex flex-wrap gap-3 justify-between items-center">
          <p className="text-white/70 text-sm">
            &copy; {new Date().getFullYear()} RocketDrop. All Rights Reserved.
          </p>
          <div className="flex space-x-4">
            <Link to="/terms" className="text-white/70 hover:text-[#F2D3A3] text-sm transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="text-white/70 hover:text-[#F2D3A3] text-sm transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
