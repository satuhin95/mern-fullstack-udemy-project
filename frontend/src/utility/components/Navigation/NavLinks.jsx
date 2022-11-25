import React from 'react'
import './NavLinks.css'
export default function NavLinks() {
  return (
    <ul className='nav-links'>
      <li>
        <NavLinks to="/" exact>All Users</NavLinks>
      </li>
      <li>
        <NavLinks to="/places/u1" >My Places</NavLinks>
      </li>
      <li>
        <NavLinks to="/places/new" >Add Place</NavLinks>
      </li>
      <li>
        <NavLinks to="/auth" >Authenticate</NavLinks>
      </li>

    </ul>
  )
}
