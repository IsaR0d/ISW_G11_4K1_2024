import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCdZef4nm7Rw34tg7nQFFK8TSw749W2re8",
    authDomain: "tp-isw-288fe.firebaseapp.com",
    databaseURL: "https://tp-isw-288fe-default-rtdb.firebaseio.com",
    projectId: "tp-isw-288fe",
    storageBucket: "tp-isw-288fe.appspot.com",
    messagingSenderId: "956080042853",
    appId: "1:956080042853:web:b709618fbde1f2dc5e278c"
  };
  
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
