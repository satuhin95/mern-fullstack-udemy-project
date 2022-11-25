import React from 'react'
import UsersList from '../componsnts/UsersList'
export default function Users() {
  const USERS =[
    {
    id:"u1",
    name:"Abdullah",
    image:"https://images.pexels.com/photos/14437082/pexels-photo-14437082.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    placeCount:3
  },
  {
    id:"u2",
    name:"Mamun",
    image:"https://images.pexels.com/photos/4371673/pexels-photo-4371673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    placeCount:3
  },
  {
    id:"u3",
    name:"Mahin",
    image:"https://images.pexels.com/photos/14437082/pexels-photo-14437082.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    placeCount:3
  }
]
  return <UsersList  items={USERS}/>
}
