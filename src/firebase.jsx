import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDm9R-hwprOQ99HlMVZM-zX5lvl0Tw5AWM",
  authDomain: "mango-79490.firebaseapp.com",
  projectId: "mango-79490",
  storageBucket: "mango-79490.appspot.com",
  messagingSenderId: "730931845864",
  appId: "1:730931845864:web:a3a1f8f67f47064f81c75d",
  measurementId: "G-F78WEFQWVL",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const appleProvider = new OAuthProvider("apple.com");

export { auth, provider, facebookProvider, appleProvider };
