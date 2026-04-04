import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import ProductCard from '../components/ProductCard';
import CountdownTimer from '../components/CountdownTimer';
import SectionContainer from '../components/SectionContainer';
import Button from '../components/Button';
import Badge from '../components/Badge';
import ScrollReveal from '../components/ScrollReveal';
import { useRocketDrop } from '../hooks/useRocketDrop';
import { PRODUCT_CARD_PLACEHOLDER } from '../utils/imageFallbacks';

const HomePage = () => {
  const { products, categories } = useRocketDrop();
  const [activeDropTab, setActiveDropTab] = useState('LIVE');

  const featuredProducts = products.slice(0, 4);
  const allCategories = categories || [];

  const dropsByTab = useMemo(() => {
    const live = [...products]
      .filter((product) => product.status === 'LIVE')
      .sort((a, b) => (b.dropTime ? new Date(b.dropTime).getTime() : 0) - (a.dropTime ? new Date(a.dropTime).getTime() : 0))
      .slice(0, 4);

    const upcoming = [...products]
      .filter((product) => product.status === 'UPCOMING')
      .sort((a, b) => (a.dropTime ? new Date(a.dropTime).getTime() : 0) - (b.dropTime ? new Date(b.dropTime).getTime() : 0))
      .slice(0, 4);

    return { LIVE: live, UPCOMING: upcoming };
  }, [products]);

  const recentDrops = useMemo(() => {
    return [...products]
      .filter((product) => ['LIVE', 'UPCOMING'].includes(product.status))
      .sort((a, b) => {
        const aTime = a.dropTime ? new Date(a.dropTime).getTime() : 0;
        const bTime = b.dropTime ? new Date(b.dropTime).getTime() : 0;
        return bTime - aTime;
      })
      .slice(0, 5);
  }, [products]);

  const categoryImageMap = {
    Electronics: 'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=900&q=80',
    Fashion: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=80',
    Sneakers: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    'Home & Kitchen': 'https://images.unsplash.com/photo-1556911220-bda9f7f7597e?auto=format&fit=crop&w=900&q=80',
    Beauty: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
    Sports: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=80',
  };

  return (
    <MainLayout>
      <div className="bg-[#F8FAFC] text-[#0F172A]">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#1E1B6A] via-[#2A278F] to-[#3B38A0] py-24 text-white relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#F2D3A3]/10 rounded-full blur-3xl -mr-48 -mt-48 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -ml-40 -mb-40 animate-pulse" style={{animationDelay: '1s'}}></div>
          
          <div className="container px-4 text-center relative z-10">
            <ScrollReveal direction="up" duration={800}>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6 backdrop-blur-sm hover:bg-white/15 transition-all">
                <Sparkles size={16} className="text-[#F2D3A3] animate-spin" style={{animationDuration: '3s'}} />
                <span className="text-sm text-white/90">🚀 Join 50K+ collectors</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={80} duration={800}>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 leading-tight">
                Catch the <span className="text-[#F2D3A3]">Next Big Drop</span> 🚀
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={140} duration={800}>
              <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-8 leading-relaxed">
                Discover exclusive, limited-time products from the world's leading brands. Don't just buy, <span className="font-semibold text-white">collect.</span>
              </p>
            </ScrollReveal>

            {/* Social Proof Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
              <ScrollReveal direction="left" delay={180}>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-[#F2D3A3]/30">
                  <p className="text-2xl font-bold text-[#F2D3A3]">340+</p>
                  <p className="text-xs text-white/70">Drops completed</p>
                </div>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={240}>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-[#F2D3A3]/30">
                  <p className="text-2xl font-bold text-[#F2D3A3]">99.9%</p>
                  <p className="text-xs text-white/70">Success rate</p>
                </div>
              </ScrollReveal>
              <ScrollReveal direction="right" delay={300}>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-[#F2D3A3]/30">
                  <p className="text-2xl font-bold text-[#F2D3A3]">$50M+</p>
                  <p className="text-xs text-white/70">Drops completed</p>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="up" delay={340}>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  as={Link}
                  to="/drops"
                  className="px-8 py-3"
                  variant="primary"
                >
                  Explore Drops
                </Button>
                <Button
                  as={Link}
                  to="/products"
                  variant="outline"
                  className="px-8 py-3"
                >
                  Shop Now
                </Button>
              </div>
            </ScrollReveal>

          </div>
        </section>

        {/* Shop by Category */}
        <SectionContainer
          title="Shop by Category"
          subtitle="Find exactly what you are looking for"
          className="bg-white py-8 md:py-10"
        >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5">
              {allCategories.map((category, index) => (
                <ScrollReveal key={category.id} direction="up" delay={index * 40}>
                  <Link
                    to={`/products?category=${category.id}`}
                    className="group relative block aspect-square overflow-hidden rounded-xl border border-[#E5E7EB] shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="h-full w-full bg-slate-100 overflow-hidden">
                      <img 
                        src={category.imageUrl || categoryImageMap[category.name] || PRODUCT_CARD_PLACEHOLDER}
                        alt={category.name} 
                        onError={(event) => {
                          event.currentTarget.src = PRODUCT_CARD_PLACEHOLDER;
                        }}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/30 to-transparent px-3 py-3">
                      <h3 className="text-sm md:text-base font-semibold text-white line-clamp-1">{category.name}</h3>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
        </SectionContainer>

        {/* Featured Products */}
        <SectionContainer
          title="Featured Products"
          subtitle="Handpicked premium selections just for you"
          className="bg-[#FFF7ED]"
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product, index) => (
                <ScrollReveal key={product.id} direction="up" delay={index * 80}>
                  <ProductCard product={product} />
                </ScrollReveal>
              ))}
            </div>
        </SectionContainer>

        {/* Drops with tabs */}
        <SectionContainer
          title="Drops"
          subtitle="Track urgency and launch timing in real time"
          className="bg-white"
          rightNode={
            <Link to="/drops" className="text-[#1E1B6A] hover:text-[#0a0a5e] font-semibold inline-flex items-center gap-2 transition-colors">
              View all drops <ArrowRight size={16} />
            </Link>
          }
        >
          <div className="mb-6 inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
            <button
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${activeDropTab === 'LIVE' ? 'bg-[#F2D3A3] text-[#1E1B6A]' : 'text-slate-600 hover:text-[#1E1B6A]'}`}
              onClick={() => setActiveDropTab('LIVE')}
            >
              Live
            </button>
            <button
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${activeDropTab === 'UPCOMING' ? 'bg-[#F2D3A3] text-[#1E1B6A]' : 'text-slate-600 hover:text-[#1E1B6A]'}`}
              onClick={() => setActiveDropTab('UPCOMING')}
            >
              Upcoming
            </button>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
            {(dropsByTab[activeDropTab] || []).map((drop, index) => (
              <ScrollReveal key={drop.id} direction="up" delay={index * 70}>
                <article className="rd-card p-5 transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="accent">{activeDropTab === 'LIVE' ? 'LIVE DROP' : 'COMING SOON'}</Badge>
                    <span className="text-lg font-bold text-[#1E1B6A]">INR {drop.price}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 line-clamp-1 text-[#1E1B6A]">{drop.name}</h3>
                  <p className="text-sm text-slate-500 mb-4 line-clamp-2">{drop.description || 'Limited release product available for a short time window.'}</p>
                  {activeDropTab === 'UPCOMING' && drop.dropTime && (
                    <div className="mb-4 rounded-xl border border-[#F2D3A3]/70 bg-[#FFF7ED] px-3 py-2">
                      <CountdownTimer dropTime={drop.dropTime} compact />
                    </div>
                  )}
                  <Button as={Link} to={`/products/${drop.id}`} className="w-full">
                    View Drop
                  </Button>
                </article>
              </ScrollReveal>
            ))}
          </div>

          {!dropsByTab[activeDropTab]?.length && (
            <div className="rd-card p-8 text-center text-slate-500 mt-4">
              No {activeDropTab.toLowerCase()} drops right now. Check back soon.
            </div>
          )}

          {!!recentDrops.length && (
            <p className="mt-6 text-sm text-slate-500">
              Showing {Math.min(dropsByTab[activeDropTab].length, 4)} of {recentDrops.length} recent active drops.
            </p>
          )}
        </SectionContainer>

        {/* Trust Bar */}
        <SectionContainer className="bg-[#F8FAFC] border-t border-[#E5E7EB]">          
          <div className="grid md:grid-cols-3 gap-10">
            <ScrollReveal direction="left">
              <div className="rd-card p-6 hover:shadow-md transition-all">
                <div className="bg-[#1E1B6A]/10 p-3 rounded-lg w-fit mb-4">
                  <Clock size={28} className="text-[#1E1B6A]" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#1E1B6A]">Lightning Fast Shipping</h3>
                <p className="text-slate-500">Get your exclusive items delivered to your doorstep in record time.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={80}>
              <div className="rd-card p-6 hover:shadow-md transition-all">
                <div className="bg-[#1E1B6A]/10 p-3 rounded-lg w-fit mb-4">
                  <ShieldCheck size={28} className="text-[#1E1B6A]" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#1E1B6A]">Verified Authentic</h3>
                <p className="text-slate-500">Every product is 100% authentic, sourced directly from the brands.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={140}>
              <div className="rd-card p-6 hover:shadow-md transition-all">
                <div className="bg-[#1E1B6A]/10 p-3 rounded-lg w-fit mb-4">
                  <Zap size={28} className="text-[#1E1B6A]" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#1E1B6A]">Instant Access to Drops</h3>
                <p className="text-slate-500">Join the drop queue and secure your items the moment they go live.</p>
              </div>
            </ScrollReveal>
          </div>
        </SectionContainer>
      </div>
    </MainLayout>
  );
};

export default HomePage;

