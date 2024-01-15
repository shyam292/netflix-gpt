import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword , signInWithEmailAndPassword, updateProfile  } from "firebase/auth";
import {auth} from '../utils/Firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';



const Login = () => {
  const [isSignInForm , setIsSignInForm] = useState(true);

  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    //validate the form data
  

    //console.log(email.current.value);
    //console.log(password.current.value);

    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if(message) return; //if error msg comes return

    //now sign in / sign up

    if(!isSignInForm){

      //sign up logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
  
      // Signed up 
        const user = userCredential.user;
        // updateProfile(user, {
        //   displayName: name.current.value, photoURL: 'https://img00.deviantart.net/bc0b/i/2015/225/5/e/shin_chan_vectorial_by_markef-d95i293.png'
        // })
        // .then(() => {
        //   // Profile updated!
        //   const {uid, email, displayName, photoURL} = auth.currentUser ;
        //   dispatch(addUser({uid: uid, email: email, displayName: displayName , photoURL: photoURL}));
        //   navigate("/Browse");
        // }).catch((error) => {
        //   // An error occurred
        //   setErrorMessage(error.message);
        // });
         console.log(user); 
         navigate("/Browse");
        
      // ...
      })
     .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMessage(errorCode+ "-haha" + errorMessage)
      // ..
    });  
    
    
    }
    else {
      //sign in logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        navigate("/Browse");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode+ "-" + errorMessage);
      });
    
    }


  }
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);

  };
  return (
    <div>
      <Header/>
      <div>
        <img className='absolute' src='https://assets.nflxext.com/ffe/siteui/vlv3/df6621a3-890c-4ca0-b698-90bd5152f3d1/20a59be7-7062-4991-bca0-805e9a7f2716/IN-en-20240107-trifectadaily-perspective_alpha_website_small.jpg' alt='background img'/>
      </div>
      
      <form onSubmit={(e) => e.preventDefault()} className=' w-1/4 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>

        <h1 className=' font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>

        {!isSignInForm && (
          <input type='text' placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700' />
        )}
           
        
        <input ref = {email} type='text' placeholder='Email Address' className='p-4 my-4 w-full bg-gray-700'/>
        
        <input ref = {password} type='password' placeholder='Password' className='p-4 my-4 w-full bg-gray-700'/>

        <p className=' text-red-400 py-2 text-lg font-bold'>{errorMessage}</p>
        
        <button className=' p-4 my-6 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
        
        <p className=' py-4 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now"}</p>
      
      </form>
      
    </div>
  )
}

export default Login
