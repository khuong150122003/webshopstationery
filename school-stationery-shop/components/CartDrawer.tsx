'use client';

import Image from 'next/image';
import Link from 'next/link';
import { X, Trash2, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react';
import { useCartStore } from '@/store/cart';

const SHIPPING_THRESHOLD = 300000;
const SHIPPING_FEE = 25000;

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } = useCartStore();

  const subtotal = totalPrice();
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="overlay" onClick={closeCart} style={{ zIndex: 50 }} />

      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: '100%', maxWidth: 420,
        background: '#fff', zIndex: 51,
        display: 'flex', flexDirection: 'column',
        boxShadow: 'var(--shadow-lg)',
        animation: 'slideInRight 0.3s ease',
      }}>
        {/* Header */}
        <div style={{
          padding: '18px 20px', borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'var(--primary-light)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ShoppingBag size={20} color="var(--primary)" />
            <span style={{ fontWeight: 700, fontSize: 17, color: 'var(--primary)' }}>Giỏ hàng</span>
            {items.length > 0 && (
              <span style={{
                background: 'var(--primary)', color: '#fff',
                borderRadius: '50%', width: 22, height: 22,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700,
              }}>{items.reduce((s, i) => s + i.quantity, 0)}</span>
            )}
          </div>
          <button onClick={closeCart} style={{
            width: 36, height: 36, borderRadius: 8, background: 'rgba(37,99,235,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: 'none', cursor: 'pointer',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(37,99,235,0.2)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(37,99,235,0.1)')}
            aria-label="Đóng giỏ hàng"
          >
            <X size={18} color="var(--primary)" />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 20px' }}>
          {items.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🛒</div>
              <h3 style={{ marginBottom: 8 }}>Giỏ hàng trống</h3>
              <p style={{ marginBottom: 20, fontSize: 14 }}>Hãy thêm sản phẩm vào giỏ để tiếp tục mua hàng</p>
              <button onClick={closeCart} className="btn btn-primary">
                <ShoppingBag size={16} />
                Mua sắm ngay
              </button>
            </div>
          ) : (
            <>
              {/* Free shipping progress */}
              {subtotal < SHIPPING_THRESHOLD && (
                <div style={{
                  background: 'var(--accent-light)', borderRadius: 10,
                  padding: '10px 14px', marginBottom: 16, fontSize: 13,
                }}>
                  <span style={{ color: 'var(--accent-dark)', fontWeight: 600 }}>
                    🎁 Mua thêm {(SHIPPING_THRESHOLD - subtotal).toLocaleString('vi-VN')}đ để được miễn phí vận chuyển!
                  </span>
                  <div style={{ marginTop: 6, height: 4, background: 'rgba(0,0,0,0.1)', borderRadius: 2 }}>
                    <div style={{
                      height: '100%', background: 'var(--accent)',
                      borderRadius: 2, width: `${Math.min((subtotal / SHIPPING_THRESHOLD) * 100, 100)}%`,
                      transition: 'width 0.3s ease',
                    }} />
                  </div>
                </div>
              )}
              {subtotal >= SHIPPING_THRESHOLD && (
                <div style={{
                  background: 'var(--secondary-light)', borderRadius: 10,
                  padding: '10px 14px', marginBottom: 16, fontSize: 13,
                  color: 'var(--secondary-dark)', fontWeight: 600,
                }}>
                  🎉 Bạn được miễn phí vận chuyển!
                </div>
              )}

              {items.map(item => (
                <div key={item.id} style={{
                  display: 'flex', gap: 12, padding: '14px 0',
                  borderBottom: '1px solid var(--border)',
                  animation: 'slideUp 0.2s ease',
                }}>
                  {/* Image */}
                  <div style={{ position: 'relative', width: 72, height: 72, flexShrink: 0, borderRadius: 8, overflow: 'hidden', background: 'var(--bg-alt)' }}>
                    <Image src={item.image_url || '/images/placeholder.jpg'} alt={item.name} fill style={{ objectFit: 'cover' }} sizes="72px" />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.name}
                    </p>
                    <p style={{ fontSize: 14, fontWeight: 700, color: item.sale_price ? 'var(--danger)' : 'var(--primary)', marginBottom: 8 }}>
                      {(item.sale_price ?? item.price).toLocaleString('vi-VN')}đ
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div className="qty-control">
                        <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Giảm">
                          <Minus size={13} />
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Tăng">
                          <Plus size={13} />
                        </button>
                      </div>
                      <button onClick={() => removeItem(item.id)} style={{
                        width: 30, height: 30, borderRadius: 6, background: 'var(--danger-light)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                      }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'var(--danger)', (e.currentTarget.querySelector('svg') as SVGElement).style.color = '#fff')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'var(--danger-light)', (e.currentTarget.querySelector('svg') as SVGElement).style.color = 'var(--danger)')}
                        aria-label="Xóa"
                      >
                        <Trash2 size={14} color="var(--danger)" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border)', background: 'var(--bg-alt)' }}>
            <div style={{ marginBottom: 12 }}>
              {[
                { label: 'Tạm tính:', value: `${subtotal.toLocaleString('vi-VN')}đ` },
                { label: 'Phí vận chuyển:', value: shipping === 0 ? 'Miễn phí 🎉' : `${shipping.toLocaleString('vi-VN')}đ` },
              ].map(r => (
                <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 6 }}>
                  <span style={{ color: 'var(--text-muted)' }}>{r.label}</span>
                  <span style={{ fontWeight: 600, color: r.value.includes('Miễn') ? 'var(--secondary)' : 'var(--text)' }}>{r.value}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 700, paddingTop: 10, borderTop: '1px solid var(--border)', marginTop: 4 }}>
                <span>Tổng cộng:</span>
                <span style={{ color: 'var(--primary)' }}>{total.toLocaleString('vi-VN')}đ</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <Link href="/cart" onClick={closeCart} className="btn btn-outline btn-sm" style={{ flex: 1 }}>
                Xem giỏ hàng
              </Link>
              <Link href="/checkout" onClick={closeCart} className="btn btn-primary" style={{ flex: 2, gap: 6 }}>
                Thanh toán <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
