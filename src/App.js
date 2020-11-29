/** @format */

import React, { useEffect } from "react"
import "./App.css"
import Imessage from "./Imessage"
import { selectUser, login, logout } from "./features/userSlice"
import { useSelector, useDispatch } from "react-redux"
import Login from "./Login"
import { auth } from "./firebase"
function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user logged in
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayname: authUser.displayName,
          })
        )
      } else {
        //user logged out
        dispatch(logout())
      }
    })
  }, [])
  return <div className='app'>{user ? <Imessage /> : <Login />}</div>
}

export default App
