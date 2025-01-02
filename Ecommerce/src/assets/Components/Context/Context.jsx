import { createContext, useState } from "react";
import data_product from '../../../img/data.js';
import all_products from '../../../img/all_product.js'
import { Link } from "react-router-dom";

export const AppContext = createContext();

const Context = ({children}) => {
    const [product, setProduct] = useState(data_product);
    const [allProducts, setAllProducts] = useState(all_products);
    const [items, setItems] = useState([]);
    const [acount, setCount] = useState(0);
    const [soma ,setSoma] = useState(0);
    const [duplicate, setDuplicate] = useState([ 1,2,3,4,5,6,7,8,9,10 ]);
    

    

    const AddOnCart = (id) =>{
        const prodItem = allProducts.find(item => item.id === id);
        setItems([...items, prodItem]);
        setCount(acount + 1);
        
        //determinar de tirar as
        

        // Vareavel de soma
        const mapiando = allProducts.map((item)=>{item.id === id ? setSoma(soma + item.new_price) : item});
        
        
    }

    const DeleteONCart = (id) =>{
        const captureId = items.filter(item=>item.id !== id);
        setItems(captureId);
        setCount(acount - 1);
        
        // Vareavel de remover soma
        const mapiando = allProducts.map((item)=>{item.id === id ? setSoma(soma - item.new_price) : item});

    }

    return (
        <AppContext.Provider value={{
            product, 
            setProduct, 
            allProducts, 
            setAllProducts, 
            AddOnCart, 
            DeleteONCart, 
            items, 
            setItems, 
            acount, 
            soma, 
            setSoma,
            setDuplicate,
            duplicate
            
            }} >

            {children}
        </AppContext.Provider>
    )
}

export default Context;