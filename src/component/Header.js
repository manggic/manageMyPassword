

import React, { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from './Context'
import './Header.css'

const Header = () => {
    const context  = useContext(Context)

    return (
        <div className='header'>
           {  Object.keys(context.user).length !== 0 ? ( 
               <Fragment>
            <div className='header__left'>
              <Link className='link' to='/'>Home</Link>
             </div>
             <div className='middle text-white d-flex justify-content-center'>Manage Password</div>  
              <div className='header__right'>
              <Link className='link' to='/' onClick={ ()  =>  context.setUser('') } >SignOut</Link>
              </div>
              </Fragment>
           ):(
               <Fragment>
             <div className='header__left'>
              <Link className='link' to='/'>Home</Link>
             </div>  
              <div className='header__right'>
              <Link className='link' to='/signup'>SignUp</Link>
              <Link className='link' to='/signin'>SignIn</Link>
              </div>
              </Fragment>
           ) }
             
        </div>
    )
}

export default Header



