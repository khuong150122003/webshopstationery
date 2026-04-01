-- ============================================================
-- School Stationery Shop — Supabase Database Schema + Seed
-- Chạy file này trên Supabase SQL Editor
-- ============================================================

-- DROP existing tables if re-running
drop table if exists orders cascade;
drop table if exists products cascade;
drop table if exists categories cascade;

-- Bảng categories
create table categories (
  id serial primary key,
  name text not null,
  slug text unique not null,
  icon text
);

-- Bảng products
create table products (
  id serial primary key,
  name text not null,
  slug text unique not null,
  description text,
  price integer not null,
  sale_price integer default null,
  category_id integer references categories(id) on delete set null,
  image_url text,
  badge text default null,
  is_combo boolean default false,
  combo_level text default null,
  stock integer default 100,
  created_at timestamptz default now()
);

-- Bảng orders
create table orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  phone text not null,
  address text not null,
  note text,
  payment_method text not null,
  total_amount integer not null,
  items jsonb not null,
  status text default 'pending',
  created_at timestamptz default now()
);

-- ============================================================
-- Row Level Security
-- ============================================================
alter table categories enable row level security;
alter table products enable row level security;
alter table orders enable row level security;

create policy "public read categories" on categories for select using (true);
create policy "public read products" on products for select using (true);
create policy "public insert orders" on orders for insert with check (true);
create policy "public read own orders" on orders for select using (true);

-- ============================================================
-- SEED DATA — Categories (9 danh mục)
-- ============================================================
insert into categories (name, slug, icon) values
  ('Vở & Sổ', 'vo-so', '📓'),
  ('Bút viết', 'but-viet', '✏️'),
  ('Dụng cụ vẽ', 'dung-cu-ve', '🎨'),
  ('Dụng cụ học tập', 'dung-cu-hoc-tap', '📐'),
  ('Hộp bút & Túi', 'hop-but-tui', '🎒'),
  ('Giấy & Hồ dán', 'giay-ho-dan', '📄'),
  ('Máy tính', 'may-tinh', '🔢'),
  ('Tẩy & Chuốt', 'tay-chuot', '🩹'),
  ('Combo học tập', 'combo', '📦');

-- ============================================================
-- SEED DATA — Products (15 sản phẩm)
-- ============================================================
insert into products (name, slug, description, price, sale_price, category_id, image_url, badge, is_combo, combo_level, stock) values

-- Vở & Sổ (category 1)
(
  'Vở Campus 120 Trang Kẻ Ngang',
  'vo-campus-120',
  'Vở học sinh Campus 120 trang kẻ ngang, giấy trắng 70gsm, bìa cứng chống thấm. Phù hợp mọi cấp học.',
  22000, 18000, 1,
  '/images/products/vo-campus-120.jpg',
  'Bán chạy', false, null, 200
),
(
  'Vở Hồng Hà 96 Trang',
  'vo-hong-ha-96',
  'Vở Hồng Hà 96 trang truyền thống, giấy dai bền, kẻ dòng chuẩn, giá học sinh.',
  12000, null, 1,
  '/images/products/vo-hong-ha-96.jpg',
  'Giá tốt', false, null, 300
),
(
  'Sổ Tay Bìa Cứng A5',
  'so-tay-bia-cung-a5',
  'Sổ tay A5 bìa cứng 200 trang, trang trắng kẻ mờ, nhiều màu bìa thời trang.',
  35000, 28000, 1,
  '/images/products/so-tay-a5.jpg',
  'Mới', false, null, 150
),

-- Bút viết (category 2)
(
  'Bút Bi Thiên Long TL-027',
  'but-bi-thien-long-tl027',
  'Bút bi Thiên Long TL-027 mực xanh, ngòi 0.7mm, viết trơn đều, nắp đậy chắc chắn.',
  5000, null, 2,
  '/images/products/but-bi-thien-long.jpg',
  'Bán chạy', false, null, 500
),
(
  'Bút Chì Gỗ HB Staedtler',
  'but-chi-go-hb-staedtler',
  'Bút chì gỗ HB chất lượng cao, lõi chì đồng đều, dễ gọt, phù hợp vẽ và viết.',
  8000, null, 2,
  '/images/products/but-chi-hb.jpg',
  null, false, null, 400
),
(
  'Bút Highlight 5 màu Stabilo',
  'but-highlight-5-mau-stabilo',
  'Bộ 5 bút highlight màu neon rực rỡ: vàng, xanh lá, hồng, cam, xanh dương. Dành cho học sinh cấp 2, 3 và sinh viên.',
  45000, 38000, 2,
  '/images/products/but-highlight-stabilo.jpg',
  'Bán chạy', false, null, 120
),
(
  'Bút Gel Nét 0.5mm Hộp 12 Cây',
  'but-gel-net-05-hop-12',
  'Hộp 12 bút gel 0.5mm mực đen, viết sắc nét, không lem, phù hợp học tập và thi cử.',
  55000, 48000, 2,
  '/images/products/but-gel-hop-12.jpg',
  'Giá tốt', false, null, 80
),

-- Dụng cụ vẽ (category 3)
(
  'Bộ Màu Sáp 24 Màu Thiên Long',
  'bo-mau-sap-24-thien-long',
  'Bộ màu sáp 24 màu Thiên Long, màu sắc tươi sáng, an toàn cho trẻ em, hộp thiếc bền đẹp.',
  65000, 55000, 3,
  '/images/products/mau-sap-24-thien-long.jpg',
  'Bán chạy', false, null, 90
),

-- Dụng cụ học tập (category 4)
(
  'Bộ Thước Hình Học 4 Món',
  'bo-thuoc-hinh-hoc-4-mon',
  'Bộ thước hình học 4 món: thước kẻ 20cm, êke, thước đo độ, compa. Đầy đủ cho học sinh từ cấp 2.',
  28000, 22000, 4,
  '/images/products/bo-thuoc-hinh-hoc.jpg',
  'Giá tốt', false, null, 150
),

-- Tẩy & Chuốt (category 8)
(
  'Gôm Trắng Học Sinh Milan',
  'gom-trang-hoc-sinh-milan',
  'Gôm trắng Milan tẩy sạch, không bị vón cục, không lem giấy, kích thước vừa tay.',
  12000, null, 8,
  '/images/products/gom-trang-milan.jpg',
  null, false, null, 300
),
(
  'Chuốt Bút Chì 2 Lỗ',
  'chuot-but-chi-2-lo',
  'Chuốt bút chì 2 lỗ kim loại, chuốt cho bút chì thường và bút chì to, dao thép sắc bén.',
  7000, null, 8,
  '/images/products/chuot-but-chi.jpg',
  null, false, null, 250
),

-- Hộp bút (category 5)
(
  'Hộp Bút Zipper Vải Canvas',
  'hop-but-zipper-canvas',
  'Hộp bút vải canvas chống nước, khóa kéo êm, nhiều ngăn tiện lợi, form dẹt để bàn gọn.',
  55000, 45000, 5,
  '/images/products/hop-but-zipper.jpg',
  'Mới', false, null, 100
),

-- Máy tính (category 7)
(
  'Máy Tính Học Sinh Thiên Long CS-680',
  'may-tinh-hoc-sinh-thien-long-cs680',
  'Máy tính học sinh Thiên Long CS-680, 240 tính năng, màn hình lớn dễ đọc, pin AAA dùng bền.',
  115000, 99000, 7,
  '/images/products/may-tinh-thien-long.jpg',
  'Bán chạy', false, null, 60
),

-- COMBO (category 9)
(
  'Combo Tiểu Học Tiết Kiệm',
  'combo-tieu-hoc-tiet-kiem',
  'Combo đầy đủ cho học sinh tiểu học: 5 quyển vở, 1 hộp bút chì, 1 gôm, 1 chuốt, 1 thước. Tiết kiệm hơn mua lẻ 30%.',
  89000, 75000, 9,
  '/images/products/combo-tieu-hoc.jpg',
  'Giá tốt', true, 'Tiểu học', 50
),
(
  'Combo Sinh Viên Ghi Chú',
  'combo-sinh-vien-ghi-chu',
  'Combo cho sinh viên: 2 sổ tay A5, 1 bộ bút highlight, 2 bút gel, giấy note màu, hộp bút. Học hiệu quả hơn mỗi ngày.',
  165000, 139000, 9,
  '/images/products/combo-sinh-vien.jpg',
  'Bán chạy', true, 'Sinh viên', 40
);
