import React from 'react';
import  Navbar  from './components/NavBar';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";

const App = () => {

    return (
        <BrowserRouter>
            <Navbar/>
            <AppRouter />
        </BrowserRouter>
    );
};

export default App;