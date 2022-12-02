import React from 'react'
import './UsersList.css'
import UserItem from './UserItem'
import Card from '../../utility/components/UIElements/Card'
export default function UsersList({items}) {

    if (items?.length ===0) {
        return (
            <div className='center'>
                <Card>
                     <h2>Users not found!</h2>
              </Card>
            </div>
          )
    }
    return <>
        <ul className='users-list'>
            {items?.map((user,index)=>{
                return <UserItem key={index} id={user._id} name={user.name} image={user.image} placeCount={user.places.length}/>
            })}
        </ul>
    
    </>
 
}
