
import './App.css';
import Home from './pages/Home';
import Alltask from './pages/Alltask';
import Complete from './pages/Complete';
import Incomplete from './pages/Incomplete';
import Important from './pages/Important';
import { Routes ,Route, } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { authActions } from './store/auth';


function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);

  useEffect(() => {
    if(localStorage.getItem("id") && localStorage.getItem("token")){
      dispatch(authActions.login())
    }else if(isLoggedIn === false){
      navigate("/signup")
    }
  
  
  }, [])
  
  return (
    <div className='p-3 relative'>
      
        <Routes>
          <Route path='/' element={<Home/>}> 
          <Route index element={<Alltask/>} />
          <Route path='/completetask' element={<Complete/>} />
          <Route path='/incompletetask' element={<Incomplete/>} />
          <Route path='/importanttask' element={<Important/>} />
          </Route>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
         
        </Routes>
      
      {/* <Home /> */}
    </div>
  );
}

export default App;
