import React from "react";
import {Link} from 'react-router-dom'
import './Footer.css'
import avatar from '../../Images/avatar.svg'
import banknote from '../../Images/banknote.svg'
import home from '../../Images/home.svg'
import cart from '../../Images/cart.svg'

export default function Footer() {
  return (
    <div>
      <div className="footer">
        <Link to="/home" className="link">
          <img src={home} alt="" />
        </Link>
        <Link to="/wallet" className="link">
          <img src={banknote} alt="" />
        </Link>
        <Link to="/cart" className="link">
          <img src={cart} alt="" />
        </Link>
        <Link to="/account" className="link">
          <img src={avatar} alt="" />
        </Link>
      </div>
    </div>
  );
}
