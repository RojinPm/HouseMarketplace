import React from 'react'
import {useEffect, useState,useRef} from 'react'
import {getAuth, onAuthStateChanged } from 'firebase/auth'

export const useAuthStatus =() =>{

  const [loggedIn, setLoggedIn] = useState(false);
  const[checkingStatus, setCheckingStatus] = useState(true);
  const isMounted = useRef(true);

     useEffect(() => {

      if(isMounted){

        const auth = getAuth()
        onAuthStateChanged(auth, (user) =>{

          if(user){

            setLoggedIn(true)
            
          }
          setCheckingStatus(false)

        })

      }
      //clean Up function -Whenever we put something in the dependency array
      
       return () =>{

           isMounted.current=false

       }
     
       
     },[isMounted])
     

  return  { loggedIn, checkingStatus }
  
}

export default useAuthStatus