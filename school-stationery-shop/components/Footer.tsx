import Link from 'next/link';
import { BookOpen, Phone, MapPin, Mail, Globe, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="footer" style={{
      background: '#0f172a',
      color: '#94a3b8',
      paddingTop: 56,
      paddingBottom: 24,
      marginTop: 'auto',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 40,
          marginBottom: 40,
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <BookOpen size={20} color="#fff" />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 16, color: '#fff' }}>VPP Học Sinh</div>
                <div style={{ fontSize: 11 }}>Dụng cụ học tập</div>
              </div>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              Cửa hàng văn phòng phẩm học sinh uy tín, giá hợp lý, hàng đa dạng cho mọi cấp học.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <a href="#" aria-label="Website" className="social-btn">
                <Globe size={17} color="#94a3b8" />
              </a>
              <a href="#" aria-label="Zalo" className="social-btn">
                <Send size={17} color="#94a3b8" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 14, marginBottom: 16 }}>Điều hướng</div>
            {[
              { href: '/', label: 'Trang chủ' },
              { href: '/shopping', label: 'Mua sắm' },
              { href: '/#combo', label: 'Combo học tập' },
              { href: '/cart', label: 'Giỏ hàng' },
              { href: '/checkout', label: 'Thanh toán' },
            ].map(l => (
              <div key={l.href} style={{ marginBottom: 8 }}>
                <Link href={l.href} className="footer-link">{l.label}</Link>
              </div>
            ))}
          </div>

          {/* Policy */}
          <div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 14, marginBottom: 16 }}>Chính sách</div>
            <div style={{ fontSize: 14, lineHeight: 2 }}>
              <div>✓ Giao hàng toàn quốc</div>
              <div>✓ Không cần tài khoản</div>
              <div>✓ Thanh toán QR / COD</div>
              <div>✓ Đổi trả trong 7 ngày</div>
              <div>✓ Hỗ trợ 8h–21h hàng ngày</div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 14, marginBottom: 16 }}>Liên hệ</div>
            {[
              { Icon: Phone, text: '0909 123 456' },
              { Icon: Mail, text: 'vpp@hocsinh.vn' },
              { Icon: MapPin, text: '123 Nguyễn Văn A, Q.1, TP.HCM' },
            ].map(({ Icon, text }) => (
              <div key={text} style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'flex-start' }}>
                <Icon size={16} style={{ marginTop: 2, flexShrink: 0, color: 'var(--primary)' }} />
                <span style={{ fontSize: 14 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: 20,
          display: 'flex', flexWrap: 'wrap', gap: 12,
          justifyContent: 'space-between', alignItems: 'center', fontSize: 13,
        }}>
          <span>© 2026 VPP Học Sinh. Tất cả quyền được bảo lưu.</span>
          <span>Thiết kế với ❤️ cho học sinh Việt Nam</span>
        </div>
      </div>
    </footer>
  );
}
