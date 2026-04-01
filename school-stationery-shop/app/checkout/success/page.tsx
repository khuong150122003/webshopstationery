'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, ShoppingBag, Home, QrCode, Truck, Phone } from 'lucide-react';

function SuccessContent() {
  const params = useSearchParams();
  const orderId = params.get('id');
  const payment = params.get('payment');
  const shortId = orderId ? orderId.slice(0, 8).toUpperCase() : 'N/A';

  return (
    <div style={{
      background: 'var(--bg)', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '40px 16px',
    }}>
      <div style={{ maxWidth: 520, width: '100%' }}>
        {/* Success icon */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 96, height: 96, borderRadius: '50%',
            background: 'var(--secondary-light)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px',
            animation: 'scaleIn 0.4s ease',
          }}>
            <CheckCircle size={52} color="var(--secondary)" />
          </div>
          <h1 style={{ fontSize: 'clamp(24px, 5vw, 32px)', fontWeight: 800, color: 'var(--secondary)', marginBottom: 8 }}>
            Đặt hàng thành công! 🎉
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>
            Cảm ơn bạn đã mua hàng tại VPP Học Sinh
          </p>
        </div>

        {/* Order info */}
        <div className="card" style={{ padding: 24, marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid var(--border)' }}>
            <div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>MÃ ĐƠN HÀNG</div>
              <div style={{ fontWeight: 800, fontSize: 20, fontFamily: 'monospace', color: 'var(--primary)', letterSpacing: 1 }}>
                #{shortId}
              </div>
            </div>
            <div style={{
              background: 'var(--accent-light)', color: 'var(--accent-dark)',
              padding: '6px 14px', borderRadius: 100, fontSize: 13, fontWeight: 700,
            }}>
              Chờ xác nhận
            </div>
          </div>

          {/* Payment method */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px', background: 'var(--bg-alt)', borderRadius: 'var(--radius-sm)' }}>
            {payment === 'qr' ? (
              <>
                <QrCode size={28} color="var(--primary)" />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>Chuyển khoản QR Code</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Vui lòng hoàn tất thanh toán trong 15 phút</div>
                </div>
              </>
            ) : (
              <>
                <Truck size={28} color="var(--secondary)" />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>Thanh toán khi nhận hàng (COD)</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Chuẩn bị tiền mặt khi nhận hàng</div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* QR reminder */}
        {payment === 'qr' && (
          <div className="card" style={{
            padding: 20, marginBottom: 20,
            border: '2px dashed var(--primary)',
            background: 'var(--primary-light)',
          }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8, color: 'var(--primary)' }}>
              ⚠️ Nhớ hoàn tất chuyển khoản
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>
              Ngân hàng: <strong>MB Bank</strong><br />
              Số tài khoản: <strong>1234 5678 901</strong><br />
              Chủ TK: <strong>VPP HỌC SINH</strong><br />
              Nội dung: <strong>VPP #{shortId}</strong>
            </div>
          </div>
        )}

        {/* Next steps */}
        <div className="card" style={{ padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>📦 Bước tiếp theo</div>
          {[
            { icon: '✅', text: 'Chúng tôi sẽ xác nhận đơn hàng trong vòng 30 phút' },
            { icon: '📦', text: 'Đóng gói và giao cho đơn vị vận chuyển trong 1–2 ngày làm việc' },
            { icon: '🚚', text: 'Giao hàng toàn quốc, thời gian 2–5 ngày tùy khu vực' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{s.icon}</span>
              <span style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>{s.text}</span>
            </div>
          ))}

          <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <Phone size={16} color="var(--primary)" />
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
              Cần hỗ trợ? Gọi: <strong style={{ color: 'var(--primary)' }}>0909 123 456</strong> (8h–21h hàng ngày)
            </span>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 12 }}>
          <Link href="/" className="btn btn-outline" style={{ flex: 1, justifyContent: 'center', gap: 8 }} id="back-home">
            <Home size={16} /> Trang chủ
          </Link>
          <Link href="/shopping" className="btn btn-primary" style={{ flex: 2, justifyContent: 'center', gap: 8 }} id="continue-shopping">
            <ShoppingBag size={16} /> Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: 60 }}>Đang tải...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
