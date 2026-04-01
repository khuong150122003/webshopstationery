# Tài liệu yêu cầu website school stationery responsive

## Mục tiêu dự án
Xây dựng website bán dụng cụ học tập dạng landing page kết hợp shopping page, ưu tiên hiển thị rõ ràng, dễ mua hàng, không yêu cầu đăng nhập và hoạt động tốt trên mobile lẫn desktop. Website cần cho phép người dùng xem sản phẩm, chọn sản phẩm, thêm vào giỏ hàng và đi tới thanh toán bằng QR hoặc thanh toán khi nhận hàng.[cite:2][cite:4]

## Định hướng website
Website phù hợp với nhóm khách hàng là học sinh, sinh viên và phụ huynh đang tìm các sản phẩm văn phòng phẩm có giá hợp lý, dễ mua và đa dạng mẫu mã. Mặt bằng giá nên bám theo thị trường hiện tại, trong đó vở học sinh phổ biến khoảng 7.500 đến 25.000 VND/quyển, bút chì và bút bi phổ biến khoảng 3.000 đến 10.000 VND/cây; đồng thời các chuỗi lớn như FAHASA thường có khuyến mại 5% đến 60% tùy nhóm hàng.[cite:4][cite:9][cite:10]

## Cấu trúc trang
### 1. Homepage
Homepage đóng vai trò landing page chính, cần có:
- Hero banner giới thiệu cửa hàng, thông điệp ngắn gọn như: “Dụng cụ học tập đẹp, giá hợp lý cho năm học mới”.
- Thanh điều hướng gồm: Home, Shopping, Combo học tập, Thanh toán, Liên hệ.
- Khu vực danh mục nổi bật: vở, bút viết, bút chì, thước, gôm, màu vẽ, hộp bút, balo nhẹ, máy tính học sinh.
- Khối lợi ích: giá dễ tiếp cận, hàng đa dạng, thanh toán nhanh, không cần tài khoản.
- Khu vực sản phẩm bán chạy hiển thị ảnh, tên, giá, nút thêm vào giỏ.
- Khối combo khuyến nghị theo nhu cầu: “Combo tiểu học”, “Combo cấp 2”, “Combo sinh viên”.
- Banner ưu đãi theo mùa tựu trường hoặc sale cuối tuần.

### 2. Shopping
Trang Shopping là phần mua hàng chính, cần có:
- Bộ lọc theo danh mục, mức giá, thương hiệu.
- Ô tìm kiếm sản phẩm.
- Grid sản phẩm responsive: desktop 4 cột, tablet 2 cột, mobile 1 cột.
- Card sản phẩm gồm ảnh, tên, mô tả ngắn, giá gốc, giá sale nếu có, nút “Thêm vào giỏ”.
- Hiển thị badge như “Bán chạy”, “Giá tốt”, “Mới”.

### 3. Cart
Trang giỏ hàng cần có:
- Danh sách sản phẩm đã chọn.
- Nút tăng giảm số lượng.
- Tạm tính, phí giao hàng dự kiến, tổng tiền.
- Nút “Tiếp tục mua hàng” và “Tiến hành thanh toán”.
- Không cần đăng nhập trước khi thanh toán.

### 4. Checkout
Trang thanh toán cần đơn giản và rõ ràng, gồm:
- Form nhập họ tên người nhận.
- Số điện thoại.
- Địa chỉ nhận hàng chi tiết.
- Ghi chú đơn hàng.
- Chọn phương thức thanh toán:
  - Thanh toán QR.
  - Thanh toán khi nhận hàng (COD).
- Phần xác nhận đơn hàng gồm danh sách sản phẩm, tổng tiền và nút đặt hàng.

## Tính năng bắt buộc
- Không yêu cầu đăng nhập hoặc tạo tài khoản.
- Có thể thêm sản phẩm vào giỏ hàng trực tiếp từ homepage hoặc shopping page.
- Giỏ hàng cập nhật số lượng và tổng tiền theo thời gian thực bằng JavaScript phía client.
- Cho phép chuyển sang bước checkout ngay sau khi chọn xong sản phẩm.
- Khi chọn thanh toán QR, hiển thị khối QR cùng hướng dẫn chuyển khoản.
- Khi chọn COD, chỉ cần hoàn tất thông tin người nhận để đặt đơn.
- Form thanh toán phải kiểm tra tối thiểu các trường bắt buộc: tên, số điện thoại, địa chỉ.

## Gợi ý danh mục sản phẩm
Nên bố trí danh mục đa dạng để đúng yêu cầu “đa dạng dụng cụ”, ví dụ:
- Vở học sinh, tập kiểm tra, sổ tay.
- Bút bi, bút gel, bút chì, bút highlight, bút xóa.
- Gôm, chuốt bút chì, thước kẻ, compa.
- Màu sáp, màu nước, bút lông màu.
- Hộp bút, túi đựng dụng cụ, balo học sinh.
- Máy tính học sinh, giấy note, hồ dán, kéo thủ công.

## Gợi ý giá bán hợp lý hiện tại
Bảng giá nên đặt theo hướng dễ mua, bám thị trường hiện tại và có thể dùng làm dữ liệu mẫu ban đầu:

| Nhóm sản phẩm | Giá đề xuất | Ghi chú |
|---|---:|---|
| Vở 96-120 trang | 10.000-22.000 VND | Bám mặt bằng phổ biến 7.500-23.000 VND/quyển.[cite:9] |
| Bút bi | 4.000-10.000 VND | Phù hợp mức phổ biến 3.000-10.000 VND/cây.[cite:4] |
| Bút chì | 3.000-8.000 VND | Thuộc nhóm giá phổ thông cho học sinh.[cite:4] |
| Gôm tẩy | 5.000-12.000 VND | Có thể chia 2 dòng: phổ thông và cao cấp. |
| Thước kẻ | 6.000-15.000 VND | Nên có loại 20 cm và bộ thước hình học. |
| Bút highlight | 12.000-25.000 VND | Dành cho học sinh cấp 2, 3 và sinh viên. |
| Màu sáp hoặc bút màu | 18.000-75.000 VND | Tùy số lượng màu và thương hiệu. |
| Hộp bút | 25.000-89.000 VND | Có thể thiết kế nhiều mẫu cho học sinh. |
| Máy tính học sinh | 80.000-130.000 VND | Có sản phẩm trong chương trình sale 2026 của Thiên Long ở mức này.[cite:11] |
| Combo học tập | 59.000-199.000 VND | Nên là gói tiết kiệm để tăng tỷ lệ mua. |

## Luồng người dùng
### Luồng mua hàng cơ bản
1. Người dùng vào homepage.
2. Chọn nhanh sản phẩm nổi bật hoặc bấm vào Shopping.
3. Xem chi tiết sản phẩm và thêm vào giỏ.
4. Mở giỏ hàng để kiểm tra số lượng và tổng tiền.
5. Chuyển sang Checkout.
6. Điền tên, số điện thoại, địa chỉ.
7. Chọn QR hoặc COD.
8. Xác nhận đặt hàng.

## UI/UX đề xuất
- Tông màu nên trẻ trung, sạch sẽ, dễ liên tưởng tới môi trường học tập: xanh dương, xanh lá nhẹ, trắng kem.
- Font dễ đọc, nút bấm lớn, khoảng cách thoáng để phụ huynh và học sinh dùng tốt trên điện thoại.
- Mobile ưu tiên sticky cart bar hoặc nút “Xem giỏ hàng” ở cuối màn hình.
- Mỗi card sản phẩm cần cho thấy ngay tên, ảnh và giá, tránh quá nhiều chữ.
- Có section “Giá học sinh - dễ mua mỗi ngày” để nhấn mạnh mức giá hợp lý.

## Responsive mobile
Website cần thiết kế mobile-first:
- Header gọn, có menu hamburger trên màn hình nhỏ.
- Hero rút gọn nội dung, CTA rõ ràng.
- Danh sách sản phẩm 1 cột trên mobile, 2 cột trên tablet, 4 cột trên desktop.
- Nút thêm vào giỏ và thanh toán có chiều cao đủ lớn để chạm tay dễ dàng.
- Form checkout chia theo block ngắn, dễ nhập trên điện thoại.
- QR thanh toán hiển thị lớn, dễ quét.

## Nội dung đề xuất cho homepage
### Hero
- Tiêu đề: Dụng cụ học tập đẹp, giá hợp lý cho năm học mới.
- Mô tả: Chọn nhanh bút, vở, hộp bút, màu vẽ và nhiều sản phẩm học tập thiết yếu với mức giá dễ mua.
- CTA 1: Mua ngay.
- CTA 2: Xem combo tiết kiệm.

### Cam kết
- Không cần đăng nhập để mua hàng.
- Giá rõ ràng, dễ xem.
- Thanh toán QR hoặc COD.
- Nhiều dụng cụ học tập cho mọi cấp học.

## Dữ liệu sản phẩm mẫu đề xuất
Có thể khởi tạo trước 12-20 sản phẩm mẫu như:
- Vở Campus 120 trang.
- Vở Hồng Hà 96 trang.
- Bút bi Thiên Long.
- Bút chì gỗ HB.
- Gôm trắng học sinh.
- Bộ thước hình học.
- Bút highlight 5 màu.
- Hộp bút zipper.
- Bộ màu sáp 12 màu.
- Máy tính học sinh Thiên Long.
- Combo tiểu học tiết kiệm.
- Combo sinh viên ghi chú.

## Kỹ thuật khuyến nghị
- Dùng HTML, CSS, JavaScript thuần hoặc React nếu muốn dễ mở rộng.
- Nếu làm đúng dạng landing page có shopping đơn giản thì static frontend + JavaScript là đủ cho bản demo.
- Có thể dùng local state phía client để lưu giỏ hàng trong phiên đang mở; vì yêu cầu hiện tại không bắt buộc đăng nhập hay đồng bộ tài khoản.
- Nên chuẩn bị cấu trúc section một trang nhưng có điều hướng mượt tới các phần Home, Shopping, Cart, Checkout.

## Phạm vi bản build đầu tiên
Bản đầu tiên nên gồm:
- 1 homepage có hero, danh mục, sản phẩm nổi bật, combo, lý do chọn shop.
- 1 shopping section hoặc shopping page.
- 1 cart drawer hoặc cart page.
- 1 checkout form với QR và COD.
- 1 footer có hotline, địa chỉ shop, chính sách giao hàng ngắn.

## Ghi chú triển khai
Nếu cần chuyển tài liệu này thành prompt build giao diện hoặc thành cấu trúc file HTML/CSS/JS hoàn chỉnh, có thể dùng ngay nội dung này để phát triển tiếp. Tài liệu đang ưu tiên đúng yêu cầu kinh doanh: rõ ràng, có giá bán, sản phẩm đa dạng, giá hợp lý theo thị trường, không cần đăng nhập và có luồng mua hàng hoàn chỉnh.[cite:4][cite:9][cite:11]
