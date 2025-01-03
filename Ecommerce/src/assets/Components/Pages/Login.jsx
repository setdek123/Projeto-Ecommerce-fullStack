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
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSendLogin = async (e) => {
        e.preventDefault();

        if (!sendEmail || !sendPassword) {
            setMsgError('Preencha todos os campos!');
            return;
        }

        setIsLoading(true);

        try {
            const response = await api.post('/auth/login', {
                email: sendEmail,
                password: sendPassword,
            });

            setIsLoading(false);

            if (response.status === 200) {
                setMsgError('Login realizado com sucesso!');
                Cookie.set('User-Cookie', response.data.token); // Salvar token em cookies
                Cookie.set('AvatarUlr', response.data.avatar);
                navigate('/');
            } else {
                setMsgError('Erro ao realizar login!');
            }
        } catch (err) {
            setIsLoading(false);
            if (err.response && err.response.status === 401) {
                setMsgError('Credenciais inválidas. Tente novamente.');
            } else {
                setMsgError('Erro ao conectar ao servidor. Verifique suas credenciais.');
            }
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
                                    value={sendEmail}
                                    onChange={(e) => setSendEmail(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <Lock size={22} />
                                <input
                                    className="p-3 w-80 border rounded-lg hover:bg-slate-100"
                                    type="password"
                                    placeholder="Senha"
                                    value={sendPassword}
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
                            <button
                                className={`p-4 font-semibold text-gray-500 rounded-lg w-full ${
                                    isLoading ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-gray-400 bg-gray-300'
                                }`}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Entrando...' : 'Entrar'}
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
