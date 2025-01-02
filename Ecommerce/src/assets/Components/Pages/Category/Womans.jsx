import { useContext } from "react";
import { AppContext } from "../../Context/Context";
import banner_women from '../../../../img/banner_women.png';
import { ShoppingBag } from "phosphor-react";

const Womans = () => {
    const { allProducts, AddOnCart } = useContext(AppContext);

    const idWomens = allProducts.filter(item=>item.category === 'women');

    return (
        <div className="flex flex-col ">
            <div className="flex p-8">
                <img className="w-full" src={banner_women} alt="" />
            </div>
           <div className="grid grid-cols-4 gap-5 p-8">
            {idWomens.map((items)=>(
                <div key={items.id} className="shadow pb-3">
                    <img src={items.image}/>
                    <p className="ml-10">{items.name}</p>
                    <div className="border-t bg-slate-100 my-3">
                        <span className="ml-10 py-10 font-extrabold text-gray-600 text-3xl">R$ {items.new_price}</span>
                    </div>
                    <div className="flex items-center justify-center m-7">
                        <button className=" flex items-center justify-center gap-3 hover:bg-gray-200 border shadow-md text-gray-700 w-full font-semibold rounded-lg p-4" onClick={()=> AddOnCart(items.id)}><ShoppingBag/>Add on Cart</button>
                    </div>
                </div>
            ))}
           </div>
        </div>
    )
}

export default Womans;