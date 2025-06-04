import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item) => {
        // Clean up price while preserving decimal points
        const cleanPrice = item.price?.toString().replace(/[^\d.]/g, '') || '0';
        
        const productDetails = {
            id: item.id,
            title: item.title,
            price: cleanPrice,
            type: item.type || 'service',
            description: item.details || item.description || '',
            category: item.category || '',
            features: item.features || [],
            duration: item.duration || '',
            image: item.image || ''
        };

        setCartItems(prev => {
            const existingItem = prev.find(i => i.id === productDetails.id);
            if (existingItem) {
                return prev.map(i => 
                    i.id === productDetails.id 
                        ? { ...i, quantity: (i.quantity || 1) + 1 }
                        : i
                );
            }
            return [...prev, { ...productDetails, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (itemId) => {
        // If itemId is an object (the item itself), use its id property
        const id = typeof itemId === 'object' ? itemId.id : itemId;
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (itemId, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems(prev => 
            prev.map(item => 
                item.id === itemId 
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => {
            const price = parseFloat(item.price) || 0;
            const quantity = item.quantity || 1;
            return total + (price * quantity);
        }, 0);
    };

    const getCartCount = () => {
        return cartItems.reduce((count, item) => count + (item.quantity || 1), 0);
    };

    const value = {
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};