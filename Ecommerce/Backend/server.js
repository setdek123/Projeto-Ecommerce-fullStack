import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from './models/User.js';
import cors from 'cors';


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Public Route
app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Bem vindo à minha API!' });
});


// função pra bloquear a roda atraves do token
const checkToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({msg: 'Acesso negado!'})
    }

    
    try{
        
        jwt.verify(token, process.env.SECRET);
        next()
    }catch(error){
        res.status(400).json({msg: 'Token inválido!'});
    }
}



// Privete Route
app.get('/user/:id', checkToken, async (req, res) => {

    const { id } = req.params;

    //check user if exist
    // filtrando por id e excluindo a senha do retorno (-password).
    const user = await User.findById(id, '-password');

    try{
        //Exibir usuarios do meu banco de dados
        const userbanco = await User.find();
        res.status(200).json({userbanco});
    }catch(error){
        res.status(422).json({msg: "Erro ao listar usuários."});
    }

    if(!user){
        return res.status(404).json({msg: "Usuário nao encontrado!"})
    }

    res.status(200).json({ user })
});



// Register user
app.post('/auth/register', async (req, res) => {
    const { name, password, email, confirmpassword } = req.body;

    // Validations
    if (!name) return res.status(422).json({ msg: 'O Nome é obrigatório.' });
    if (!email) return res.status(422).json({ msg: 'O Email é obrigatório.' });
    if (!password) return res.status(422).json({ msg: 'A Senha é obrigatória.' });
    if (password !== confirmpassword) {
        return res.status(422).json({ msg: 'As senhas não são iguais!' });
    }

    // Check if user exists
    const userExist = await User.findOne({ email });
    if (userExist) return res.status(422).json({ msg: 'Por favor, utilize outro email.' });

    // Create and hash password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // Generate avatar URL
    const avatar = `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(name)}`;

    // Create user
    const newUser = new User({ name, email, avatar, password: passwordHash });

    try {
        await newUser.save();
        return res.status(201).json({ msg: 'Usuário criado com sucesso!' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Aconteceu um erro no servidor!' });
    }
});

// Login user
app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ msg: 'O E-mail e senha são obrigatórios.' });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: 'Usuário não encontrado!' });

    // Compare password
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) return res.status(422).json({ msg: 'Senha inválida!' });

    try {
        const secret = process.env.SECRET;
        const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });

        return res.status(200).json({ msg: 'Autenticação realizada com sucesso!', token, avatar: user.avatar });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Aconteceu um erro no servidor!' });
    }
});

// Private Route
app.get('/user/:id', checkToken, async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id, '-password');
        if (!user) return res.status(404).json({ msg: 'Usuário não encontrado!' });

        return res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Erro ao buscar usuário!' });
    }
});

// Connect to MongoDB and start server

mongoose
    .connect(process.env.CONNECT_DB)
    .then(() => {
        app.listen(3000, () => console.log('Conectado ao banco e servidor rodando na porta 3000!'));
    })
    .catch((err) => console.error('Erro ao conectar ao banco:', err));
