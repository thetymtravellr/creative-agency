import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDn3IEpFVgTlc1l1CCcPPgm7-Ez6XJ-8zE",
  authDomain: "creative-agency-776e8.firebaseapp.com",
  projectId: "creative-agency-776e8",
  storageBucket: "creative-agency-776e8.appspot.com",
  messagingSenderId: "606903936816",
  appId: "1:606903936816:web:5f3366fbb0e5a9e560caf5",
  measurementId: "G-VVN28VEYEL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth;