import React, { Fragment } from 'react'
import classes from './Model.module.css'
import ReactDOM from 'react-dom'

const Backdrop = (props) =>{
    return <div className={classes.backdrop} onClick={props.onClose}></div>
}


const ModelOverlay = (props) => {
    return(
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    )
}

const poratlElement = document.getElementById('overlays')

const Model = (props) => {
  return (
    <>
        {ReactDOM.createPortal(<Backdrop onClose={props.onClose} /> , poratlElement)}
        {ReactDOM.createPortal(<ModelOverlay>{props.children}</ModelOverlay> , poratlElement)}
    </>
  )
}

export default Model

