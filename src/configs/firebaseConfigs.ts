import { initializeApp }  from 'firebase/app'
import { getFirestore }  from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrjr1teTeYU7peZI64zFHSDwDJYjONvx0",
  authDomain: "tasks-app-f387c.firebaseapp.com",
  projectId: "tasks-app-f387c",
  storageBucket: "tasks-app-f387c.appspot.com",
  messagingSenderId: "1046599871154",
  appId: "1:1046599871154:web:bcdcb4413662575db977ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db


