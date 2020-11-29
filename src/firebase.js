import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyDot1G7rZoqk8EpyLD4HMElAqi_auhOM28",
    authDomain: "imessage-clone-2ede8.firebaseapp.com",
    databaseURL: "https://imessage-clone-2ede8.firebaseio.com",
    projectId: "imessage-clone-2ede8",
    storageBucket: "imessage-clone-2ede8.appspot.com",
    messagingSenderId: "993414343947",
    appId: "1:993414343947:web:d1ad20d9144686db2b860e",
    measurementId: "G-PL8RRK2ZDY"
};
  
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
