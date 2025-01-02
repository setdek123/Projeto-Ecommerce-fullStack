import { useContext } from "react";
import { AppContext } from "../Context/Context";
import { Link } from "react-router-dom";
import hero_image from '../../../img/hero_image.png'
import ItemsDestak from "./ItemsDestak";
import AllProducts from "./AllProducts";
import DashBoard from "./DashBoard";

const Home = () => {
    const { product } = useContext(AppContext);

    if(!product){
        return <div>Loading...</div>
    }
    
    return (
        <div className="bg-slate-50">
            <div className="flex p-10">
                <h2 className="font-extrabold p-20 text-blue-950 text-7xl">Seja sua melhor versao!</h2>
                <img className="ml-auto w-1/3 h-auto"  src={hero_image} />
            </div>
            <ItemsDestak props={product}/>
            <div className="flex items-center justify-center">
                <h2 className="text-4xl border-b-2 text-gray-400">All Products</h2>
            </div>
            <div>
                <AllProducts/>
            </div>
            
        </div>
    )
}

export default Home;