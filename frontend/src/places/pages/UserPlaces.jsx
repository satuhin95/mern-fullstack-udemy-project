import React from 'react'
import { useParams } from 'react-router-dom'
import PlaceList from '../components/PlaceList'
const DEMO_PLACES=[
    {
        id:'p1',
        title:'Bangladesh National Parliament',
        description:'Jatiya Sangsad Bhaban or National Parliament House, is the house of the Parliament of Bangladesh',
        imageUrl:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/National_Assembly_of_Bangladesh_%28%E0%A6%9C%E0%A6%BE%E0%A6%A4%E0%A7%80%E0%A6%AF%E0%A6%BC_%E0%A6%B8%E0%A6%82%E0%A6%B8%E0%A6%A6_%E0%A6%AD%E0%A6%AC%E0%A6%A8%29.jpg/1200px-National_Assembly_of_Bangladesh_%28%E0%A6%9C%E0%A6%BE%E0%A6%A4%E0%A7%80%E0%A6%AF%E0%A6%BC_%E0%A6%B8%E0%A6%82%E0%A6%B8%E0%A6%A6_%E0%A6%AD%E0%A6%AC%E0%A6%A8%29.jpg',
        address:"Sher-e-Bangla Nagar in the Bangladeshi capital of Dhaka.",
        location:{
            lat:23.7626661, 
            leg:90.3760433,
        },
        creator:'u1'
    },
    {
        id:'p2',
        title:'Maynamoti War Cemetery',
        description:'The Mainamati War Cemetery is a war cemetery and a memorial in Comilla, Bangladesh, for Second World War graves from nearby areas. ',
        imageUrl:'https://live.staticflickr.com/729/32500446541_f20f29c2e7_b.jpg',
        address:"Maynamoti, Comilla.",
        location:{
            lat:23.4869293, 
            leg:91.1127109, 
        },
        creator:'u2'
    },
    {
        id:'p3',
        title:"St. Martin's Island",
        description:"St. Martin's Island is a small island in the northeastern part of the Bay of Bengal",
        imageUrl:'https://sgp1.digitaloceanspaces.com/cosmosgroup/news/1878484_Saint%20Martins%20Island%20Bangladesh.jpg',
        address:" Cox's Bazar District",
        location:{
            lat:20.6282000,  
            leg:92.3213348,
        },
        creator:'u1'
    },
    {
        id: 'p4',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
          lat: 40.7484405,
          lng: -73.9878584
        },
        creator: 'u1'
      },
      {
        id: 'p5',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
          lat: 40.7484405,
          lng: -73.9878584
        },
        creator: 'u2'
      }
]
export default function UserPlaces() {
    const userId = useParams().userId;
    const loadedPlaces = DEMO_PLACES.filter((place)=>place.creator === userId)
  return <PlaceList items={loadedPlaces}/>
}
