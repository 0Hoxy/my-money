import firebase from "firebase";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCAHAC8rM_iY2Mez0VVbGpu9W-5BojaDZQ",
  authDomain: "mymoney-bd285.firebaseapp.com",
  projectId: "mymoney-bd285",
  storageBucket: "mymoney-bd285.appspot.com",
  messagingSenderId: "1092614124201",
  appId: "1:1092614124201:web:5aae45bc8486e27557afb8"
};

//firebase init
firebase.initializeApp(firebaseConfig);

//init service
const firedb = firebase.firestore();

const fireauth = firebase.auth();

const timestamp = firebase.firestore.Timestamp;

export { firedb, fireauth, timestamp };