import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CartItem } from "../types";
import { useDebounce } from "../hooks/useDebounce";
import { colors, formatPrice, radius } from "../theme";

interface Props {
  item: CartItem;
  onChangeQty: (bookId: number, quantity: number) => void;
  onRemove: (bookId: number) => void;
}

// Nút −/+ với STATE CỤC BỘ + debounce 300ms: số trên nút đổi ngay,
// chỉ đẩy lên store một lần sau khi người dùng dừng bấm 300 ms.
export function CartItemRow({ item, onChangeQty, onRemove }: Props) {
  const [qty, setQty] = useState(item.quantity);
  const debouncedQty = useDebounce(qty, 300);

  useEffect(() => {
    if (debouncedQty !== item.quantity) onChangeQty(item.bookId, debouncedQty);
  }, [debouncedQty, item.bookId, item.quantity, onChangeQty]);

  useEffect(() => {
    setQty(item.quantity);
  }, [item.quantity]);

  const canDec = qty > 1;
  const canInc = qty < item.stock;

  return (
    <View style={styles.row}>
      <View style={[styles.cover, { backgroundColor: item.color }]}>
        <Text style={styles.emoji}>{item.emoji}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
        <View style={styles.qtyRow}>
          <Pressable disabled={!canDec} onPress={() => setQty((q) => q - 1)} accessibilityLabel="Giảm" style={[styles.qtyBtn, !canDec && styles.qtyBtnDisabled]}>
            <Text style={styles.qtyBtnText}>−</Text>
          </Pressable>
          <Text style={styles.qty}>{qty}</Text>
          <Pressable disabled={!canInc} onPress={() => setQty((q) => q + 1)} accessibilityLabel="Tăng" style={[styles.qtyBtn, !canInc && styles.qtyBtnDisabled]}>
            <Text style={styles.qtyBtnText}>+</Text>
          </Pressable>
        </View>
        <Text style={styles.stock}>Còn {item.stock}</Text>
      </View>
      <Pressable onPress={() => onRemove(item.bookId)} hitSlop={8} accessibilityLabel="Xóa khỏi giỏ">
        <Text style={styles.trash}>🗑️</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", backgroundColor: colors.card, borderRadius: radius.md, padding: 10, marginHorizontal: 12, marginVertical: 5, gap: 10 },
  cover: { width: 54, height: 72, borderRadius: radius.sm, alignItems: "center", justifyContent: "center" },
  emoji: { fontSize: 26 },
  info: { flex: 1, gap: 2 },
  title: { fontWeight: "700", color: colors.text },
  price: { color: colors.indigo, fontWeight: "800" },
  qtyRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 4 },
  qtyBtn: { width: 30, height: 30, borderRadius: 8, backgroundColor: colors.indigo, alignItems: "center", justifyContent: "center" },
  qtyBtnDisabled: { opacity: 0.35 },
  qtyBtnText: { color: "#fff", fontSize: 18, fontWeight: "800" },
  qty: { fontWeight: "800", color: colors.navy, fontSize: 16, minWidth: 20, textAlign: "center" },
  stock: { color: colors.muted, fontSize: 12 },
  trash: { fontSize: 22 },
});
