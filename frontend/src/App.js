import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Booking from './pages/Booking';
import Car from './pages/Car';
import Rent from './pages/Rent';
import Fines from './pages/Fines';
import Payment from './pages/Payment';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/car' element={<Car/>}/>
          <Route path='/booking' element={<Booking/>}/>
          <Route path='/rent' element={<Rent/>}/>
          <Route path='/fines' element={<Fines/>}/>
          <Route path='/payment' element={<Payment/>}/>
       
        </Routes>
      </Router>
    </div>
  );
}

export default App;
