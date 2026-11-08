# Trả lời câu hỏi bổ sung — Buổi 8: BookStore (Đăng nhập, Giỏ hàng & Yêu thích)

## Câu 1 — Cờ `ready` trong `useAutoPersist`

Lần render đầu tiên, giỏ hàng trong store vẫn còn rỗng (chưa kịp đọc dữ liệu đã lưu trong
AsyncStorage). Nếu hook ghi ngay lúc đó thì mảng rỗng sẽ ghi đè lên giỏ hàng cũ trong máy
trước khi hàm đọc kịp trả về, và giỏ hàng đã lưu sẽ mất. Cờ `ready` chỉ bật thành `true`
sau khi `usePersistence` đã đọc xong cả ba thứ (phiên đăng nhập, giỏ hàng, yêu thích) và
nạp vào store, nên `useAutoPersist` chỉ ghi khi `ready` là `true`. Nhờ vậy việc ghi chỉ
xảy ra sau khi dữ liệu cũ đã được khôi phục, không bao giờ ghi đè dữ liệu cũ bằng trạng
thái rỗng ban đầu.

## Câu 2 — Token giả

Bài này có hai điểm không an toàn. Thứ nhất, mật khẩu nằm sẵn trong `db.json` và được so
sánh ở phía app (client), nên ai đọc được dữ liệu cũng thấy mật khẩu và có thể tự viết lại
luật kiểm tra. Thứ hai, token do app tự tạo dạng `token-<id>-<thời gian>`, không có chữ ký
hay thời hạn, nên ai cũng làm giả được một token hợp lệ. Hệ thống thật phải để **server**
kiểm tra mật khẩu (đã băm, không lưu mật khẩu gốc) rồi mới cấp token có thời hạn và có chữ
ký; phía app lưu token bằng **SecureStore** (Keychain trên iOS, Keystore trên Android) thay
cho AsyncStorage, vì AsyncStorage chỉ lưu chuỗi thô và ai cũng đọc được.

## Câu 3 — Hai effect trong `CartItemRow`

Effect đồng bộ `useEffect(() => { setQty(item.quantity); }, [item.quantity])` dùng để kéo
số lượng hiển thị về đúng với store khi store đổi từ nơi khác. Nếu xóa effect này, số trên
nút sẽ bị lệch so với store khi: mở lại app và giỏ hàng được nạp từ AsyncStorage (store có
số lượng đã lưu, còn state cục bộ vẫn giữ giá trị của lần render đầu), hoặc xóa rồi thêm
lại cùng một cuốn sách, hoặc thay đổi số lượng từ một màn khác. Lúc đó nút vẫn hiện số cũ
trong khi tổng tiền đã tính theo số mới trong store.

## Câu 4 — Một nguồn state

Nếu mỗi `HeartButton` giữ trạng thái bằng `useState` riêng ở mỗi nơi, tim ở lưới sách và
tim ở trang Chi tiết là hai state độc lập: bấm tim ở Home thì chỉ tim ở Home đổi, mở trang
Chi tiết của cùng cuốn đó vẫn thấy tim trắng, và ngược lại. Store giải quyết việc đó bằng
cách giữ **một nguồn duy nhất** là `wishlist.ids` trong Redux; mọi `HeartButton` đều đọc
cùng một giá trị qua `useWishlist()` (`isFavorite(bookId)`), và mọi lần bấm đều dispatch
cùng một action `toggleWishlist(bookId)`. Vì vậy chỉ cần store đổi một lần là tất cả các
nơi hiển thị tim đều cập nhật theo.

## Câu 5 — Hiện/ẩn mật khẩu ở màn Đăng nhập (đã làm thật)

Đã làm trong `src/screens/LoginScreen.tsx`: thêm một state `showPassword` điều khiển
`secureTextEntry` của ô Mật khẩu, và một nút bấm 👁/🙈 đặt cạnh ô đó để đổi giá trị.

```tsx
const [showPassword, setShowPassword] = useState(false);

<FormField
  label="Mật khẩu"
  value={password}
  onChangeText={setPassword}
  error={errors.password}
  secureTextEntry={!showPassword}
/>
<Pressable
  onPress={() => setShowPassword((v) => !v)}
  accessibilityLabel={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
>
  <Text>{showPassword ? "🙈" : "👁"}</Text>
</Pressable>
```

Bấm 👁 thì mật khẩu hiện ra để kiểm tra lại, bấm 🙈 thì ẩn lại. Ảnh màn hình: màn Đăng
nhập với nút 👁 cạnh ô Mật khẩu (xem ảnh trong báo cáo, mục Bài 8.1 / Câu 5).
