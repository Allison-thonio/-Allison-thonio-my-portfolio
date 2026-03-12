import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported, logEvent, Analytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFfkID4evd0z9aewaqSR-IlBhTQlJ-b3A",
  authDomain: "portfolio-c873a.firebaseapp.com",
  projectId: "portfolio-c873a",
  storageBucket: "portfolio-c873a.firebasestorage.app",
  messagingSenderId: "246978094021",
  appId: "1:246978094021:web:dd5306f7261f8d916421ac",
  measurementId: "G-RZ77PDXKYE"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Analytics is only supported in browser environments
let analytics: Analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, analytics, logEvent, db, auth, storage };
