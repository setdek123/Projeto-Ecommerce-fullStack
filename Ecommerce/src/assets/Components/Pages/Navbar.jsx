import { Link } from "react-router-dom";
import { ShoppingCart, SignIn } from 'phosphor-react';
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/Context";
import DashBoard from "./DashBoard";
import Login from "./Login";



const Navbar = (props) => {
    const {acount} = useContext(AppContext);
    
    return (
        <div className="flex justify-between px-20 border-b p-4">
            <div>
                <h1 className="font-semibold"><Link to={'/'}>Ecommerce</Link></h1>
            </div>
            <div className="flex items-center  gap-7">
                <div className="flex items-center  gap-10 mr-96 ">
                    <Link to={'/mans'}>Mens</Link>
                    <Link to={'/womans'}>Womans</Link>
                    <Link to={'/kids'}>Kids</Link>
                </div>
                <div className="flex items-center  gap-7 ">
                    <Link to={'/'}>Home</Link>
                    <Link to={'/about'}>About</Link>
                    <Link to={'/contact'}>Contact</Link>
                </div>
                <div className="flex">
                    <Link to={'/shopcart'}><ShoppingCart className=" font-bold" size={25}/></Link>
                    <span className=" flex items-center justify-center text-center bg-red-600 text-white h-4 w-4 rounded-lg ml-5 top-3 absolute">
                        {acount}
                    </span>
                </div>
                <div className="flex gap-2 items-center ml-2">
                   <Link className="flex gap-3" to={'/login'}><SignIn className="text-3xl"/>Sing In</Link> 
                </div>
            </div>
        </div>
    )
}

export default Navbar;