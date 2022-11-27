import React from 'react'
import './UserItem.css'
import Avatar from '../../utility/components/UIElements/Avatar'
import {Link} from 'react-router-dom';
import Card from '../../utility/components/UIElements/Card'
export default function UserItem(props) {
  return (
    <li className='user-item'>
    <Card  className='user-item__content'>
        <Link to={`/${props.id}/places`}>
        <div className='user-item__image'>
            <Avatar image={props.image} alt={props.name}/>
        </div>
        <div className='user-item__info'>
            <h2>{props.name}</h2>
            <h3>{props.placeCount} {props.placeCount ===1? "Place":"Places"}</h3>
        </div>
        </Link>
    </Card>
    </li>
  )
}
