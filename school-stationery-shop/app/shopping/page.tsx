'use client';

import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Product, Category } from '@/lib/types';
import ProductCard from '@/components/ProductCard';

const PRICE_OPTIONS = [
  { label: 'Tất cả giá', value: 0 },
  { label: 'Dưới 20.000đ', value: 20000 },
  { label: 'Dưới 50.000đ', value: 50000 },
  { label: 'Dưới 100.000đ', value: 100000 },
  { label: 'Dưới 200.000đ', value: 200000 },
];

const SORT_OPTIONS = [
  { label: 'Mặc định', value: 'default' },
  { label: 'Giá thấp → cao', value: 'price_asc' },
  { label: 'Giá cao → thấp', value: 'price_desc' },
  { label: 'Mới nhất', value: 'newest' },
];

export default function ShoppingPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [maxPrice, setMaxPrice] = useState(0);
  const [sort, setSort] = useState('default');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    supabase.from('categories').select('*').order('id').then(({ data }) => {
      if (data) setCategories([{ id: 0, name: 'Tất cả', slug: 'all', icon: '🛍️' }, ...(data as Category[])]);
    });
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from('products')
      .select('*, categories(id, name, slug, icon)');

    if (selectedCat !== 'all') {
      const cat = categories.find(c => c.slug === selectedCat);
      if (cat && cat.id > 0) query = query.eq('category_id', cat.id);
    }

    if (maxPrice > 0) query = query.lte('price', maxPrice);
    if (search) query = query.ilike('name', `%${search}%`);

    const { data } = await query;
    let result = (data as Product[]) || [];

    if (sort === 'price_asc') result = [...result].sort((a, b) => (a.sale_price ?? a.price) - (b.sale_price ?? b.price));
    else if (sort === 'price_desc') result = [...result].sort((a, b) => (b.sale_price ?? b.price) - (a.sale_price ?? a.price));
    else if (sort === 'newest') result = [...result].reverse();

    setProducts(result);
    setLoading(false);
  }, [selectedCat, maxPrice, search, sort, categories]);

  useEffect(() => {
    const timer = setTimeout(fetchProducts, 300);
    return () => clearTimeout(timer);
  }, [fetchProducts]);

  const totalResults = products.length;

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Header band */}
      <div style={{
        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
        padding: '32px 0',
      }}>
        <div className="container">
          <h1 style={{ color: '#fff', fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 800, marginBottom: 6 }}>
            🛒 Mua sắm dụng cụ học tập
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>
            Đa dạng sản phẩm, giá hợp lý, không cần đăng nhập
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 28, paddingBottom: 48 }}>
        {/* Search bar + Filter toggle */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: '1 1 260px' }}>
            <Search size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="form-input"
              style={{ paddingLeft: 44, borderRadius: 100 }}
              id="search-input"
            />
            {search && (
              <button onClick={() => setSearch('')} style={{
                position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)',
              }}>
                <X size={16} />
              </button>
            )}
          </div>

          <button onClick={() => setShowFilters(!showFilters)} className="btn btn-outline btn-sm" style={{ gap: 8, borderRadius: 100 }} id="toggle-filters">
            <SlidersHorizontal size={16} />
            Bộ lọc
            {showFilters && <X size={14} />}
          </button>

          {/* Sort */}
          <div style={{ position: 'relative' }}>
            <select value={sort} onChange={e => setSort(e.target.value)}
              style={{
                padding: '9px 36px 9px 14px', borderRadius: 100, border: '1.5px solid var(--border)',
                fontSize: 13, fontWeight: 500, background: '#fff', cursor: 'pointer',
                appearance: 'none', color: 'var(--text)',
              }}
              id="sort-select"
            >
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <ChevronDown size={15} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-muted)' }} />
          </div>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div style={{
            background: '#fff', borderRadius: 'var(--radius)', padding: '20px 24px',
            marginBottom: 20, border: '1px solid var(--border)',
            animation: 'slideUp 0.2s ease',
          }}>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10, color: 'var(--text-muted)' }}>DANH MỤC</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {categories.map(cat => (
                  <button key={cat.slug}
                    onClick={() => setSelectedCat(cat.slug)}
                    className={`filter-chip ${selectedCat === cat.slug ? 'active' : ''}`}
                    id={`cat-${cat.slug}`}
                  >
                    {cat.icon} {cat.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10, color: 'var(--text-muted)' }}>MỨC GIÁ</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {PRICE_OPTIONS.map(o => (
                  <button key={o.value}
                    onClick={() => setMaxPrice(o.value)}
                    className={`filter-chip ${maxPrice === o.value ? 'active' : ''}`}
                    id={`price-${o.value}`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Category chips (quick filter) */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, marginBottom: 24 }}>
          {categories.map(cat => (
            <button key={cat.slug}
              onClick={() => setSelectedCat(cat.slug)}
              className={`filter-chip ${selectedCat === cat.slug ? 'active' : ''}`}
              style={{ flexShrink: 0 }}
              id={`quick-cat-${cat.slug}`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div style={{ marginBottom: 16, color: 'var(--text-muted)', fontSize: 14 }}>
          {loading ? 'Đang tải...' : `Tìm thấy ${totalResults} sản phẩm`}
          {selectedCat !== 'all' && ` trong "${categories.find(c => c.slug === selectedCat)?.name}"`}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="product-grid">
            {Array(8).fill(0).map((_, i) => (
              <div key={i} className="card" style={{ height: 320 }}>
                <div className="skeleton" style={{ height: '55%' }} />
                <div style={{ padding: 14 }}>
                  <div className="skeleton" style={{ height: 14, marginBottom: 8, borderRadius: 4 }} />
                  <div className="skeleton" style={{ height: 14, width: '70%', marginBottom: 16, borderRadius: 4 }} />
                  <div className="skeleton" style={{ height: 36, borderRadius: 8 }} />
                </div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="product-grid">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3 style={{ marginBottom: 8 }}>Không tìm thấy sản phẩm</h3>
            <p style={{ marginBottom: 16 }}>Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
            <button onClick={() => { setSearch(''); setSelectedCat('all'); setMaxPrice(0); }}
              className="btn btn-primary">
              Xóa bộ lọc
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
