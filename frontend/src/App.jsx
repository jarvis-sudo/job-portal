import { useState } from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Navbar from './components/shared/Navbar';
import Login from './components/auth/login';
import Signup from './components/auth/signup';
import Home from './components/home';
import Jobs from './components/Jobs';
import Browse from './components/Browse';
import Profile from './components/Profile';

const appRouter = createBrowserRouter([
  {
    path : '/',
    element : <Home/>
  },
  {
    path : '/login',
    element : <Login/>
  },
  {
    path : '/signup',
    element : <Signup/>
  },
  {
    path : '/jobs',
    element : <Jobs/>
  },
  {
    path : '/browse',
    element : <Browse/>
  },
  {
    path : '/profile',
    element : <Profile/>
  }
])


function App() {
  const [count,setCount] = useState(0);

  return(
    <>
    <RouterProvider
      router = {appRouter}
    />
    
    </>
  )
}

export default App;