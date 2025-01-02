import { useContext } from "react";
import { AppContext } from "../Context/Context";
import { useParams } from "react-router-dom";
import { Star } from 'phosphor-react';



const DescriptionProducts = () => {
    const { allProducts, AddOnCart } = useContext(AppContext);
    const { id } = useParams();

    const prodId = allProducts.find(item => item.id === parseInt(id));

    return (
        <div className="flex justify-center  gap-10 p-10 ">
            <div key={prodId.id}>
                <img src={prodId.image}  />
                
            </div>
            <div className="flex flex-col gap-2 h-96">
                <h1 className="text-2xl">{prodId.name}</h1>
                <div className="my-44">
                    <div className="flex gap-5 text-yellow-500">
                       <div className=" flex ">
                            <Star size={35}/>
                            <Star size={35}/>
                            <Star size={35}/>
                            <Star size={35}/>
                       </div>
                    </div>
                    <div className="flex flex-col gap-7 top-2/4 my-">
                        <s className="text-2xl font-semibold text-gray-500">R$ {prodId.old_price}</s>
                        <p className="text-5xl text-gray-600  font-bold">R$ {prodId.new_price}</p>
                        <div>
                            <button className="rounded-lg text-white text-1xl  bg-blue-900 p-2 w-full" onClick={()=> AddOnCart(prodId.id)}>Add Cart</button>
                        </div>
                    </div>
                </div>
                
            </div>
            
        </div>
    )
}

export default DescriptionProducts;