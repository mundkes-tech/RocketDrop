import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Rocket, Target, Zap, Clock3, BadgeCheck, Heart, Award, Globe, Sparkles, Store, PackageCheck, ArrowRight } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import SectionContainer from '../components/SectionContainer';
import Button from '../components/Button';
import Badge from '../components/Badge';
import ScrollReveal from '../components/ScrollReveal';

const AboutUsPage = () => {
  const principles = [
    {
      icon: ShieldCheck,
      title: 'Trust-First Commerce',
      description: 'Verification, secure checkout, and clear order communication are built into every step.',
    },
    {
      icon: Zap,
      title: 'Drop-Ready Performance',
      description: 'The platform is designed for launch moments where speed and reliability matter most.',
    },
    {
      icon: Heart,
      title: 'Collector Experience',
      description: 'From discovery to delivery, every interaction is crafted to feel premium and effortless.',
    },
  ];

  const journey = [
    {
      year: '2026',
      title: 'RocketDrop goes live',
      description: 'We launched with a simple mission: make premium drops feel exciting and trustworthy.',
    },
    {
      year: 'Today',
      title: 'Refining every detail',
      description: 'We continue improving product quality, seller curation, and drop-day reliability.',
    },
    {
      year: 'Next',
      title: 'Growing the ecosystem',
      description: 'More premium categories, stronger brand partnerships, and a better collector journey.',
    },
  ];

  const experiences = [
    {
      icon: Clock3,
      title: 'Real-time drop visibility',
      description: 'Know what is launching, when it launches, and how to secure it quickly.',
    },
    {
      icon: PackageCheck,
      title: 'Clear post-purchase flow',
      description: 'From order confirmation to delivery updates, every step stays transparent.',
    },
    {
      icon: Store,
      title: 'Curated catalog quality',
      description: 'A focused selection built for shoppers who value product authenticity and design.',
    },
  ];

  const values = [
    {
      icon: BadgeCheck,
      title: 'Quality over noise',
      description: 'We prioritize better products and better experiences, not endless clutter.',
    },
    {
      icon: Target,
      title: 'Fair access by design',
      description: 'We build systems that reward genuine shoppers and discourage unfair behavior.',
    },
    {
      icon: Globe,
      title: 'Built to scale globally',
      description: 'Our roadmap focuses on serving more regions while preserving premium quality.',
    },
  ];

  return (
    <MainLayout>
      <div className="bg-[#F8FAFC] text-[#0F172A] pb-16">
        {/* Hero Section */}
        <section className="bg-white border-b border-slate-200">
          <div className="container pt-14 md:pt-20 pb-12">
            <ScrollReveal direction="zoom" duration={800}>
              <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-[#1E1B6A] via-[#2A278F] to-[#3B38A0] p-8 md:p-12 text-white relative overflow-hidden shadow-xl">
                <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-[#F2D3A3]/20 blur-2xl animate-pulse" />
                <div className="absolute -bottom-10 left-12 w-36 h-36 rounded-full bg-[#F2D3A3]/10 blur-2xl" />
                <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge variant="accent">Since 2026</Badge>
                  <span className="text-xs uppercase tracking-[0.14em] text-white/80">Premium Drop Commerce</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-4xl mb-4">
                  Built for shoppers who want <span className="text-[#F2D3A3]">premium drops</span> without the chaos.
                </h1>
                <p className="text-white/80 text-lg max-w-3xl mb-8">
                  RocketDrop brings together curated products, reliable release-day performance, and a shopping experience designed to feel confident from discovery to delivery.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button as={Link} to="/drops" variant="primary" className="px-8 py-3">
                    Explore Drops
                  </Button>
                  <Button as={Link} to="/products" variant="outline" className="px-8 py-3">
                    Browse Catalog
                  </Button>
                </div>
                </div>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-5 mt-6">
              {principles.map(({ icon: Icon, title, description }, index) => (
                <ScrollReveal key={title} direction={index === 0 ? 'left' : index === 1 ? 'up' : 'right'} delay={index * 90}>
                  <article className="rd-card p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="w-11 h-11 rounded-xl bg-[#F2D3A3]/20 border border-[#F2D3A3]/40 flex items-center justify-center mb-4">
                      <Icon size={20} className="text-[#1E1B6A]" />
                    </div>
                    <h3 className="font-semibold text-[#1E1B6A] mb-2">{title}</h3>
                    <p className="text-sm text-[#64748B]">{description}</p>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <div className="container py-3">
          <div className="h-px bg-gradient-to-r from-transparent via-[#F2D3A3]/60 to-transparent" />
        </div>

        {/* Story Section */}
        <SectionContainer className="bg-white">
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            <ScrollReveal direction="left">
              <article className="rd-card p-6 md:p-8 hover:shadow-lg transition-all duration-300">
              <div className="inline-flex items-center gap-2 text-[#64748B] text-xs uppercase tracking-[0.12em] mb-4">
                <Sparkles size={14} className="text-[#F2D3A3]" />
                Brand Story
              </div>
              <h2 className="text-3xl font-bold mb-4 text-[#1E1B6A]">Why RocketDrop exists</h2>
              <p className="text-[#64748B] mb-4">
                Premium shopping should feel intentional, not chaotic. RocketDrop was created to make limited releases easier to discover, easier to trust, and easier to buy.
              </p>
              <p className="text-[#64748B] mb-4">
                Since 2026, our focus has stayed the same: quality curation, transparent purchasing, and a polished experience that respects your time.
              </p>
              <p className="text-[#64748B]">
                We are not trying to be the loudest marketplace. We are building one of the most refined places to shop premium drops.
              </p>
              </article>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={80}>
              <article className="rd-card p-6 md:p-8 bg-[#F2D3A3]/20 border-[#F2D3A3]/50 hover:shadow-xl transition-all duration-300">
              <h2 className="text-3xl font-bold mb-4 text-[#1E1B6A]">Since 2026, built with intention</h2>
              <div className="space-y-4">
                {journey.map((item, index) => (
                  <div key={item.title} className="group rounded-xl border border-[#E5E7EB] bg-white p-4 hover:border-[#F2D3A3]/70 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <h3 className="font-semibold text-[#1E1B6A]">{item.title}</h3>
                      <Badge variant="accent">{item.year}</Badge>
                    </div>
                    <p className="text-sm text-[#64748B]">{item.description}</p>
                    {index < journey.length - 1 && <div className="mt-3 h-px bg-gradient-to-r from-[#F2D3A3]/40 to-transparent" />}
                  </div>
                ))}
              </div>
              </article>
            </ScrollReveal>
          </div>
        </SectionContainer>

        <div className="container py-3">
          <div className="h-px bg-gradient-to-r from-transparent via-[#F2D3A3]/60 to-transparent" />
        </div>

        {/* Experience Section */}
        <SectionContainer title="What Premium Shopping Should Feel Like" subtitle="Simple, fast, and confidence-first at every stage" className="bg-gradient-to-r from-[#FFF7ED] to-[#FDEBD2] border-y border-[#E5E7EB]">
          <div className="grid md:grid-cols-3 gap-6">
            {experiences.map(({ icon: Icon, title, description }, index) => (
              <ScrollReveal key={title} direction="up" delay={index * 100}>
                <article className={`rd-card p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${index === 1 ? 'bg-[#FFF7ED] border-[#F2D3A3]/40' : ''}`}>
                  <div className="w-12 h-12 rounded-xl bg-[#F2D3A3]/20 flex items-center justify-center mb-4">
                    <Icon size={22} className="text-[#1E1B6A]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-[#1E1B6A]">{title}</h3>
                  <p className="text-[#64748B]">{description}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </SectionContainer>

        <div className="container py-3">
          <div className="h-px bg-gradient-to-r from-transparent via-[#F2D3A3]/60 to-transparent" />
        </div>

        {/* Values Section */}
        <SectionContainer title="Our Standards" subtitle="The principles behind every release on RocketDrop" className="bg-white">
          <div className="grid md:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, description }, index) => (
              <ScrollReveal key={title} direction={index % 2 === 0 ? 'left' : 'right'} delay={index * 80}>
                <article className="rd-card p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-[#F2D3A3]/20 border border-[#F2D3A3]/40 flex items-center justify-center mb-4">
                    <Icon size={18} className="text-[#1E1B6A]" />
                  </div>
                  <h3 className="font-semibold text-[#1E1B6A] mb-2">{title}</h3>
                  <p className="text-sm text-[#64748B]">{description}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </SectionContainer>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-[#1E1B6A] via-[#2A278F] to-[#3B38A0] text-white py-16 border-y border-[#1E1B6A] relative overflow-hidden">
          <div className="absolute -right-10 top-0 w-44 h-44 bg-[#F2D3A3]/15 rounded-full blur-2xl" />
          <div className="container text-center">
            <ScrollReveal direction="up">
              <Award size={48} className="mx-auto text-[#F2D3A3] mb-4" />
              <h3 className="text-3xl md:text-4xl font-bold mb-3">Shop premium drops with confidence</h3>
              <p className="text-white/80 max-w-2xl mx-auto mb-8">
                Discover curated releases, experience clean checkout, and stay ready for what launches next.
              </p>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={120}>
              <div className="flex flex-wrap justify-center gap-4">
                <Button as={Link} to="/drops" variant="primary" className="px-8 py-3 hover:scale-105">
                  Explore Drops
                  <ArrowRight size={16} />
                </Button>
                <Button as={Link} to="/products" variant="outline" className="px-8 py-3">
                  View Products
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default AboutUsPage;
