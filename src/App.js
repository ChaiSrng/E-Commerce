import './App.css';
import Nav from './components/Nav'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Footer from './components/Footer'
import SignUp from './components/SignUp'
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductsList from './components/ProductsList';
import UpdateProduct from './components/UpdateProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
      <Routes>
        <Route element={<PrivateComponent/>}>
        <Route path="/" element={<ProductsList/>}></Route>
        <Route path="/add" element={<AddProduct/>}></Route>
        <Route path="/update/:_id" element={<UpdateProduct/>}></Route>
        <Route path="/logout" element={<h1>Logout Component</h1>}></Route>
        <Route path="/profile" element={<h1>Profile Component</h1>}></Route>
        </Route>

        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
