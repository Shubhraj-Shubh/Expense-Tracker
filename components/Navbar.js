import React from 'react'
import "./Navbar.css"
const Navbar = () => {
  return (
    <div className='navbar'>
       <div className="logo sign">
            &lt;
            <p className="track">TRACK</p>
            <p className="op">OP</p>/&gt;
          </div>
          <div className="line">
            Your Own Expense Tracker
          </div>
    </div>
  )
}

export default Navbar
