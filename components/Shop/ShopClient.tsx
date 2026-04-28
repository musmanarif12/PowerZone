'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, Search, SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '@/components/ProductCard/ProductCard';
import { useAdmin } from '@/lib/adminContext';
import styles from '@/app/shop/ShopPage.module.css';

export default function ShopClient() {
  const { products, brands, categories } = useAdmin();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialBrand = searchParams.get('brand') || 'All';

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeBrand, setActiveBrand] = useState(initialBrand);
  const [sort, setSort] = useState('default');
  const [maxPrice, setMaxPrice] = useState(25000);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setActiveCategory(searchParams.get('category') || 'All');
    setActiveBrand(searchParams.get('brand') || 'All');
  }, [searchParams]);

  const storeProducts = products.filter(p => p.isOnStore);

  const filtered = storeProducts
    .filter(p => activeCategory === 'All' || p.category === activeCategory)
    .filter(p => activeBrand === 'All' || p.brand === activeBrand)
    .filter(p => p.price <= maxPrice)
    .filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <div className={styles.page}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <Link href="/" className={styles.backBtn}>
          <ArrowLeft size={16} />
          Back to Website
        </Link>
        <div className={styles.logoArea}>
          <span className={styles.logoText}>⚡ PowerZone <span>Store</span></span>
        </div>
        <div className={styles.searchWrap}>
          <Search size={16} className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            placeholder="Search supplements..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && <button className={styles.clearBtn} onClick={() => setSearch('')}><X size={14} /></button>}
        </div>
      </div>

      <div className={styles.layout}>
        {/* Sidebar */}
        <aside className={`${styles.sidebar} ${showFilters ? styles.open : ''}`}>
          <div className={styles.sidebarHeader}>
            <span>Filters</span>
            <button className={styles.closeFilters} onClick={() => setShowFilters(false)}><X size={18} /></button>
          </div>

          <div className={styles.filterGroup}>
            <h4>Category</h4>
            {['All', ...categories].map(cat => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${activeCategory === cat ? styles.active : ''}`}
                onClick={() => { setActiveCategory(cat); setShowFilters(false); }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className={styles.filterGroup}>
            <h4>Brand</h4>
            {['All', ...brands].map(brand => (
              <button
                key={brand}
                className={`${styles.filterBtn} ${activeBrand === brand ? styles.active : ''}`}
                onClick={() => { setActiveBrand(brand); setShowFilters(false); }}
              >
                {brand}
              </button>
            ))}
          </div>

          <div className={styles.filterGroup}>
            <h4>Max Price: <strong>Rs {maxPrice.toLocaleString()}</strong></h4>
            <input
              type="range"
              min={1000}
              max={25000}
              step={500}
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className={styles.range}
            />
            <div className={styles.rangeLabels}><span>Rs 1,000</span><span>Rs 25,000</span></div>
          </div>

          <button className={styles.resetBtn} onClick={() => { setActiveCategory('All'); setActiveBrand('All'); setMaxPrice(25000); setSearch(''); }}>
            Reset All Filters
          </button>
        </aside>

        {/* Main content */}
        <main className={styles.main}>
          <div className={styles.mainHeader}>
            <div className={styles.resultCount}>
              <strong>{filtered.length}</strong> products found
              {activeCategory !== 'All' && <span className={styles.activeTag}>{activeCategory} <button onClick={() => setActiveCategory('All')}><X size={12} /></button></span>}
              {activeBrand !== 'All' && <span className={styles.activeTag}>{activeBrand} <button onClick={() => setActiveBrand('All')}><X size={12} /></button></span>}
            </div>
            <div className={styles.sortRow}>
              <button className={styles.filterToggle} onClick={() => setShowFilters(true)}>
                <SlidersHorizontal size={16} /> Filters
              </button>
              <select className={styles.sortSelect} value={sort} onChange={e => setSort(e.target.value)}>
                <option value="default">Default</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="rating">Best Rated</option>
              </select>
            </div>
          </div>

          {/* Category pills */}
          <div className={styles.categoryPills}>
            {['All', ...categories].map(cat => (
              <button
                key={cat}
                className={`${styles.pill} ${activeCategory === cat ? styles.pillActive : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <div className={styles.grid}>
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div className={styles.empty}>
              <span style={{ fontSize: '3rem' }}>🔍</span>
              <p>No products found. Try adjusting your filters.</p>
              <button className={styles.resetBtn} onClick={() => { setActiveCategory('All'); setActiveBrand('All'); setMaxPrice(25000); setSearch(''); }}>
                Clear Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
