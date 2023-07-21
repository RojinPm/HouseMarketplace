// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkgyd6vtNOmcwGMQti2MBDqnnankvlxBc",
  authDomain: "house-marketplace-bb78c.firebaseapp.com",
  projectId: "house-marketplace-bb78c",
  storageBucket: "house-marketplace-bb78c.appspot.com",
  messagingSenderId: "390481290474",
  appId: "1:390481290474:web:b9812f177b6a26cfc66393"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db= getFirestore()