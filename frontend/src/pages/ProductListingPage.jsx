import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, X, Sparkles, SlidersHorizontal, LayoutGrid, List } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import ProductCard from '../components/ProductCard';
import FiltersSidebar from '../components/FiltersSidebar';
import SectionContainer from '../components/SectionContainer';
import SkeletonCard from '../components/SkeletonCard';
import Button from '../components/Button';
import ScrollReveal from '../components/ScrollReveal';
import { useRocketDrop } from '../hooks/useRocketDrop';
import { useDebounce } from '../hooks/useDebounce';
import { rocketdropService } from '../services/rocketdropService';

const PAGE_SIZE = 12;

const ProductListingPage = () => {
  const { categories, serverTime } = useRocketDrop();
  const [searchParams] = useSearchParams();
  const loadMoreRef = useRef(null);
  const prefetchCacheRef = useRef(new Map());

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [items, setItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    categoryId: searchParams.get('category') || '',
    minPrice: '',
    maxPrice: '',
    availability: '',
    sortBy: 'newest',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [cardLayout, setCardLayout] = useState(() => localStorage.getItem('rocketdrop.products.layout') || 'compact');

  const debouncedSearch = useDebounce(search, 200);
  const queryKey = useMemo(
    () => JSON.stringify({
      keyword: debouncedSearch.trim() || undefined,
      category: filters.categoryId || undefined,
      minPrice: filters.minPrice || undefined,
      maxPrice: filters.maxPrice || undefined,
      availability: filters.availability || undefined,
      sortBy: filters.sortBy,
    }),
    [debouncedSearch, filters]
  );

  useEffect(() => {
    const categoryFromQuery = searchParams.get('category') || '';
    setPage(0);
    setFilters((prev) => ({ ...prev, categoryId: categoryFromQuery }));
  }, [searchParams]);

  useEffect(() => {
    localStorage.setItem('rocketdrop.products.layout', cardLayout);
  }, [cardLayout]);

  useEffect(() => {
    prefetchCacheRef.current.clear();
    setItems([]);
    setTotalCount(0);
    setHasMore(true);
    setPage(0);
  }, [queryKey]);

  useEffect(() => {
    let cancelled = false;

    const fetchProducts = async () => {
      try {
        if (page === 0) {
          setLoadingInitial(true);
        } else {
          setLoadingMore(true);
        }
        setError('');

        const cacheKey = `${queryKey}::${page}`;
        const cached = prefetchCacheRef.current.get(cacheKey);

        const data = cached || await rocketdropService.searchProducts({
          ...JSON.parse(queryKey),
          page,
          size: PAGE_SIZE,
        });

        if (!cached) {
          prefetchCacheRef.current.set(cacheKey, data);
        }

        if (cancelled) return;

        setItems((prev) => (page === 0 ? data.products : [...prev, ...data.products]));
        setTotalCount(data.totalElements);
        const moreAvailable = page + 1 < data.totalPages;
        setHasMore(moreAvailable);

        if (moreAvailable) {
          const nextPage = page + 1;
          const nextKey = `${queryKey}::${nextPage}`;
          if (!prefetchCacheRef.current.has(nextKey)) {
            rocketdropService.searchProducts({
              ...JSON.parse(queryKey),
              page: nextPage,
              size: PAGE_SIZE,
            }).then((nextData) => {
              prefetchCacheRef.current.set(nextKey, nextData);
            }).catch(() => {
              // ignore prefetch failures and continue with normal load flow
            });
          }
        }
      } catch (err) {
        if (cancelled) return;
        setError(err.response?.data?.message || 'Failed to load products');
        if (page === 0) {
          setItems([]);
          setTotalCount(0);
        }
        setHasMore(false);
      } finally {
        if (!cancelled) {
          setLoadingInitial(false);
          setLoadingMore(false);
        }
      }
    };

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, [page, queryKey]);

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (loadingInitial || loadingMore || !hasMore) return;
        setPage((prev) => prev + 1);
      },
      { rootMargin: '1200px 0px', threshold: 0.01 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasMore, loadingInitial, loadingMore]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ categoryId: '', minPrice: '', maxPrice: '', availability: '', sortBy: 'newest' });
  };

  const activeFiltersCount = useMemo(
    () => Object.values(filters).filter((value) => String(value || '').trim() && value !== 'newest').length,
    [filters]
  );

  return (
    <MainLayout>
      {showFilters && (
        <div className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden" onClick={() => setShowFilters(false)}>
          <aside className="ml-auto h-full w-[min(86vw,380px)] overflow-y-auto bg-white p-5 shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#1E1B6A]">Filters</h2>
              <button onClick={() => setShowFilters(false)} className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700">
                <X size={18} />
              </button>
            </div>
            <FiltersSidebar categories={categories} filters={filters} onChange={updateFilter} onClear={clearFilters} />
          </aside>
        </div>
      )}

      <ScrollReveal direction="up" duration={700}>
        <section className="relative mt-8 overflow-hidden rounded-3xl border border-[#E5E7EB] bg-gradient-to-br from-[#fff8ec] via-white to-[#eef4ff] text-[#1E1B6A]">
          <div className="pointer-events-none absolute -left-10 -top-10 h-52 w-52 rounded-full bg-[#F2D3A3]/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-12 right-0 h-52 w-52 rounded-full bg-[#c7d2fe]/35 blur-3xl" />

          <div className="container relative py-10 md:py-12">
            <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-[#ebc58b] bg-[#F2D3A3]/35 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#1E1B6A]">
                  <Sparkles size={13} />
                  Curated Catalog
                </p>
                <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">Find Your Next Drop</h1>
                <p className="mt-3 max-w-2xl text-sm text-slate-600 md:text-base">
                  Discover premium picks with live drop timing, smooth browsing, and a cleaner shopping experience.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Results</p>
                  <p className="mt-1 text-2xl font-bold text-[#1E1B6A]">{totalCount}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Filters Active</p>
                  <p className="mt-1 text-2xl font-bold text-[#1E1B6A]">{activeFiltersCount}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="w-full rounded-2xl border border-[#E5E7EB] bg-white/95 py-3 pl-10 pr-4 text-[#0F172A] placeholder-[#64748B] shadow-sm transition-all focus:border-[#F2D3A3] focus:outline-none focus:ring-2 focus:ring-[#F2D3A3]/30"
                  placeholder="Search for exclusive drops, brands, or categories..."
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center gap-2 rounded-2xl border border-[#ebc58b] bg-[#F2D3A3] p-3 font-semibold text-[#1E1B6A] transition hover:bg-[#ebc58b] lg:hidden"
              >
                <Filter size={20} />
              </button>

              <div className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-white/90 p-1 shadow-sm md:flex">
                <button
                  type="button"
                  onClick={() => setCardLayout('compact')}
                  className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition ${cardLayout === 'compact' ? 'bg-[#1E1B6A] text-white' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                  <LayoutGrid size={16} />
                  Grid
                </button>
                <button
                  type="button"
                  onClick={() => setCardLayout('editorial')}
                  className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition ${cardLayout === 'editorial' ? 'bg-[#1E1B6A] text-white' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                  <List size={16} />
                  Editorial
                </button>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <SectionContainer className="bg-white">
        <div className="grid gap-6 lg:grid-cols-[minmax(260px,300px)_1fr] xl:gap-8">
            {/* Filters Sidebar */}
            <div className="hidden lg:block">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:sticky lg:top-24 md:p-6">
                <div className="mb-6 flex items-center gap-2">
                  <SlidersHorizontal size={18} className="text-[#1E1B6A]" />
                  <h2 className="text-lg font-semibold text-[#1E1B6A]">Smart Filters</h2>
                </div>
                <FiltersSidebar categories={categories} filters={filters} onChange={updateFilter} onClear={clearFilters} />
              </div>
            </div>

            {/* Products Grid */}
            <div>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6 flex items-start gap-3">
                  <div className="text-lg">⚠️</div>
                  <p>{error}</p>
                </div>
              )}

              {loadingInitial ? (
                <div className={`grid gap-4 md:gap-6 ${cardLayout === 'editorial' ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3'}`}>
                  {Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)}
                </div>
              ) : items.length ? (
                <>
                  <div className={`grid gap-4 md:gap-6 ${cardLayout === 'editorial' ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3'}`}>
                    {items.map((product, index) => (
                      <ScrollReveal key={product.id} direction="up" delay={index * 45}>
                        <ProductCard product={product} serverTime={serverTime} layout={cardLayout} />
                      </ScrollReveal>
                    ))}
                  </div>

                  <div ref={loadMoreRef} className="mt-10 flex min-h-16 items-center justify-center">
                    {loadingMore ? (
                      <div className="flex items-center gap-3 text-slate-500 animate-pulse">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#1E1B6A]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#F2D3A3]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#1E1B6A]" />
                        <span className="text-sm">Loading more drops...</span>
                      </div>
                    ) : !hasMore ? (
                      <p className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-500">You have reached the end of the list.</p>
                    ) : (
                      <Button variant="secondary" onClick={() => setPage((prev) => prev + 1)} className="rounded-full px-6">
                        Load More
                      </Button>
                    )}
                  </div>
                </>
              ) : (
                <div className="rd-card flex flex-col items-center justify-center py-20 text-center">
                  <div className="text-5xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-[#1E1B6A] mb-2">No Products Found</h3>
                  <p className="text-slate-500">Try adjusting your filters or search terms</p>
                </div>
              )}
            </div>
          </div>
      </SectionContainer>
    </MainLayout>
  );
};

export default ProductListingPage;
