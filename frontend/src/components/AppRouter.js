import React, { useContext } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../routes";
import Home from '../pages/Home';
import Booking from '../pages/Booking';
import Rent from '../pages/Rent';
import Fines from '../pages/Fines';
import Admin from '../pages/Admin';
import Car from '../pages/Car';
import Auth from '../pages/Auth';
import { HOME_ROUTE } from '../utils/consts';
import { Context } from '..';

const AppRouter = () => {
    const {user} = useContext(Context)

    return (
        <Routes>
            <Route path='/' element={<Home />}/> ,
            <Route exact path='/admin' element={user.isAuth ? (<Admin />) : (<Navigate replace to={'/'}/>)}/> ,
            <Route path='/booking' element={user.isAuth ? (<Booking />) : (<Navigate replace to={'/'}/>)}/> ,
            <Route path='/rent' element={user.isAuth ? (<Rent />) : (<Navigate replace to={'/'}/>)}/> ,
            <Route path='/fines' element={user.isAuth ? (<Fines />) : (<Navigate replace to={'/'}/>)}/> ,
            <Route path='/car/:id' element={<Car />}/>  
            <Route path='/car' element={<Car />}/>  
            <Route path='/login' element={<Auth />}/> 
            <Route path='/registration' element={<Auth />}/> 
        </Routes>
    );
};

export default AppRouter;