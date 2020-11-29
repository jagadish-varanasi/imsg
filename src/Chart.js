/** @format */

import React, { useState, useEffect } from "react"
import { IconButton } from "@material-ui/core"
import MicNoneIcon from "@material-ui/icons/MicNone"
import "./Chart.css"
import Message from "./Message"
import { selectchatName, selectchatId } from "./features/chatSlice"
import { useSelector } from "react-redux"
import db from "./firebase";
import firebase from "firebase"
import { selectUser } from "./features/userSlice"
import FlipMove from "react-flip-move"
function Chart() {
  const user=useSelector(selectUser)
  const [input, setInput] = useState("")
  const chatName = useSelector(selectchatName);
  const chatId = useSelector(selectchatId);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (chatId) {
      db.collection('chats').doc(chatId).collection('messages').orderBy("timestamp", "desc").onSnapshot(snapshot => {
        setMessages(snapshot.docs.map(doc => ({
          id: doc.id,
          data:doc.data(),
        })))
       });
    }
  },[chatId])
  const sendMessage = (e) => {
    e.preventDefault()
    db.collection("chats").doc(chatId).collection('messages').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      uid: user.uid,
      photo: user.photo,
      email: user.email,
      // displayName: user.displayName,
    });
    setInput(" ")

    //firebase
  }
  return (
    <div className='chart'>
      <div className='chart__header'>
        <h4>
          TO: <span className='chart__name'>{chatName}</span>
        </h4>
        <strong>Details</strong>
      </div>
      <div className='chart__body'>
        <FlipMove>
        {messages.map(({id,data}) => (
          <Message key={id} contents={data}/>
        ))}
        </FlipMove>
      </div>
      <div className='chartmsg'>
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type='text'
            placeholder='Enter Here'
          />
          <button onClick={sendMessage}>Send Message</button>
        </form>
        <IconButton>
          <MicNoneIcon className='chat__mic' />
        </IconButton>
      </div>
    </div>
  )
}

export default Chart
