import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

// const firebaseConfig = {
//     apiKey: "AIzaSyB3n6UP_7CEeDmo9n-7M6LNK9bzX_PBiIs",
//     authDomain: "babyshower-431fb.firebaseapp.com",
//     projectId: "babyshower-431fb",
//     storageBucket: "babyshower-431fb.appspot.com",
//     messagingSenderId: "900615828652",
//     appId: "1:900615828652:web:afa394a1ac3a0d867f5b09"
// };

const firebaseConfig = {
    apiKey: "AIzaSyAjZV9HDj-YsJ6Us_nhEzgZ_-JX_fy8k78",
    authDomain: "appbabyshower.firebaseapp.com",
    projectId: "appbabyshower",
    storageBucket: "appbabyshower.appspot.com",
    messagingSenderId: "906425636415",
    appId: "1:906425636415:web:cb9ea149df07b617194a8a"
};

const appFirebase = initializeApp(firebaseConfig);
export const db = getFirestore(appFirebase);
