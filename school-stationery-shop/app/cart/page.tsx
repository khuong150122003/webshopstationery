'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ChevronLeft } from 'lucide-react';
import { useCartStore } from '@/store/cart';

const SHIPPING_THRESHOLD = 300000;
const SHIPPING_FEE = 25000;

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCartStore();

  const subtotal = totalPrice();
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : (subtotal === 0 ? 0 : SHIPPING_FEE);
  const total = subtotal + shipping;

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))', padding: '28px 0' }}>
        <div className="container">
          <h1 style={{ color: '#fff', fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 800 }}>🛒 Giỏ hàng của bạn</h1>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 28, paddingBottom: 48 }}>
        {items.length === 0 ? (
          <div className="empty-state" style={{ paddingTop: 80 }}>
            <div className="empty-icon">🛒</div>
            <h2 style={{ marginBottom: 8 }}>Giỏ hàng đang trống</h2>
            <p style={{ marginBottom: 24 }}>Hãy thêm sản phẩm vào giỏ để tiếp tục</p>
            <Link href="/shopping" className="btn btn-primary btn-lg">
              <ShoppingBag size={18} />
              Mua sắm ngay
            </Link>
          </div>
        ) : (
          <div style={{
            display: 'grid', gap: 24,
            gridTemplateColumns: '1fr',
          }} className="cart-layout">
            {/* Items list */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700 }}>
                  Sản phẩm ({items.reduce((s, i) => s + i.quantity, 0)} món)
                </h2>
                <button onClick={clearCart} style={{
                  fontSize: 13, color: 'var(--danger)', background: 'none',
                  border: 'none', cursor: 'pointer', fontWeight: 500,
                  display: 'flex', alignItems: 'center', gap: 4,
                }}
                  onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
                  onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
                >
                  <Trash2 size={14} /> Xóa tất cả
                </button>
              </div>

              {/* Free shipping bar */}
              {subtotal > 0 && subtotal < SHIPPING_THRESHOLD && (
                <div style={{
                  background: 'var(--accent-light)', borderRadius: 'var(--radius)',
                  padding: '12px 16px', marginBottom: 16,
                }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent-dark)', marginBottom: 6 }}>
                    🎁 Mua thêm {(SHIPPING_THRESHOLD - subtotal).toLocaleString('vi-VN')}đ để được miễn phí vận chuyển!
                  </p>
                  <div style={{ height: 6, background: 'rgba(0,0,0,0.08)', borderRadius: 3 }}>
                    <div style={{
                      height: '100%', background: 'var(--accent)', borderRadius: 3,
                      width: `${Math.min((subtotal / SHIPPING_THRESHOLD) * 100, 100)}%`,
                      transition: 'width 0.4s ease',
                    }} />
                  </div>
                </div>
              )}
              {subtotal >= SHIPPING_THRESHOLD && (
                <div style={{ background: 'var(--secondary-light)', borderRadius: 'var(--radius)', padding: '12px 16px', marginBottom: 16, fontSize: 13, fontWeight: 600, color: 'var(--secondary-dark)' }}>
                  🎉 Bạn được miễn phí vận chuyển!
                </div>
              )}

              {/* Cart Items */}
              <div className="card">
                {items.map((item, idx) => (
                  <div key={item.id} style={{
                    display: 'flex', gap: 16, padding: '20px',
                    borderBottom: idx < items.length - 1 ? '1px solid var(--border)' : 'none',
                    animation: 'slideUp 0.2s ease',
                    alignItems: 'center',
                  }}>
                    {/* Image */}
                    <div style={{
                      position: 'relative', width: 88, height: 88, flexShrink: 0,
                      borderRadius: 'var(--radius-sm)', overflow: 'hidden', background: 'var(--bg-alt)',
                    }}>
                      <Image src={item.image_url || '/images/placeholder.jpg'} alt={item.name} fill style={{ objectFit: 'cover' }} sizes="88px" />
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 4, lineHeight: 1.4 }}>{item.name}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                        <span style={{ fontSize: 16, fontWeight: 700, color: item.sale_price ? 'var(--danger)' : 'var(--primary)' }}>
                          {(item.sale_price ?? item.price).toLocaleString('vi-VN')}đ
                        </span>
                        {item.sale_price && (
                          <span style={{ fontSize: 12, textDecoration: 'line-through', color: 'var(--text-light)' }}>
                            {item.price.toLocaleString('vi-VN')}đ
                          </span>
                        )}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                        <div className="qty-control">
                          <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Giảm">
                            <Minus size={13} />
                          </button>
                          <span className="qty-value">{item.quantity}</span>
                          <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Tăng">
                            <Plus size={13} />
                          </button>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                          <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--primary)' }}>
                            {((item.sale_price ?? item.price) * item.quantity).toLocaleString('vi-VN')}đ
                          </span>
                          <button onClick={() => removeItem(item.id)} style={{
                            width: 32, height: 32, borderRadius: 8, background: 'var(--danger-light)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                          }}
                            onMouseEnter={e => (e.currentTarget.style.background = 'var(--danger)')}
                            onMouseLeave={e => (e.currentTarget.style.background = 'var(--danger-light)')}
                            aria-label="Xóa"
                          >
                            <Trash2 size={15} color="var(--danger)" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 16 }}>
                <Link href="/shopping" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, color: 'var(--primary)', fontWeight: 500 }}>
                  <ChevronLeft size={16} />
                  Tiếp tục mua hàng
                </Link>
              </div>
            </div>

            {/* Order summary */}
            <div className="card" style={{ padding: 24, alignSelf: 'start', position: 'sticky', top: 80 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Tổng đơn hàng</h2>

              {items.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8 }}>
                  <span style={{ color: 'var(--text-muted)' }}>{item.name} × {item.quantity}</span>
                  <span style={{ fontWeight: 600 }}>
                    {((item.sale_price ?? item.price) * item.quantity).toLocaleString('vi-VN')}đ
                  </span>
                </div>
              ))}

              <div style={{ borderTop: '1px solid var(--border)', marginTop: 12, paddingTop: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8 }}>
                  <span style={{ color: 'var(--text-muted)' }}>Tạm tính</span>
                  <span style={{ fontWeight: 600 }}>{subtotal.toLocaleString('vi-VN')}đ</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 16 }}>
                  <span style={{ color: 'var(--text-muted)' }}>Phí vận chuyển</span>
                  <span style={{ fontWeight: 600, color: shipping === 0 ? 'var(--secondary)' : 'var(--text)' }}>
                    {shipping === 0 ? 'Miễn phí 🎉' : `${shipping.toLocaleString('vi-VN')}đ`}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 800, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
                  <span>Tổng cộng</span>
                  <span style={{ color: 'var(--primary)' }}>{total.toLocaleString('vi-VN')}đ</span>
                </div>
              </div>

              <Link href="/checkout" className="btn btn-primary btn-full btn-lg" style={{ marginTop: 20 }} id="proceed-checkout">
                Tiến hành thanh toán <ArrowRight size={18} />
              </Link>

              <div style={{ marginTop: 16, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                {['🔒 Bảo mật', '📦 Ship toàn quốc', '↩️ Đổi trả 7 ngày'].map(t => (
                  <span key={t} style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .cart-layout {
            grid-template-columns: 1fr 380px !important;
          }
        }
      `}</style>
    </div>
  );
}
