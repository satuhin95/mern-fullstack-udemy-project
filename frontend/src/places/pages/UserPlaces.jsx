import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ErrorModal from '../../utility/components/UIElements/ErrorModal';
import LoadingSpinner from '../../utility/components/UIElements/LoadingSpinner';
import PlaceList from '../components/PlaceList'

export default function UserPlaces() {

  const [isLoading , setIsLoading] = useState(false);
  const [error , setError] = useState(false);
  const [loadedPlaces , setLoadedPlaces] = useState(false);
    const userId = useParams().userId;

    useEffect(()=>{
      const fetchData = async ()=>{
        setIsLoading(true)
        try {
          const response = await  fetch(`http://localhost:5000/api/places/user/${userId}`)
          const result = await response.json();
          // if(!result.ok){
          //   throw new Error(result.message)
          // }
          setLoadedPlaces(result.places)
          setIsLoading(false)
        } catch (error) {
          setIsLoading(false)
          setError(error.message || "Something  wrong")
        }
      }
      fetchData();
    },[userId])

    const errorHandler = ()=>{
      setError(null);
    }
    const placeDeleteHandler =(deletePlaceId)=>{
      loadedPlaces.filter(place=>place.id !== deletePlaceId)
    }

  return <>
    <ErrorModal error={error} onClear={errorHandler}/>
    {isLoading && <div className='center'><LoadingSpinner asOverlay/> </div> }
    {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={placeDeleteHandler}/>}
  </>
}
