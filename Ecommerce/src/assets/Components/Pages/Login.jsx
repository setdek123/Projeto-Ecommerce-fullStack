import { User, Lock } from 'phosphor-react';
import { MdEmail } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../../../Backend/api';
import { useState } from 'react';
import Cookie from 'js-cookie';


const Login = () => {
    const [sendEmail, setSendEmail] = useState('');
    const [sendPassword, setSendPassword] = useState('');
    const [msgError, setMsgError] = useState('');
    const navigate = useNavigate();

    const handleSendLogin = async (e) => {
        e.preventDefault();

        if (!sendEmail || !sendPassword) {
            setMsgError('Preencha todos os campos!');
            return;
        }

        try {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NmRlOWJiNDE0MWE2NjMwMDdhOWFjMyIsImlhdCI6MTczNTcxNjIxMX0.5Iger7njF5-Q4jsOopvBSyf9O9Jo4cYhDMyv2oH1aO8'; // Substituir pelo método correto de obtenção do token, se necessário.

            const response = await api.post('/auth/login', {
                email: sendEmail,
                password: sendPassword,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 200) {
                setMsgError('Login realizado com sucesso!');
                Cookie.set('authToken', response.data.token); // Salvar token em cookies
                navigate('/'); // Redirecionar após login
            } else {
                setMsgError('Erro ao realizar login!');
            }
        } catch (err) {
            setMsgError('Erro ao conectar ao servidor. Verifique suas credenciais.');
        }
    };

    return (
        <div>
            <form className="flex items-center justify-center gap-40 m-20" onSubmit={handleSendLogin}>
                <div className="flex flex-col justify-center items-center border rounded-lg w-2/6 h-96 shadow-xl">
                    <div className="flex flex-col my-7">
                        <h1 className="font-extrabold text-4xl">Login</h1>
                    </div>
                    <div className="flex flex-col gap-7">
                        <div className="flex flex-col w-full gap-3">
                            <div className="flex items-center gap-4">
                                <MdEmail size={22} />
                                <input
                                    className="p-3 rounded-lg w-80 border hover:bg-slate-100"
                                    type="email"
                                    required
                                    placeholder="Email"
                                    onChange={(e) => setSendEmail(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <Lock size={22} />
                                <input
                                    className="p-3 w-80 border rounded-lg hover:bg-slate-100"
                                    type="password"
                                    placeholder="Senha"
                                    onChange={(e) => setSendPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="ml-28">
                            <Link className="text-green-300 font-semibold" to={'/register'}>
                                Não tem conta? Clique aqui!
                            </Link>
                        </div>
                        <div className="flex">
                            <button className="p-4 hover:bg-gray-400 font-semibold text-gray-500 bg-gray-300 rounded-lg w-full">
                                Entrar
                            </button>
                        </div>
                        {msgError && (
                            <div className="flex">
                                <p className={`text-sm font-semibold ${msgError.includes('sucesso') ? 'text-green-500' : 'text-red-500'}`}>
                                    {msgError}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    <User className="text-gray-500" size={300} />
                </div>
            </form>
        </div>
    );
};

export default Login;
