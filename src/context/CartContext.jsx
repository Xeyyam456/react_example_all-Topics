import { createContext, useState } from 'react';

// 1. Context-i yarat
export const CartContext = createContext();

// 2. Provider — bütün vəziyyəti (state) burada saxlayırıq
export function CartProvider({ children }) {
  // İstifadəçinin yazdığı mətn
  const [text, setText] = useState('');

  // Səbətdəki mətnlər — localStorage-dan başlanğıc dəyər alırıq
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cartItems');
    return saved ? JSON.parse(saved) : [];
  });
  // Mətnı səbətə əlavə et
  function addItem(newText) {
    if (!newText.trim()) return; // boş mətn əlavə etmə
    const updatedItems = [...cartItems, newText.trim()];
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    setText(''); // input-u təmizlə
  }
  // Məhsulu səbətdən sil
  function removeItem(index) {
    const updatedItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  }

  // Bütün səbəti təmizlə
  function clearCart() {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  }
  return (
    <CartContext.Provider value={{ text, setText, cartItems, addItem }}>
      {children}
    </CartContext.Provider>
  );
}


