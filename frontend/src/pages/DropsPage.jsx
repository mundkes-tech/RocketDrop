import React, { useMemo } from 'react';
import MainLayout from '../layouts/MainLayout';
import DropCard from '../components/DropCard';
import { useRocketDrop } from '../hooks/useRocketDrop';
import SectionContainer from '../components/SectionContainer';
import Badge from '../components/Badge';
import ScrollReveal from '../components/ScrollReveal';

const DropsPage = () => {
  const { products, serverTime } = useRocketDrop();

  const { live, upcoming, ended } = useMemo(() => ({
    live: products.filter((product) => product.status === 'LIVE'),
    upcoming: products.filter((product) => product.status === 'UPCOMING').sort((a, b) => new Date(a.dropTime) - new Date(b.dropTime)),
    ended: products.filter((product) => product.status === 'SOLD_OUT'),
  }), [products]);

  return (
    <MainLayout>
      <ScrollReveal direction="up" duration={700}>
        <section className="bg-gradient-to-r from-[#FFF7ED] to-[#F8FAFC] text-[#1E1B6A] rounded-2xl border border-[#E5E7EB] mt-8">
          <div className="container py-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Live Drop Center</h1>
            <p className="text-slate-600 max-w-2xl">Follow launch windows, track queue momentum, and catch limited releases in real time.</p>
          </div>
        </section>
      </ScrollReveal>

      <SectionContainer
        title="Live Drops"
        subtitle="Happening now"
        className="bg-white"
        rightNode={<Badge variant="live">LIVE</Badge>}
      >
        <div className="grid md:grid-cols-2 gap-4">
          {live.length ? live.map((product, index) => (
            <ScrollReveal key={product.id} direction="left" delay={index * 60}>
              <DropCard product={product} serverTime={serverTime} />
            </ScrollReveal>
          )) : <div className="rd-card p-8 text-slate-500">No live releases right now.</div>}
        </div>
      </SectionContainer>

      <SectionContainer
        title="Upcoming Drops"
        subtitle="Set reminders before they go live"
        className="bg-slate-50"
        rightNode={<Badge variant="accent">COMING SOON</Badge>}
      >
        <div className="grid md:grid-cols-2 gap-4">
          {upcoming.length ? upcoming.map((product, index) => (
            <ScrollReveal key={product.id} direction="up" delay={index * 60}>
              <DropCard product={product} serverTime={serverTime} />
            </ScrollReveal>
          )) : <div className="rd-card p-8 text-slate-500">No upcoming releases right now.</div>}
        </div>
      </SectionContainer>

      <SectionContainer
        title="Past Drops"
        subtitle="Finished releases"
        className="bg-[#F8FAFC] border-t border-[#F2D3A3]/30"
        rightNode={<Badge variant="soldout">SOLD OUT</Badge>}
      >
        <div className="grid md:grid-cols-2 gap-4">
          {ended.length ? ended.map((product, index) => (
            <ScrollReveal key={product.id} direction="right" delay={index * 60}>
              <div className="opacity-70"><DropCard product={product} serverTime={serverTime} /></div>
            </ScrollReveal>
          )) : <div className="rd-card p-8 text-slate-500">No completed releases yet.</div>}
        </div>
      </SectionContainer>
    </MainLayout>
  );
};

export default DropsPage;
