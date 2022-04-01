import { createContext, useContext, useState } from "react";

export const cartContext = createContext({
    cart: null,
    addItem: () => {},
    // updateItem: () => {},
    // deleteItem: () => {},
    // totalPrice: () => {},
    // tax: () => {},
    // deliveryCharge: () => {},
});

// var cartData = localStorage.getItem('shopie-cart');
// console.log(cartData)JSON.parse(cartData)

const cartData = [ {
    key:'', id: '', title:'', price:'', qty:''   
} ];

export function CartContextProvider( {children} ){
    const [cart, setCart] = useState([]);

    function addItem( product ){

        // var cartData = localStorage.getItem('shopie-cart');
        // console.log(JSON.parse(cartData));
        const key = new Date().getTime();
        var pData = {
                key: key,
                id: product.id,
                title: product.title,
                productPrice: product.price,
                qty: product.qty,
                price: product.price * product.qty,
            };
        // console.log(pData)
        setCart([ ...cart, pData ]);
        // console.log(cart)

        // setCart({ ...cart, [key]:pData });

        console.log("Updated Cart")
        console.log(cart)

        localStorage.setItem('shopie-cart', JSON.stringify(cart));
    }

    return(
        <cartContext.Provider value={{ cart, addItem }}>
            {children}
        </cartContext.Provider>
    );

};


export function useCartContext(){
    const { cart, addItem } = useContext(cartContext);
    return {cart, addItem};
}
