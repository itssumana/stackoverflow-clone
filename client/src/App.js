import React, { useEffect } from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar/Navbar'
import AllRoutes from './AllRoutes'
import { useDispatch } from 'react-redux';
import { fetchAllQuestions } from './actions/question';
import { fetchAllUsers } from './actions/users'


function App() {
  
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(fetchAllQuestions())
    dispatch(fetchAllUsers())
  }, [dispatch])
  
  return (
    <div className="App">
		<Router>
			<Navbar/>
			<AllRoutes/>
		</Router>
    </div>
  );
}

export default App;

/* the BrowserRouter, used with an alias of Router in the code, wraps all the links in 
the navbar and all the routes in  AllRoutes*/