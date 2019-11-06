import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

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
export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();

export const createUserProfileDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const createdAt = new Date();
    try {
      const { displayName, email, photoURL } = user;
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user", error);
    }
  }

  return getUserDocument(user.uid);
};

export const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore
      .collection(`users`)
      .doc(uid)
      .get();
    return { uid, ...(userDocument.data()) };
  } catch (error) {
    console.error("Error fetching user", error.message);
  }
};

export default firebase;
