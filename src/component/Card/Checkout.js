import React, { useRef, useState } from 'react'
import classes from './Checkout.module.css'


const isEmpty = value => value.trim() === '';
const isFive = value => value.trim().length === 5;


const Checkout = (props) => {
  const [frominputValidity, setfrominputValidity] = useState({
    name:true,
    city:true,
    street:true,
    postal:true,

  })


  const nameInput = useRef();
  const streetInput = useRef();
  const postalInput = useRef();
  const cityInput = useRef();


  const ConfirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInput.current.value;
    const enteredStreet = streetInput.current.value;
    const enteredPostal = postalInput.current.value;
    const enteredCity = cityInput.current.value;


    const enterednameIsvalid = !isEmpty(enteredName);
    const enteredstreetIsvalid = !isEmpty(enteredStreet);
    const enteredcityIsvalid = !isEmpty(enteredCity);
    const enteredpostalIsvalid = !isFive(enteredPostal);


    setfrominputValidity({
      name:enterednameIsvalid,
      city:enteredcityIsvalid,
      street:enteredstreetIsvalid,
      postal:enteredpostalIsvalid
    })

    const fromValid = enterednameIsvalid && enteredstreetIsvalid && enteredcityIsvalid && enteredpostalIsvalid;

    if (!fromValid){
      return;
    }

    props.onConfirm({
      name:enteredName,
      city:enteredCity,
      street:enteredStreet,
      postal:enteredPostal
    })

  }


  return (
    <form onSubmit={ConfirmHandler} className={classes.form}>
        <div className={`${classes.control} ${frominputValidity.name ? '' : classes.invalid}`}>
            <label htmlFor='name'>Your Name </label>
            <input type="text" id="name" ref={nameInput}/>
            {!frominputValidity.name && <p>Please enter the valid name . </p>}
        </div>

        <div className={`${classes.control} ${frominputValidity.street ? '' : classes.invalid}`}>
            <label htmlFor='name'>street </label>
            <input type="text" id="name" ref={streetInput}/>
            {!frominputValidity.street && <p>Please enter the valid street name . </p>}

        </div>

        <div className={`${classes.control} ${frominputValidity.postal ? '' : classes.invalid}`}>
            <label htmlFor='name'>postal code </label>
            <input type="text" id="name" ref={postalInput}/>
            {!frominputValidity.postal && <p>Please enter the valid postal name . </p>}
        </div>

        <div className={`${classes.control} ${frominputValidity.city ? '' : classes.invalid}`}>
            <label htmlFor='name'> City </label>
            <input type="text" id="name" ref={cityInput}/>
            {!frominputValidity.city && <p>Please enter the valid city name . </p>}

        </div>

        <div className={classes.actions}>
          <button type='button' onClick={props.onCancel} > Cancel </button>
          <button > Confirm </button>
        </div>

    </form>
  )
}

export default Checkout