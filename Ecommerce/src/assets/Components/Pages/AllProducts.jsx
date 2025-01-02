import { useContext, useEffect } from "react";
import { AppContext } from "../Context/Context";
import { Link, useParams } from "react-router-dom";
import { ShoppingBag } from 'phosphor-react';

const AllProducts = () => {
    const { allProducts, AddOnCart, promocao, Promotion } = useContext(AppContext);
    
    if(!allProducts) return <div>Loding...</div>

    
    return (
        <div className="grid grid-cols-4 grid-rows-12 gap-3 p-10 py-20">
            {allProducts.map((allItems)=>(
                <div key={allItems.id} className="shadow">
                    <Link to={`/descriptionsproducts/${allItems.id}`}>
                        <img src={allItems.image} />
                        <p className="ml-10">{allItems.name}</p>
                        <div className="flex flex-col">
                            <s className="ml-10 text-gray-300">R$ {allItems.old_price}</s>
                            <span className="ml-10 font-extrabold  text-gray-600  text-3xl">R$ {allItems.new_price}</span>
                        </div>
                    </Link>
                    <div className="flex items-center justify-center m-7">
                        <button className=" flex items-center justify-center gap-3 hover:bg-gray-200 border shadow-md text-gray-700 w-full font-semibold rounded-lg p-4" onClick={()=> AddOnCart(allItems.id)}><ShoppingBag size={22}/>Add on Cart</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AllProducts;