import React, { useContext } from 'react'
import './NavLinks.css'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import Button from '../FormElement/Button';

export default function NavLinks() {
 const auth = useContext(AuthContext);
  return (
    <ul className='nav-links'>
      <li>
        <NavLink to="/" >All Users</NavLink>
      </li>
      { auth.isLoggedIn &&<li>
        <NavLink to={`/${auth.userId}/places`} >My Places</NavLink>
      </li>}
      { auth.isLoggedIn &&<li>
        <NavLink to="/places/new" >Add Place</NavLink>
        </li>}
     { !auth.isLoggedIn &&<li>
        <NavLink to="/auth" >Authenticate</NavLink>
        </li>}
        { auth.isLoggedIn &&<li>
        <Button onClick={auth.logout}>LogOut</Button>
        </li>}

    </ul>
  )
}
