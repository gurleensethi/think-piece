import firebase from "firebase/app";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyCqNb-ohhCxu7_LFq6osLfMcETXnwpcuBs",
  authDomain: "quizytime.firebaseapp.com",
  databaseURL: "https://quizytime.firebaseio.com",
  projectId: "quizytime",
  storageBucket: "quizytime.appspot.com",
  messagingSenderId: "261583412798",
  appId: "1:261583412798:web:1fe92ab474f9fb73fafb6f"
};

firebase.initializeApp(config);

// Only for debugging purposes.
window.firebase = firebase;

export const firestore = firebase.firestore();

export default firebase;