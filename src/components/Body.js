import React, { useEffect } from 'react'
import Browse from './Browse'
import { createBrowserRouter} from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import Login from './Login'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../utils/Firebase'
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'


const Body = () => {
  const dispatch = useDispatch();
  
  const appRouter = createBrowserRouter([
    {
      path:"/",
      element:<Login/>,
    },
    {
      path:"/Browse",
      element:<Browse/>,  },
  ])

  useEffect(() =>{
    onAuthStateChanged(auth, (user) => {
      if (user) {

        // User is signed in
       
        const {uid, email, displayName, photoURL} = user;
        dispatch (addUser({uid: uid, email: email, displayName: displayName , photoURL: photoURL})
      );//data put up in redux store

        

      } else {
        // User is signed out
        dispatch(removeUser());
        
      }
    });

  }, [dispatch])





  return (
    <div>
      <RouterProvider router={appRouter}/>

    </div>
  )
}

export default Body