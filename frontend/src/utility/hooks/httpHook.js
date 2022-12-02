import { useCallback, useEffect, useRef, useState } from "react";
import { redirect } from "react-router-dom";

export const useHttpHook = ()=>{
    const [isLoading , setIsLoading] = useState(false);
    const [error , setError] = useState(false);

    const activeHttpRequests = useRef([])

    const sendRequest = useCallback( async (url, method= "GET", body= null, headers ={})=>{
        setIsLoading(true)
        const httpAbrotCtrl = new AbortController();
        activeHttpRequests.current.push(httpAbrotCtrl);
        try {
            const response = await fetch(url,{
                method,
                body,
                headers,
                signal:httpAbrotCtrl.signal
            });
            const result = await response.json();
            activeHttpRequests.current = activeHttpRequests.current.filter(reqCtrl => reqCtrl !== httpAbrotCtrl)
            if(!result.ok){
              throw new Error(result.message)
            }
            setIsLoading(false)
            return result;
        } catch (err) {
            setError(err.message);
            setIsLoading(false)
            throw err;
        }
        
    },[]);
    const clearError = ()=>{
        setError(null);
    }
    useEffect(()=>{
        return()=>{
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort())
        }
    },[])
    return {isLoading, error , sendRequest,clearError};
}