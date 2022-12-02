import  { useCallback, useEffect, useState } from 'react'

let logOutTimer;
export const useAuth =()=> {
    const [token, setToken] = useState(false);
    const [tokenExpirationsDate , setTokenExpiration] = useState();
    const [userId, setUserId] = useState(false);
  
  
    const login = useCallback((uid, token, expirationDate) => {
      setToken(token);
      setUserId(uid);
      const tokenExpirationsDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
      setTokenExpiration(tokenExpirationsDate)
      localStorage.setItem('userData', JSON.stringify({
        userId:uid, 
        token:token,
        expiration :tokenExpirationsDate.toISOString()
      }))
    });
    const logout = useCallback(() => {
      setToken(null);
      setUserId(null);
      setTokenExpiration(null)
      localStorage.removeItem('userData');
    });
    useEffect(()=>{
      if (token && tokenExpirationsDate) {
        let remainingTime = tokenExpirationsDate.getTime() - new Date().getTime();
       logOutTimer = setTimeout(logout, remainingTime)
      }else{
        clearTimeout(logOutTimer);
      }
    },[token, logout, tokenExpirationsDate])
  
    useEffect(()=>{
      const storeData = JSON.parse(localStorage.getItem('userData'));
      
      if(storeData && storeData.token && new Date(storeData.expiration) > new Date()){
        login(storeData.userId, storeData.token , new Date(storeData.expiration))
      }
    },[])
 
    return {token ,login, logout ,userId}
}
