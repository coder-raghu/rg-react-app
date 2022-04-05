import { createContext, useContext, useState } from "react";

export const cartContext = createContext({
    cart: null,
    cartTotal: null,
    addItem: () => {},
    // updateItem: () => {},
    deleteItem: () => {},
    totalPrice: () => {},
    // tax: () => {},
    // deliveryCharge: () => {},
});

export function CartContextProvider( {children} ){
    
    //localStorage.setItem('shopie-cart', "[]");

    var cartData = localStorage.getItem('shopie-cart');
    var total = localStorage.getItem('shopie-cart-total');
    if(cartData){
        var localData = JSON.parse(cartData)
    } else {
        var localData = '';
        // localStorage.setItem('shopie-cart', "[]");
    }
    if(!total){
        var total = 0;
    }

    const [cart, setCart] = useState(localData);
    const [cartTotal, setCartTotal] = useState( parseInt(total) );

    function addItem( {id, title, price, image} ){

        const key = new Date().getTime();
        var pData = { key, qty:1, id, title, image, price };
        
        // var cartProduct = cart.length && cart.find(item => item.id===id);
        
        setCart((...prevState) => {
            var mycart = [...cart, pData ];
            localStorage.setItem('shopie-cart', JSON.stringify(mycart));
            return [...cart, pData ] 
        });
        calculateTotalPrice(price)
    }
    
    function deleteItem( key ){
        
        const productData = cart.find(item => item.key===key);
        calculateTotalPrice(productData.price, '-')

        const updatedCart = cart.filter((data) => {
            return data.key!==key
        })

        setCart(updatedCart);
        localStorage.setItem('shopie-cart', JSON.stringify(updatedCart));

        return true;
    }

    function calculateTotalPrice(price, sign){
        var total;
        if(sign==="-"){
            total = cartTotal - price;
        } else {
            total = cartTotal + price;
        }
        setCartTotal( total );
        localStorage.setItem('shopie-cart-total', total);
    }
    

    return(
        <cartContext.Provider value={{ cart, addItem, deleteItem, cartTotal }}>
            {children}
        </cartContext.Provider>
    );

};


export function useCartContext(){
    const { cart, addItem, deleteItem, cartTotal } = useContext(cartContext);
    return {cart, addItem, deleteItem, cartTotal};
}
