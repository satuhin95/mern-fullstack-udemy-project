import React, { useEffect, useState } from 'react'
import UsersList from '../componsnts/UsersList'
import ErrorModal from '../../utility/components/UIElements/ErrorModal';
import LoadingSpinner from '../../utility/components/UIElements/LoadingSpinner';
export default function Users() {
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState();
  const [data,setData] = useState();
  useEffect(()=>{
    const sendRequest = async ()=>{
      setLoading(true)
     try {
      const response = await fetch('http://localhost:5000/api/users');;
      const result = await response.json();
    
      // if(!result.ok){
      //   throw new Error(result.message)
      // }
      setData(result)
      setLoading(false)
    
 
     } catch (error) {
       setError(error.message)
      }
      setLoading(false)
    }
    sendRequest();
  },[])
  const errorHandler = ()=>{
    setError(null);
  }

  return <>
  <ErrorModal error={error} onClear={errorHandler} />
  {loading && <div className='center'>
    <LoadingSpinner/>
    </div>}
    {!loading && data && <UsersList  items={data.users}/>}
  </>
}
