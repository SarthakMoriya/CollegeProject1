// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDojNaCGmr1Ad8BpDzQCcX9Na3XOz6pjSQ",
  authDomain: "yamanproject-4e8ba.firebaseapp.com",
  projectId: "yamanproject-4e8ba",
  storageBucket: "yamanproject-4e8ba.appspot.com",
  messagingSenderId: "398092746590",
  appId: "1:398092746590:web:c85e1f16989818258759cf",
  measurementId: "G-P2E3LKBGNE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const imageDB=getStorage(app)