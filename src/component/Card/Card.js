import React, { useContext, useState } from 'react'
import CartContext from '../../Store/CartContext';
import Model from '../UI/Model';
import CartItem from './CartItem' 
import classes from './Card.module.css'
import Checkout from './Checkout';



const Card = (props) => {

  const [IsCheckout, setIsCheckout] = useState(false)
  const [IsSubmitting, setIsSubmitting] = useState(false)
  const [DidSubmitted, setDidSubmitted] = useState(false)
  
  const cartCtx = useContext(CartContext)

  const TotalAmount = `$${cartCtx.totalAmount.toFixed(2)}`

  const hasItem = cartCtx.items.length > 0

  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id)
  };

  const cartItemAddHandler = item => {
    cartCtx.addItem({...item, amount:1})
  };

  const OrderHandler = () => {
    setIsCheckout(true)
  }

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true)
    await fetch('https://apipractice-4fffe-default-rtdb.firebaseio.com/orders.json',{
      method:'POST',
      body:JSON.stringify({
        user:userData,
        orderItems:cartCtx.items
      })
    })
    setIsSubmitting(false)
    setDidSubmitted(true)
    cartCtx.clearCart()
  }

  const cartItem = <ul className={classes['cart-items']}>{cartCtx.items.map((item) => (<CartItem key={item.id} name={item.name} amount={item.amount} price={item.price}  onRemove={cartItemRemoveHandler.bind(null,item.id)} onAdd={cartItemAddHandler.bind(null, item)}/>))}</ul>;


  const ModelAction = (
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}> Close </button>
        {hasItem && <button className={classes.button} onClick={OrderHandler}> Order</button>}
      </div>
      )

  const cardModelContent = <>
      {cartItem}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{TotalAmount}</span>
      </div>
      { IsCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
      {!IsCheckout && ModelAction }
      </>

    const isSubmittingModelContent = <p> Sending order data .... </p>
    const didSubmitModeContent = <>
     <p> Successfully sent the order!  </p>
     <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}> Close </button>
      </div>
    </>

  return (
    <Model onClose={props.onClose}>
      {!IsSubmitting && !DidSubmitted && cardModelContent}
      {IsSubmitting && isSubmittingModelContent}
      {!IsSubmitting && DidSubmitted && didSubmitModeContent}
    </Model>
  )
}

export default Card