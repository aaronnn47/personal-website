import React from 'react'
import {Link} from 'react-router-dom'
import './Confirmation.css'

export default function Confirmation(){

    return(
    <div className='confirmation-background'>
        <h4>Thanks for your purchase</h4>
        <Link to='/home'>
            <button>Go Home</button>
        </Link>
    </div>
    )
}