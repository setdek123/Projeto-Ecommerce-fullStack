import { Password, UserPlus } from "phosphor-react";
import { useRef, useState } from "react";
import api from "../../../../Backend/api";
import Cookie from 'js-cookies';

const Register = () => {
    const [listUsers, setListaUsers] = useState([]);
    const [inputName, setInputName] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [inputConfirmPassword, setInputConfirmPassword] = useState('');

    const HandlerOnSubmit = (e) =>{
        e.preventDefault();
       
        CreateUserToBankDB();

    }
        
    const CreateUserToBankDB =  async () => {
        try{
            const response_api = await api.post('/auth/register', {
                name: inputName,
                email: inputEmail,
                password: inputPassword,
                confirmpassword: inputConfirmPassword
            });
            console.log(response_api.data);
            
        
        }catch(error){
            alert('Error ao cadastrar usuário' ,error);
        }
    }

    return (
        <div>
            <form className="flex items-center justify-center  gap-40 m-20 " onSubmit={HandlerOnSubmit}>
                <div className="flex  flex-col justify-center items-center border rounded-lg w-2/6 h- shadow-xl">
                    <div className="flex flex-col my-7">
                        <h1 className="font-extrabold text-4xl">Create Account</h1>
                    </div>
                    <div className="flex flex-col gap-7">
                        <div className="flex flex-col w-full gap-3">
                            <input className='p-3 w-80 border rounded-lg hover:bg-slate-100' type="text" required={true} placeholder="Name" onChange={(e)=>setInputName(e.target.value)} />
                            <input className='p-3 w-80 border rounded-lg hover:bg-slate-100' type="email" required={true} placeholder="Email" onChange={(e)=>setInputEmail(e.target.value)}/>
                            <input className='p-3 w-80 border rounded-lg hover:bg-slate-100' type="text" required={true} placeholder="password" onChange={(e)=>setInputPassword(e.target.value)}/>
                            <input className='p-3 w-80 border rounded-lg hover:bg-slate-100' type="text" required={true} placeholder="Confirm Password" onChange={(e)=>setInputConfirmPassword(e.target.value)}/>
                        </div>
                        <div className="flex">
                            <button className="p-4 hover:bg-gray-400 font-semibold mb-4 text-gray-500 bg-gray-300 rounded-lg w-full">Enter</button>
                        </div>
                    </div>
                </div>
                <div>
                    <UserPlus className='text-gray-500' size={300}/>
                </div>
            </form>
        </div>
    )
}

export default Register;