import Link from 'next/link';
import { getFeaturedProducts, getCategories, getComboProducts } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VPP Học Sinh — Trang chủ | Dụng cụ học tập giá hợp lý',
};

export const revalidate = 60;

const BENEFITS = [
  { icon: '🚀', title: 'Không cần đăng nhập', desc: 'Mua hàng ngay không cần tạo tài khoản' },
  { icon: '💳', title: 'Thanh toán dễ dàng', desc: 'QR chuyển khoản hoặc thanh toán khi nhận hàng (COD)' },
  { icon: '📦', title: 'Hàng đa dạng', desc: 'Đủ loại dụng cụ cho mọi cấp học từ tiểu học đến đại học' },
  { icon: '💰', title: 'Giá học sinh', desc: 'Giá rõ ràng, hợp lý, bám sát thị trường hiện tại' },
];

const PRICE_ITEMS = [
  { emoji: '📓', name: 'Vở học sinh', range: '10.000 – 22.000đ' },
  { emoji: '✏️', name: 'Bút bi / bút chì', range: '3.000 – 10.000đ' },
  { emoji: '🩹', name: 'Gôm & chuốt', range: '5.000 – 12.000đ' },
  { emoji: '📐', name: 'Bộ thước', range: '15.000 – 28.000đ' },
  { emoji: '🎨', name: 'Màu vẽ', range: '18.000 – 75.000đ' },
  { emoji: '🎒', name: 'Hộp bút', range: '25.000 – 89.000đ' },
];

const STATIC_COMBOS = [
  { level: 'Tiểu học', icon: '🎒', price: '75.000đ', items: 'Vở + Bút chì + Gôm + Chuốt + Thước', color: 'var(--primary)' },
  { level: 'Cấp 2', icon: '📚', price: '115.000đ', items: 'Vở + Bút bi + Highlight + Thước hình học', color: 'var(--secondary)' },
  { level: 'Sinh viên', icon: '🎓', price: '139.000đ', items: 'Sổ tay + Highlight + Bút gel + Giấy note + Hộp bút', color: 'var(--accent)' },
];

export default async function HomePage() {
  const [featured, categories, combos] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
    getComboProducts(),
  ]);

  const mainCategories = categories.filter(c => c.slug !== 'combo').slice(0, 8);

  return (
    <div>
      {/* ===== HERO ===== */}
      <section style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 40%, #059669 100%)',
        padding: '72px 0 80px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 320, height: 320, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
        <div style={{ position: 'absolute', bottom: -80, left: '30%', width: 250, height: 250, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }} className="hero-grid">
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
                borderRadius: 100, padding: '6px 16px', marginBottom: 24,
                border: '1px solid rgba(255,255,255,0.2)',
              }}>
                <span style={{ fontSize: 16 }}>🎒</span>
                <span style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>Năm học 2026 — Sẵn sàng!</span>
              </div>

              <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, color: '#fff', lineHeight: 1.15, marginBottom: 20 }}>
                Dụng cụ học tập<br />
                <span style={{ color: '#86efac' }}>đẹp, giá hợp lý</span><br />
                cho năm học mới
              </h1>

              <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: 16, lineHeight: 1.7, marginBottom: 32, maxWidth: 480 }}>
                Chọn nhanh bút, vở, hộp bút, màu vẽ và nhiều sản phẩm học tập thiết yếu với mức giá dễ mua. Không cần đăng nhập, thanh toán linh hoạt.
              </p>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/shopping" className="btn btn-accent btn-lg" id="hero-buy-now">🛒 Mua ngay</Link>
                <Link href="/#combo" className="btn btn-lg" style={{
                  background: 'rgba(255,255,255,0.15)', color: '#fff',
                  border: '1.5px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(8px)',
                }} id="hero-combo">
                  📦 Xem combo tiết kiệm
                </Link>
              </div>

              <div style={{ display: 'flex', gap: 32, marginTop: 40 }}>
                {[{ num: '500+', label: 'Sản phẩm' }, { num: '1.200+', label: 'Khách hàng' }, { num: '4.9★', label: 'Đánh giá' }].map(s => (
                  <div key={s.label}>
                    <div style={{ color: '#fff', fontWeight: 800, fontSize: 22 }}>{s.num}</div>
                    <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ fontSize: 'clamp(140px, 22vw, 260px)', filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.3))', animation: 'float 3s ease-in-out infinite', lineHeight: 1 }}>
                🎒
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BENEFITS ===== */}
      <section style={{ background: '#fff', padding: '40px 0', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {BENEFITS.map(b => (
              <div key={b.title} className="benefit-item">
                <span style={{ fontSize: 28, flexShrink: 0 }}>{b.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 3 }}>{b.title}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.5 }}>{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div className="divider divider-center" />
            <h2 className="section-title">Danh mục sản phẩm</h2>
            <p className="section-subtitle">Khám phá đầy đủ dụng cụ học tập cho mọi nhu cầu</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 12 }}>
            {mainCategories.map(cat => (
              <Link key={cat.id} href={`/shopping?category=${cat.slug}`} className="category-card">
                <span style={{ fontSize: 32 }}>{cat.icon || '📦'}</span>
                <span style={{ fontSize: 13, fontWeight: 600, textAlign: 'center', lineHeight: 1.3 }}>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="section" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div className="divider" />
              <h2 className="section-title">🔥 Sản phẩm bán chạy</h2>
              <p className="section-subtitle">Được học sinh và phụ huynh tin chọn nhiều nhất</p>
            </div>
            <Link href="/shopping" className="btn btn-outline btn-sm">Xem tất cả →</Link>
          </div>
          {featured.length > 0 ? (
            <div className="product-grid">
              {featured.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div style={{
              textAlign: 'center', padding: '48px 24px',
              background: '#fff', borderRadius: 'var(--radius)',
              border: '2px dashed var(--border)',
            }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📋</div>
              <h3 style={{ marginBottom: 8 }}>Chưa có dữ liệu sản phẩm</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 16 }}>
                Vui lòng chạy file <strong>supabase-seed.sql</strong> trên Supabase SQL Editor để thêm sản phẩm mẫu.
              </p>
              <a href="https://supabase.com/dashboard/project/sdnlanlbvruqjuqcmdfa/sql"
                target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                Mở Supabase SQL Editor →
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ===== PRICE SECTION ===== */}
      <section style={{ background: 'linear-gradient(135deg, #ecfdf5, #dbeafe)', padding: '48px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="divider divider-center" style={{ background: 'var(--secondary)' }} />
          <h2 className="section-title">💰 Giá học sinh — Dễ mua mỗi ngày</h2>
          <p className="section-subtitle">Mức giá bám sát thị trường, phù hợp túi tiền học sinh</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, maxWidth: 900, margin: '0 auto' }}>
            {PRICE_ITEMS.map(item => (
              <div key={item.name} className="price-card">
                <div style={{ fontSize: 28, marginBottom: 8 }}>{item.emoji}</div>
                <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 6 }}>{item.name}</div>
                <div style={{ color: 'var(--secondary)', fontWeight: 700, fontSize: 14 }}>{item.range}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COMBO SECTION ===== */}
      <section id="combo" className="section" style={{ background: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div className="divider divider-center" style={{ background: 'var(--accent)' }} />
            <h2 className="section-title">📦 Combo học tập tiết kiệm</h2>
            <p className="section-subtitle">Mua combo tiết kiệm hơn mua lẻ đến 30%</p>
          </div>

          {combos.length > 0 ? (
            <div className="product-grid">
              {combos.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20 }}>
              {STATIC_COMBOS.map(c => (
                <div key={c.level} className="combo-static-card" style={{ border: `2px solid ${c.color}` }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>{c.icon}</div>
                  <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 8 }}>Combo {c.level}</div>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16, lineHeight: 1.7 }}>{c.items}</p>
                  <div style={{ fontSize: 22, fontWeight: 800, color: c.color, marginBottom: 16 }}>Chỉ {c.price}</div>
                  <Link href="/shopping?isCombo=true" className="btn btn-primary btn-full">Xem combo</Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== SALE BANNER ===== */}
      <section style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)', padding: '56px 0', textAlign: 'center' }}>
        <div className="container">
          <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
          <h2 style={{ color: '#fff', fontSize: 'clamp(22px, 4vw, 36px)', fontWeight: 800, marginBottom: 12 }}>
            Tựu trường 2026 — Giảm đến 30%
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, marginBottom: 28, maxWidth: 500, margin: '0 auto 28px' }}>
            Hàng trăm sản phẩm đang sale. Đừng bỏ lỡ ưu đãi cho năm học mới!
          </p>
          <Link href="/shopping" className="btn btn-accent btn-lg" id="sale-banner-cta">
            Xem ưu đãi ngay 🔥
          </Link>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
        }
        @media (max-width: 767px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-grid > div:last-child { display: none; }
        }
      `}</style>
    </div>
  );
}
