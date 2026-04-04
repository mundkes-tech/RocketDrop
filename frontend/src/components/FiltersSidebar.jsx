import React from 'react';
import { RotateCcw, ChevronDown } from 'lucide-react';
import Button from './Button';

const FiltersSidebar = ({ categories, filters, onChange, onClear }) => {
  return (
    <aside className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-[#1E1B6A]">Filters</h3>
        <Button
          onClick={onClear}
          variant="ghost"
          className="text-sm px-2 py-1"
        >
          <RotateCcw size={14} />
          Reset
        </Button>
      </div>

      {/* Category Filter */}
      <div>
        <label className="text-sm font-medium text-slate-600 block mb-3">Category</label>
        <div className="relative">
          <select
            value={filters.categoryId}
            onChange={(event) => onChange('categoryId', event.target.value)}
            className="w-full bg-white border border-slate-200 text-slate-800 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#1E1B6A] focus:ring-2 focus:ring-[#1E1B6A]/10 appearance-none transition-all cursor-pointer"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
        </div>
      </div>

      {/* Availability Filter */}
      <div>
        <label className="text-sm font-medium text-slate-600 block mb-3">Availability</label>
        <div className="relative">
          <select
            value={filters.availability}
            onChange={(event) => onChange('availability', event.target.value)}
            className="w-full bg-white border border-slate-200 text-slate-800 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#1E1B6A] focus:ring-2 focus:ring-[#1E1B6A]/10 appearance-none transition-all cursor-pointer"
          >
            <option value="">All Items</option>
            <option value="IN_STOCK">In Stock</option>
            <option value="SOLD_OUT">Sold Out</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <label className="text-sm font-medium text-slate-600 block mb-3">Price Range</label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(event) => onChange('minPrice', event.target.value)}
            className="bg-white border border-slate-200 text-slate-800 placeholder-slate-400 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#1E1B6A] focus:ring-2 focus:ring-[#1E1B6A]/10 transition-all"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(event) => onChange('maxPrice', event.target.value)}
            className="bg-white border border-slate-200 text-slate-800 placeholder-slate-400 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#1E1B6A] focus:ring-2 focus:ring-[#1E1B6A]/10 transition-all"
          />
        </div>
      </div>

      {/* Sort Filter */}
      <div>
        <label className="text-sm font-medium text-slate-600 block mb-3">Sort By</label>
        <div className="relative">
          <select
            value={filters.sortBy}
            onChange={(event) => onChange('sortBy', event.target.value)}
            className="w-full bg-white border border-slate-200 text-slate-800 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#1E1B6A] focus:ring-2 focus:ring-[#1E1B6A]/10 appearance-none transition-all cursor-pointer"
          >
            <option value="newest">Newest arrivals</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-200"></div>

      {/* Info */}
      <p className="text-xs text-slate-500 text-center py-2">
        Tip: Adjust filters to find your perfect drop
      </p>
    </aside>
  );
};

export default FiltersSidebar;
