import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, Rocket, Settings, LogOut, ChevronRight } from 'lucide-react';
import { useRocketDrop } from '../hooks/useRocketDrop';
import Badge from './Badge';

const Navbar = () => {
  const { currentUser, cart, products, actions } = useRocketDrop();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const searchPanelRef = useRef(null);

  const role = String(currentUser?.role || '').toUpperCase();
  const isAdmin = role === 'ADMIN' || role === 'ROLE_ADMIN';

  const cartItemCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const navLinks = [
    { to: '/', text: 'Home' },
    { to: '/about', text: 'About' },
    { to: '/products', text: 'Products' },
    { to: '/drops', text: 'Drops' },
  ];

  if (currentUser) {
    if (isAdmin) {
      navLinks.push({ to: '/admin', text: 'Admin' });
    } else {
      navLinks.push({ to: '/orders', text: 'My Orders' });
    }
  }

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return [];
    return (products || [])
      .filter((item) => String(item?.name || '').toLowerCase().includes(query))
      .slice(0, 6);
  }, [products, searchTerm]);

  useEffect(() => {
    if (!isSearchOpen) return undefined;
    const onOutsideClick = (event) => {
      if (searchPanelRef.current && !searchPanelRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', onOutsideClick);
    return () => document.removeEventListener('mousedown', onOutsideClick);
  }, [isSearchOpen]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const query = searchTerm.trim();
    if (!query) return;
    setIsSearchOpen(false);
    navigate(`/products?search=${encodeURIComponent(query)}`);
  };

  const selectProduct = (id) => {
    setIsSearchOpen(false);
    setSearchTerm('');
    navigate(`/products/${id}`);
  };

  return (
    <nav className="bg-[#1E1B6A]/95 backdrop-blur-md sticky top-0 z-50 border-b border-white/10">
      <div className="container">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-white">
            <Rocket className="text-[#F2D3A3]" />
            <span>RocketDrop</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-white/80 hover:text-[#F2D3A3] transition-colors font-medium ${isActive ? 'text-[#F2D3A3]' : ''}`
                }
              >
                {link.text}
              </NavLink>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-5">
            <div className="relative" ref={searchPanelRef}>
              <button
                type="button"
                aria-label="Search products"
                onClick={() => setIsSearchOpen((prev) => !prev)}
                className="text-white/80 hover:text-[#F2D3A3] transition-colors"
              >
                <Search size={22} />
              </button>

              {isSearchOpen && (
                <div className="absolute right-0 mt-3 w-[min(92vw,420px)] rounded-2xl border border-slate-200 bg-white p-3 shadow-xl animate-fadeInUp">
                  <form onSubmit={handleSearchSubmit}>
                    <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2">
                      <Search size={16} className="text-slate-500" />
                      <input
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        className="w-full border-0 p-0 text-sm text-slate-800 outline-none"
                        placeholder="Search products..."
                        autoFocus
                      />
                    </div>
                  </form>

                  <div className="mt-3 max-h-72 overflow-y-auto">
                    {searchTerm.trim() && filteredProducts.length === 0 && (
                      <p className="px-2 py-3 text-sm text-slate-500">No matching products found.</p>
                    )}

                    {filteredProducts.map((product) => (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => selectProduct(product.id)}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-50"
                      >
                        <span className="font-medium">{product.name}</span>
                        <ChevronRight size={14} className="text-slate-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {!isAdmin && (
              <Link to="/cart" className="relative text-white/80 hover:text-[#F2D3A3] transition-colors">
                <ShoppingCart size={22} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2"><Badge>{cartItemCount}</Badge></span>
                )}
              </Link>
            )}

            {currentUser ? (
              <div
                className="relative"
                onMouseEnter={() => setIsProfileMenuOpen(true)}
                onMouseLeave={() => setIsProfileMenuOpen(false)}
              >
                <Link to={isAdmin ? '/admin' : '/profile'} className="inline-flex items-center text-white/80 hover:text-[#F2D3A3] transition-colors">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-full border bg-white/10 transition ${isProfileMenuOpen ? 'border-[#F2D3A3]/70 bg-white/20' : 'border-white/20'}`}>
                    <User size={18} />
                  </span>
                </Link>

                <div className={`absolute right-0 top-full mt-2 w-72 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl transition-all duration-200 ${isProfileMenuOpen ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-2 opacity-0'}`}>
                  <div className="rounded-xl bg-gradient-to-r from-slate-50 to-indigo-50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700">
                        {(currentUser.name || currentUser.email || 'U').slice(0, 1).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900">{currentUser.name || 'RocketDrop User'}</p>
                        <p className="truncate text-xs text-slate-500">{currentUser.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 space-y-1 p-1">
                    {isAdmin ? (
                      <Link to="/admin" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
                        <Settings size={15} />
                        Admin Dashboard
                      </Link>
                    ) : (
                      <>
                        <Link to="/profile" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
                          <User size={15} />
                          My Profile
                        </Link>
                        <Link to="/orders" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
                          <Settings size={15} />
                          My Orders
                        </Link>
                      </>
                    )}

                    <button
                      onClick={actions.logout}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                      <LogOut size={15} />
                      Logout
                    </button>
                  </div>
                </div>

              </div>
            ) : (
              <Link to="/login" className="hidden md:block bg-[#F2D3A3] text-[#1E1B6A] px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#ebc58b] transition-colors">
                Login
              </Link>
            )}
            <button
              className="md:hidden text-white/80 hover:text-[#F2D3A3] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#1E1B6A] border-t border-white/10 py-4">
          <div className="container flex flex-col space-y-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `text-white/80 hover:text-[#F2D3A3] text-lg ${isActive ? 'font-semibold text-[#F2D3A3]' : ''}`
                }
              >
                {link.text}
              </NavLink>
            ))}
            {!currentUser && (
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="bg-[#F2D3A3] text-[#1E1B6A] text-center px-4 py-2 rounded-xl font-semibold hover:bg-[#ebc58b] transition-colors">
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

