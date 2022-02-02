import './App.css';
import { Routes,Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Producer from './components/pages/Producer';
import Distributor from './components/pages/Distributor';
import Retailer from './components/pages/Retailer';
import Consumer from './components/pages/Consumer';
import Signup from './components/pages/Signup';
import Footer from './components/Footer';
import Login from './components/pages/Login';
import Track from './components/pages/Track'
import CentralAuthority from './components/pages/CentralAuthority';

function App() {
  return (
    <>
      <Navbar/>
        <Routes>
          <Route exact path='/' element={< Home />}></Route>
          <Route exact path='/producer' element={< Producer />}></Route>
          <Route exact path='/distributor' element={< Distributor />}></Route>
          <Route exact path='/retailer' element={< Retailer />}></Route>
          <Route exact path='/consumer' element={< Consumer />}></Route>
          <Route exact path='/signup' element={< Signup />}></Route>
          <Route exact path='/login' element={< Login />}></Route>
          <Route exact path='/track' element={< Track />}></Route>
          <Route exact path='/centralauthority' element={< CentralAuthority />}></Route>
        </Routes>
      <Footer/>
    </>
  );
}

export default App;
