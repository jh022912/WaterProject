import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { CartItem } from '../types/cartItem';

// Interface defining the shape of the cart context —
// like an interface in .NET, it declares what must exist without implementing it yet.
interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (projectId: number) => void;
    clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

// CartProvider wraps the app and holds the cart state.
// Any component inside it can access the cart without prop drilling.
export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setCart((previousCart) => {
            // Check if this project is already in the cart
            const existingItem = previousCart.find((c) => c.projectId === item.projectId);

            // Rebuild the cart, adding the new donation amount to the existing one if found
            const updatedCart = previousCart.map((c) =>
                c.projectId === item.projectId
                    ? { ...c, donationAmount: c.donationAmount + item.donationAmount }
                    : c
            );

            // If item existed, return the updated cart; otherwise append the new item
            return existingItem ? updatedCart : [...previousCart, item];
        });
    };

    const removeFromCart = (projectId: number) => {
        setCart((previousCart) => previousCart.filter((item) => item.projectId !== projectId));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook — lets any component access the cart with just: const { cart, addToCart } = useCart()
// Throws a clear error if called outside of a CartProvider, rather than silently returning undefined.
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
