import React from 'react'
import Himg from '../../assests/meals.jpg'
import classes from './Header.module.css'
import HeaderCartButton from './HeaderCartButton'


const Header = (props) => {
  return (
    <>
        <header className={classes.header}>
            <h1>Recat Meals</h1>
            {/* <button>Cart</button> */}
            <HeaderCartButton onClick={props.onShowCart}/>
        </header>
        <div className={classes['main-image']}>
            <img src={Himg} alt="A table of dilicious foods "/>
        </div>
    </>
  )
}

export default Header