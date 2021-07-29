import firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import 'firebase/auth';


// Your web app's Firebase configuration
const app = firebase.initializeApp({
  apiKey: "AIzaSyCl6ZGkg59OEjtlQ-tbLTCBOh09n3Tyo7I",
  authDomain: "lab-notes-devnote.firebaseapp.com",
  projectId: "lab-notes-devnote",
  storageBucket: "lab-notes-devnote.appspot.com",
  messagingSenderId: "540602994712",
  appId: "1:540602994712:web:d2f0ae1414b20aace5b36d"
});
// Initialize Firebase
export const db = app.firestore();
export const auth = firebase.auth();


export default app;