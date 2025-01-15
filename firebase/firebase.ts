import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; 

const firebaseConfig = {
  apiKey: "AIzaSyDxB_C56y13ThqAg2PfNHaCJhGZp5NmfGQ",
  authDomain: "zubairtalibandcompany.firebaseapp.com",
  projectId: "zubairtalibandcompany",
  storageBucket: "zubairtalibandcompany.firebasestorage.app",
  messagingSenderId: "375628568187",
  appId: "1:375628568187:web:f510a450007dd5d41af4de"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);  // Initialize Firestore

// Export both auth and db
export { auth, db };
