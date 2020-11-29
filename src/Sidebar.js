/** @format */

import React, { useState, useEffect } from "react"
import { Avatar, IconButton } from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search"
import RateReviewOutlinedIcon from "@material-ui/icons/RateReviewOutlined"
import "./Sidebar.css"
import SidebarChat from "./SidebarChat"
import { useSelector } from "react-redux"
import { selectUser } from "./features/userSlice"
import db, { auth } from "./firebase"
function Sidebar() {
  const user = useSelector(selectUser)
  const [chats, setChats] = useState([])
  useEffect(() => {
    db.collection("chats").onSnapshot((snapshot) =>
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    )
  }, [])

  const addChat = () => {
    const chatName = prompt("Enter your chatname")
    if (chatName) {
      db.collection("chats").add({
        chatName: chatName,
      })
    }
  }
  return (
    <div className='Sidebar'>
      <div className='sidebar__header'>
        <Avatar
          onClick={() => auth.signOut()}
          src={user.photo}
          className='sidebar__avatar'
        />
        <div className='sidebar__input'>
          <SearchIcon />
          <input placeholder='search' />
        </div>

        <IconButton variant='outlined' className='sidebar__inputbutton'>
          <RateReviewOutlinedIcon onClick={addChat} />
        </IconButton>
      </div>
      <div className='sidebar_chats'>
        {chats.map(({ id, data: { chatName } }) => (
          <SidebarChat id={id} key={id} chatName={chatName} />
        ))}
      </div>
    </div>
  )
}

export default Sidebar
