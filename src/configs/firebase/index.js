import {initializeApp} from "firebase/app"
import 'firebase/database';
const firebaseConfig = {
    apiKey: "AIzaSyBgnD6u_OBBCKukM-JTHKNTGa6Q3C75AxU",
    authDomain: "notes-firebase-880bd.firebaseapp.com",
    projectId: "notes-firebase-880bd",
    storageBucket: "notes-firebase-880bd.appspot.com",
    messagingSenderId: "320322937094",
    appId: "1:320322937094:web:8e7f5762a27b928aadbe87",
    measurementId: "G-ZJBWNXPC5J"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);
  export default app