# BookStore Online — Buổi 8 · Đăng nhập, Đánh giá, Giỏ hàng & Yêu thích (STARTER)

## Chạy
```bash
npm install
npm run api         # terminal 1: json-server http://localhost:3000 (dữ liệu trong db.json)
npx expo start      # terminal 2: quét QR bằng Expo Go; nhấn  w  để mở bản web
npm run typecheck   # tsc --noEmit
```

Stack: Expo SDK 58 · React Native 0.86 · TypeScript · React Navigation 7 · Redux Toolkit · Axios · json-server.

## Danh sách TODO
| Mã | File | Việc cần làm |
|---|---|---|
| BT8.1 | `screens/LoginScreen.tsx` | Form đăng nhập, validate, quay lại đúng màn |
| BT8.2 | `screens/RegisterScreen.tsx` | Form đăng ký, nhập lại mật khẩu |
| BT8.3 | `hooks/usePersistence.ts` | Auto-login khi mở app, ghi/xóa phiên khi đăng nhập/đăng xuất |
| BT8.4 | `screens/CartScreen.tsx`, `screens/CheckoutScreen.tsx` | Chặn Checkout khi chưa đăng nhập |
| BT8.5 | `components/RatingStars.tsx`, `screens/BookDetailScreen.tsx` | Component sao (a), điểm trung bình (b), gửi đánh giá (c) |
| BT8.6 | `components/CartItemRow.tsx` | Nút −/+ có debounce, giới hạn tồn kho |
| BT8.7 | `screens/CartScreen.tsx`, `hooks/useAutoPersist.ts`, `hooks/usePersistence.ts` | Xóa có xác nhận (a), lưu giỏ + yêu thích (b) |
| BT8.8 | `components/HeartButton.tsx`, `screens/WishlistScreen.tsx` | Nút tim dùng chung store (a), màn Yêu thích (b) |
| BT8.C1 | `screens/BookDetailScreen.tsx` | (Thử thách) Sách liên quan |
| BT8.C2 | `screens/CartScreen.tsx` | (Thử thách) Mã giảm giá SALE10 |

