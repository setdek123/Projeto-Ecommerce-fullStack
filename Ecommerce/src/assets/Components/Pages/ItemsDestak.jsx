import { Link } from "react-router-dom";
import { ShoppingBag } from "phosphor-react";
import { useContext } from "react";
import { AppContext } from "../Context/Context";

const ItemsDestak = ({props}) => {
    const { AddOnCart } = useContext(AppContext);
    return (
       <div>
            <div className="flex items-center justify-center">
                <h2 className="text-4xl border-b-2 text-gray-400">The best colletions</h2>
            </div>
            <div className="flex p-20 gap-3">
                {props.map((prod)=>(
                    <div key={prod.id} className="shadow">
                        <Link className="flex flex-col" to={`/descriptionsproducts/${prod.id}`}>
                            <img src={prod.image}/>
                            <p className="ml-10">{prod.name}</p>
                            <s className="text-gray-500 ml-10">R$ {prod.old_price}</s>
                            <span className="ml-10">R${prod.new_price}</span>
                        </Link>
                        <div className="flex items-center justify-center m-7">
                            <button className=" flex items-center justify-center gap-3 hover:bg-gray-200 border shadow-md text-gray-700 w-full font-semibold rounded-lg p-4" onClick={()=> AddOnCart(prod.id)}><ShoppingBag/>Add on Cart</button>
                        </div>
                    </div>
                ))}
            </div>

       </div>
    )
}

export default ItemsDestak;