import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/Context";
import { useParams } from "react-router-dom";
import { FaTrash } from 'react-icons/fa';
import { ShoppingBagOpen, ShoppingCart } from 'phosphor-react';

const ShopCart = () => {
    const { 
        items, 
        DeleteONCart, 
        soma,
        setDuplicate,
        duplicate, 
    } = useContext(AppContext);

    
    

    return (
        <div className="flex flex-col  gap-10 ">
            <div className="flex items-center justify-center py-4">
                <h2 className="font-bold text-gray-500 text-3xl">Shopping Cart</h2>
            </div>
            <div className="flex gap-10 ">
                <div className=" flex flex-col px-20 gap-3">
                    {items.map((prod) => (
                        <div key={prod.id} className="flex gap-10 shadow border  w-1/2 ">
                            <img src={prod.image} className="w-1/6" />
                            <p className="flex  items-center">{prod.name}</p>
                            <div className="flex items-center justify-center w-10 h-10">
                                <select value={duplicate} onChange={(e)=>setDuplicate(e.target.value)}>
                                    {duplicate.map((item)=>(
                                        <option value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-center pr-7 ">
                                <FaTrash size={25} onClick={()=> DeleteONCart(prod.id)} />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-center ">
                    {items.length > 0 ? (
                        <div className=" flex flex-col mr-80 mb-64  fixed top-40 bottom-40   gap-2 ">
                            <div className="py-5  border-b ">
                                <h3 className="font-bold text-2xl">Order summary</h3>
                            </div>
                            <div className="flex items-center justify-between gap-3 py- ">
                                <div className=" flex flex-col gap-10  ">
                                    <div className="flex justify-between border-b">
                                        <div className=" flex py-1">
                                            <p>Subtotal</p>
                                        </div>
                                        <p>$99.00</p>

                                    </div>
                                    <div className="flex justify-between gap-96 border-b">
                                        <div>
                                            <p>Shipping</p>
                                        </div>
                                        <p>$5.00</p>
                                    </div>
                                    <div className="flex justify-between  border-b">
                                        <div>
                                            <p>Tax estimate</p>
                                        </div>
                                        <p>$8.00</p>
                                    </div>
                                    <div className="flex justify-between border-b">
                                        <span>Order total</span>
                                        <p className="font-extrabold text-3xl">${soma}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-center">
                                <button className=" bg-green-500  text-white  p-3 rounded-lg w-full">Checkout</button>
                            </div>
                        </div>
                    ) : <div className="flex justify-center items-center"><p className=" flex gap-4 ml-40 my-20 font-extrabold text-gray-300 text-6xl">O carrinho está vazio! <ShoppingCart /></p></div>}
                </div>

            </div>

        </div>

    );
};

export default ShopCart;
