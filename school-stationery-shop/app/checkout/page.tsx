'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, CheckCircle, QrCode, Truck, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/store/cart';

const SHIPPING_THRESHOLD = 300000;
const SHIPPING_FEE = 25000;

interface FormData {
  name: string;
  phone: string;
  address: string;
  note: string;
  payment: 'qr' | 'cod';
}

interface FormErrors {
  name?: string;
  phone?: string;
  address?: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCartStore();
  const [form, setForm] = useState<FormData>({ name: '', phone: '', address: '', note: '', payment: 'cod' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const subtotal = totalPrice();
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : (subtotal === 0 ? 0 : SHIPPING_FEE);
  const total = subtotal + shipping;

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = 'Vui lòng nhập họ tên (ít nhất 2 ký tự)';
    if (!form.phone.trim() || !/^(0|\+84)[0-9]{8,10}$/.test(form.phone.replace(/\s/g, '')))
      e.phone = 'Số điện thoại không hợp lệ (VD: 0909123456)';
    if (!form.address.trim() || form.address.trim().length < 10)
      e.address = 'Vui lòng nhập địa chỉ chi tiết (số nhà, đường, phường/xã, quận/huyện, tỉnh/thành)';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    if (!validate()) return;

    setLoading(true);
    setSubmitError(null);

    // Giả lập xử lý đặt hàng (0.8 giây)
    await new Promise(resolve => setTimeout(resolve, 800));

    // Tạo mã đơn hàng giả
    const fakeOrderId = Math.random().toString(36).substring(2, 10).toUpperCase();
    clearCart();
    router.push(`/checkout/success?id=${fakeOrderId}&payment=${form.payment}`);
  };

  if (items.length === 0) {
    return (
      <div className="empty-state" style={{ paddingTop: 80 }}>
        <div className="empty-icon">🛒</div>
        <h2 style={{ marginBottom: 8 }}>Giỏ hàng trống</h2>
        <p style={{ marginBottom: 24 }}>Hãy thêm sản phẩm trước khi thanh toán</p>
        <Link href="/shopping" className="btn btn-primary btn-lg">Mua sắm ngay</Link>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))', padding: '28px 0' }}>
        <div className="container">
          <h1 style={{ color: '#fff', fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 800 }}>💳 Thanh toán</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, marginTop: 4 }}>Điền thông tin để hoàn tất đơn hàng</p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 28, paddingBottom: 60 }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gap: 24, gridTemplateColumns: '1fr' }} className="checkout-grid">
            {/* Left: Form */}
            <div>
              {/* Contact info */}
              <div className="card" style={{ padding: 24, marginBottom: 20 }}>
                <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 20 }}>📋</span> Thông tin người nhận
                </h2>

                <div className="form-group">
                  <label className="form-label" htmlFor="checkout-name">Họ và tên *</label>
                  <input id="checkout-name" type="text" placeholder="Nguyễn Văn An"
                    value={form.name} onChange={e => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: undefined }); }}
                    className={`form-input ${errors.name ? 'error' : ''}`}
                  />
                  {errors.name && <div className="form-error"><AlertCircle size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> {errors.name}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="checkout-phone">Số điện thoại *</label>
                  <input id="checkout-phone" type="tel" placeholder="0909 123 456"
                    value={form.phone} onChange={e => { setForm({ ...form, phone: e.target.value }); setErrors({ ...errors, phone: undefined }); }}
                    className={`form-input ${errors.phone ? 'error' : ''}`}
                  />
                  {errors.phone && <div className="form-error"><AlertCircle size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> {errors.phone}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="checkout-address">Địa chỉ nhận hàng *</label>
                  <textarea id="checkout-address" placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                    rows={3} value={form.address}
                    onChange={e => { setForm({ ...form, address: e.target.value }); setErrors({ ...errors, address: undefined }); }}
                    className={`form-input ${errors.address ? 'error' : ''}`}
                    style={{ resize: 'vertical' }}
                  />
                  {errors.address && <div className="form-error"><AlertCircle size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> {errors.address}</div>}
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" htmlFor="checkout-note">Ghi chú (không bắt buộc)</label>
                  <textarea id="checkout-note" placeholder="Ghi chú về đơn hàng, thời gian giao hàng..."
                    rows={2} value={form.note}
                    onChange={e => setForm({ ...form, note: e.target.value })}
                    className="form-input"
                    style={{ resize: 'vertical' }}
                  />
                </div>
              </div>

              {/* Payment method */}
              <div className="card" style={{ padding: 24, marginBottom: 20 }}>
                <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 20 }}>💳</span> Phương thức thanh toán
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {/* COD */}
                  <div className={`payment-option ${form.payment === 'cod' ? 'selected' : ''}`}
                    onClick={() => setForm({ ...form, payment: 'cod' })}
                    id="payment-cod"
                  >
                    <div style={{
                      width: 22, height: 22, borderRadius: '50%',
                      border: `2px solid ${form.payment === 'cod' ? 'var(--primary)' : 'var(--border)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, transition: 'border-color 0.2s',
                    }}>
                      {form.payment === 'cod' && <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--primary)' }} />}
                    </div>
                    <Truck size={22} color={form.payment === 'cod' ? 'var(--primary)' : 'var(--text-muted)'} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>Thanh toán khi nhận hàng (COD)</div>
                      <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Trả tiền mặt khi shipper giao hàng đến tay</div>
                    </div>
                  </div>

                  {/* QR */}
                  <div className={`payment-option ${form.payment === 'qr' ? 'selected' : ''}`}
                    onClick={() => setForm({ ...form, payment: 'qr' })}
                    id="payment-qr"
                  >
                    <div style={{
                      width: 22, height: 22, borderRadius: '50%',
                      border: `2px solid ${form.payment === 'qr' ? 'var(--primary)' : 'var(--border)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, transition: 'border-color 0.2s',
                    }}>
                      {form.payment === 'qr' && <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--primary)' }} />}
                    </div>
                    <QrCode size={22} color={form.payment === 'qr' ? 'var(--primary)' : 'var(--text-muted)'} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>Chuyển khoản QR Code</div>
                      <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Quét QR và chuyển khoản qua app ngân hàng</div>
                    </div>
                  </div>
                </div>

                {/* QR Panel */}
                {form.payment === 'qr' && (
                  <div style={{
                    marginTop: 16, background: 'var(--primary-light)', borderRadius: 'var(--radius)',
                    padding: '20px', textAlign: 'center', border: '1px dashed var(--primary)',
                    animation: 'scaleIn 0.25s ease',
                  }}>
                    {/* Ảnh QR thật */}
                    <div style={{
                      width: 180, height: 180, margin: '0 auto 16px',
                      background: '#fff', borderRadius: 12, padding: 12,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: 'var(--shadow)',
                      overflow: 'hidden',
                    }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/images/qr.jpg"
                        alt="QR chuyển khoản VPP Học Sinh"
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      />
                    </div>
                    <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, color: 'var(--primary)' }}>VPP Học Sinh</p>
                    <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>
                      Ngân hàng: <strong>MB Bank</strong> — STK: <strong>1234 5678 901</strong>
                    </p>
                    <div style={{
                      background: '#fff', borderRadius: 8, padding: '10px 16px',
                      fontSize: 13, lineHeight: 1.6,
                    }}>
                      <strong>Nội dung CK:</strong> VPP + {form.name || '[Tên của bạn]'}<br />
                      <strong>Số tiền:</strong> {total.toLocaleString('vi-VN')}đ
                    </div>
                    <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 10 }}>
                      ⏱️ Đơn hàng được xác nhận trong vòng 15 phút sau khi nhận được CK
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Order summary */}
            <div className="card" style={{ padding: 24, alignSelf: 'start', position: 'sticky', top: 80 }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 16 }}>📦 Xác nhận đơn hàng</h2>

              {/* Products */}
              <div style={{ maxHeight: 240, overflowY: 'auto', marginBottom: 12 }}>
                {items.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13, marginBottom: 8, gap: 8 }}>
                    <span style={{ color: 'var(--text-muted)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.name} × {item.quantity}
                    </span>
                    <span style={{ fontWeight: 600, flexShrink: 0 }}>
                      {((item.sale_price ?? item.price) * item.quantity).toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12 }}>
                {[
                  { l: 'Tạm tính', v: `${subtotal.toLocaleString('vi-VN')}đ` },
                  { l: 'Vận chuyển', v: shipping === 0 ? 'Miễn phí 🎉' : `${shipping.toLocaleString('vi-VN')}đ` },
                ].map(r => (
                  <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8 }}>
                    <span style={{ color: 'var(--text-muted)' }}>{r.l}</span>
                    <span style={{ fontWeight: 600, color: r.v.includes('Miễn') ? 'var(--secondary)' : 'var(--text)' }}>{r.v}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 800, paddingTop: 10, borderTop: '1px solid var(--border)', marginTop: 4 }}>
                  <span>Tổng cộng</span>
                  <span style={{ color: 'var(--primary)' }}>{total.toLocaleString('vi-VN')}đ</span>
                </div>
              </div>

              {submitError && (
                <div style={{
                  marginTop: 16, padding: '12px 16px',
                  background: 'var(--danger-light, #fef2f2)',
                  border: '1px solid var(--danger, #ef4444)',
                  borderRadius: 10, fontSize: 13,
                  color: 'var(--danger, #dc2626)',
                  display: 'flex', alignItems: 'flex-start', gap: 8,
                }}>
                  <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
                  <span>{submitError}</span>
                </div>
              )}

              <button type="submit" className="btn btn-primary btn-full btn-lg" style={{ marginTop: 16 }}
                disabled={loading} id="submit-order">
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
                    Đang xử lý...
                  </span>
                ) : (
                  <>
                    <CheckCircle size={18} />
                    {form.payment === 'qr' ? 'Xác nhận đặt hàng (QR)' : 'Đặt hàng ngay (COD)'}
                  </>
                )}
              </button>

              <p style={{ fontSize: 11, color: 'var(--text-muted)', textAlign: 'center', marginTop: 12, lineHeight: 1.6 }}>
                🔒 Thông tin của bạn được bảo mật an toàn.<br />
                Bằng cách đặt hàng, bạn đồng ý với chính sách của chúng tôi.
              </p>

              <div style={{ marginTop: 12 }}>
                <Link href="/cart" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--primary)', fontSize: 14, justifyContent: 'center' }}>
                  <ChevronLeft size={16} /> Quay lại giỏ hàng
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .checkout-grid {
            grid-template-columns: 1fr 380px !important;
          }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
