'use client';

import Image from 'next/image';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '@/lib/types';
import { useCartStore } from '@/store/cart';
import React from 'react';

interface Props {
  product: Product;
}

const BADGE_MAP: Record<string, { cls: string; label: string }> = {
  'Bán chạy': { cls: 'badge-hot', label: '🔥 Bán chạy' },
  'Mới': { cls: 'badge-new', label: '✨ Mới' },
  'Giá tốt': { cls: 'badge-sale', label: '💰 Giá tốt' },
};

export default function ProductCard({ product }: Props) {
  const { addItem } = useCartStore();
  const [added, setAdded] = React.useState(false);

  const displayPrice = product.sale_price ?? product.price;
  const badgeInfo = product.badge ? BADGE_MAP[product.badge] : null;

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      sale_price: product.sale_price,
      image_url: product.image_url,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="card" style={{
      display: 'flex', flexDirection: 'column',
      transition: 'transform 0.22s ease, box-shadow 0.22s ease',
      cursor: 'pointer',
      position: 'relative',
    }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-md)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow)';
      }}
    >
      {/* Badge */}
      {badgeInfo && (
        <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 2 }}>
          <span className={`badge ${badgeInfo.cls}`}>{badgeInfo.label}</span>
        </div>
      )}

      {/* Sale badge */}
      {product.sale_price && (
        <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 2 }}>
          <span style={{
            background: 'var(--danger)', color: '#fff',
            fontWeight: 700, fontSize: 12, padding: '3px 7px',
            borderRadius: 6,
          }}>
            -{Math.round((1 - product.sale_price / product.price) * 100)}%
          </span>
        </div>
      )}

      {/* Image */}
      <div style={{ position: 'relative', paddingTop: '68%', background: 'var(--bg-alt)', overflow: 'hidden' }}
        className="product-img-wrap">
        <Image
          src={product.image_url || '/images/placeholder.jpg'}
          alt={product.name}
          fill
          className="product-img"
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      {/* Content */}
      <div style={{ padding: '14px 14px 16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Category */}
        {product.categories && (
          <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500, marginBottom: 4 }}>
            {product.categories.icon} {product.categories.name}
          </span>
        )}

        {/* Name */}
        <h3 style={{
          fontSize: 14, fontWeight: 600, color: 'var(--text)',
          marginBottom: 6, lineHeight: 1.4,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {product.name}
        </h3>

        {/* Stars */}
        <div style={{ display: 'flex', gap: 2, marginBottom: 8 }}>
          {[1,2,3,4,5].map(s => <Star key={s} size={12} fill={s<=4 ? '#f59e0b' : 'none'} color="#f59e0b" />)}
          <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 4 }}>(42)</span>
        </div>

        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, marginTop: 'auto' }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: product.sale_price ? 'var(--danger)' : 'var(--primary)' }}>
            {displayPrice.toLocaleString('vi-VN')}đ
          </span>
          {product.sale_price && (
            <span className="price-original">
              {product.price.toLocaleString('vi-VN')}đ
            </span>
          )}
        </div>

        {/* Add button */}
        <button
          onClick={handleAdd}
          className="btn btn-primary btn-sm btn-full"
          style={{
            background: added ? 'var(--secondary)' : undefined,
            boxShadow: added ? '0 4px 14px rgba(22,163,74,0.3)' : undefined,
          }}
          id={`add-to-cart-${product.id}`}
        >
          <ShoppingCart size={15} />
          {added ? 'Đã thêm ✓' : 'Thêm vào giỏ'}
        </button>
      </div>
    </div>
  );
}
