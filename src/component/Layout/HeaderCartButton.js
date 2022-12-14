import React, { useContext, useEffect, useState } from 'react'
import CartContext from '../../Store/CartContext'
import CartIcon from '../Card/CartIcon'

import classes from './HeaderCartButton.module.css'
  
const HeaderCartButton = (props) => {
  const [ButAreHighLighted, setButAreHighLighted] = useState(false)
  const cartCtx = useContext(CartContext)

  const numberOfCartItems = cartCtx.items.reduce((curNumber , item) => {
    return curNumber + item.amount
  }, 0);


  const { items } = cartCtx
  const btnClasses = `${classes.button} ${ButAreHighLighted ? classes.bump : ''}`;
  
  useEffect(() => {
    if (items.length === 0){
      return
    }
    setButAreHighLighted(true)

    const timer = setTimeout(() => {
      setButAreHighLighted(false)
    },300)

    return () => {
      clearTimeout(timer)
    }
      
  }, [items])
  


  return (
    <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}><CartIcon/></span>
        <span> Your Cart </span>
        <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  )
}

export default HeaderCartButton

