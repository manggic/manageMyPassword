
import React,{ useState } from 'react'
import './Card.css'
import { ImCross } from "react-icons/im";
 
const Card = ({ data, setData, storeDataInFirebase,  title, accounts, setAccounts,  cardToggle }) =>  {


  const  closeCross  = (This) => {
          let acc =  accounts.filter( acc => (
               acc !== This  
          )) 
          console.log(acc);
         // delete data[This]
          let newData = data
          delete newData[This]
          setData( newData )
          storeDataInFirebase()
          setAccounts( acc )
  }


    return (        
      <div className='cardBox'>
          <div onClick={ () => cardToggle(title) } className='card' id={ title }>
             { title }
          </div>
          <ImCross onClick={() => closeCross( title ) } className='cross'>Delete</ImCross>           
        </div>
    )
}

export default Card;



