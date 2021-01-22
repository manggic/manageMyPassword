
// import  PlayArrowIcon from '@material-ui/icons/PlayArrow';
import './App.css';
import { Context } from './component/Context';
import { Switch , Route, Link } from "react-router-dom";
import SignUp from './component/SignUp';
import SignIn from './component/SignIn';
import Home from './component/Home';
import { useState } from 'react';
import { ToastContainer} from 'react-toastify'
import Header from './component/Header';
import 'bootstrap/dist/css/bootstrap.min.css';





const  App = () => {
   const [ user , setUser] = useState({})

  return (
    <div className="App">        
        
        <Context.Provider value=  { {user , setUser} } >
                 <Header />    

                 <Switch>
                    <Route path='/' component={ Home }  exact />                        
                    <Route path='/signin' component={SignIn} exact />
                    <Route path='/signup' component={ SignUp} exact />
                 </Switch>
        </Context.Provider>          
    </div>
  );
}

export default App;
