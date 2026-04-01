'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X, BookOpen } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import CartDrawer from './CartDrawer';

const navLinks = [
  { href: '/', label: 'Trang chủ' },
  { href: '/shopping', label: 'Mua sắm' },
  { href: '/#combo', label: 'Combo học tập' },
  { href: '/checkout', label: 'Thanh toán' },
  { href: '/#footer', label: 'Liên hệ' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { totalItems, toggleCart } = useCartStore();

  return (
    <>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
        height: 'var(--navbar-h)',
      }}>
        <div className="container" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <BookOpen size={20} color="#fff" />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, color: 'var(--text)', lineHeight: 1.2 }}>VPP Học Sinh</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1 }}>Dụng cụ học tập</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }} className="desktop-nav">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className="nav-link">{link.label}</Link>
            ))}
          </div>

          {/* Cart + Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              onClick={toggleCart}
              className="cart-btn"
              aria-label="Giỏ hàng"
              id="cart-btn"
            >
              <ShoppingCart size={20} />
              {totalItems() > 0 && (
                <span className="cart-badge">
                  {totalItems() > 9 ? '9+' : totalItems()}
                </span>
              )}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="hamburger-btn"
              aria-label="Menu"
              id="hamburger-btn"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{
            position: 'absolute', top: '100%', left: 0, right: 0,
            background: '#fff', borderBottom: '1px solid var(--border)',
            boxShadow: 'var(--shadow-lg)', padding: '12px 0',
            animation: 'slideUp 0.2s ease',
          }}>
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="mobile-menu-link"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      <CartDrawer />

      <style>{`
        .cart-btn {
          position: relative;
          width: 44px; height: 44px;
          border-radius: 10px;
          background: var(--primary-light);
          display: flex; align-items: center; justify-content: center;
          border: none; cursor: pointer;
          color: var(--primary);
          transition: all 0.2s;
        }
        .cart-btn:hover {
          background: var(--primary);
          color: #fff;
        }
        .cart-badge {
          position: absolute; top: -6px; right: -6px;
          background: var(--danger); color: #fff;
          width: 20px; height: 20px; border-radius: 50%;
          font-size: 11px; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          border: 2px solid #fff;
          animation: pulse 0.5s ease;
        }
        .hamburger-btn {
          display: none;
          width: 44px; height: 44px;
          border-radius: 10px;
          background: var(--bg-alt);
          align-items: center; justify-content: center;
          border: none; cursor: pointer;
          transition: background 0.2s;
        }
        .hamburger-btn:hover { background: var(--border); }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
