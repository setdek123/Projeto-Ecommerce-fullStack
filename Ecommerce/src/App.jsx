import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './assets/Components/Pages/Navbar';
import Home from './assets/Components/Pages/Home';
import About from './assets/Components/Pages/About';
import Contact from './assets/Components/Pages/Contact';
import ShopCart from './assets/Components/Pages/ShopCart';
import Context from './assets/Components/Context/Context';
import DescriptionProducts from './assets/Components/Pages/DescriptionsProducts';
import Mans from './assets/Components/Pages/Category/Mans';
import Womans from './assets/Components/Pages/Category/Womans';
import Kids from './assets/Components/Pages/Category/Kids';
import Login from './assets/Components/Pages/Login';
import Register from './assets/Components/Pages/Register';
import DashBoard from './assets/Components/Pages/DashBoard';

function App() {
  

  return (
    <Context>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/shopcart' element={<ShopCart/>} />
          <Route path='/descriptionsproducts/:id' element={<DescriptionProducts/>} />
          <Route path='/mans' element={<Mans/>} />
          <Route path='/womans' element={<Womans/>} />
          <Route path='/kids' element={<Kids/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/dashboard/:id' element={<DashBoard/>} />
        </Routes>
      </BrowserRouter>
    </Context>
  )
}

export default App
