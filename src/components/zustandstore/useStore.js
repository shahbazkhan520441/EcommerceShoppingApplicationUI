import { create } from 'zustand';

const useStore = create((set) => ({
    products: [],
    productQuantities: 0,
    totalPrice: 0.0,

    //& Product Operations
    addProduct: (newProduct) => set((state) => {
        const existingProduct = state.products.find(product => product.inventoryId === newProduct.inventoryId);
        if (existingProduct) {
            const updatedProducts = state.products.map(product =>
                product.inventoryId === newProduct.inventoryId
                    ? { ...product, productQuantity: product.productQuantity + newProduct.productQuantity }
                    : product
            );
            return { products: updatedProducts };
        } else {
            return { products: [...state.products, newProduct] };
        }
    }),

    updateProductQuantity: (inventoryId, quantityChange) => set((state) => {
        const updatedProducts = state.products.map(product =>
            product.inventoryId === inventoryId
                ? { ...product, productQuantity: product.productQuantity + quantityChange }
                : product
        );
        return { products: updatedProducts };
    }),

    removeProduct: (inventoryId) => set((state) => ({
        products: state.products.filter((product) => product.inventoryId !== inventoryId)
    })),

    removeAllProducts: () => set({ products: [] }),

    //! Quantity Operations
    addProductQuantities: (productQuantity) => set((state) => ({
        productQuantities: state.productQuantities + productQuantity
    })),
    decrementProductQuantities: (productQuantity) => set((state) => ({
        productQuantities: state.productQuantities - productQuantity
    })),
    clearProductQuantities: () => set(() => ({ productQuantities: 0 })),

    //^ Price Operations
    increaseTotalPrice: (productPrice) => set((state) => ({ totalPrice: state.totalPrice + productPrice })),
    decreaseTotalPrice: (productPrice) => set((state) => ({ totalPrice: state.totalPrice - productPrice })),
    clearTotalPrice: () => set(() => ({ totalPrice: 0.0 })),
}));

export default useStore;
