import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth/* , GoogleAuthProvider */ } from '../firebase';



const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = (props) => {

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    })
  }, [])

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  }

 const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  }

  // const loginGmail = () => {
  //  return GoogleAuthProvider().auth.signInWithPopup()
  // }

  const logout = () => auth.signOut();

  const value = {
    currentUser,
    login,
    logout,
    // loginGmail,
    signup
  };
  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  )
}
