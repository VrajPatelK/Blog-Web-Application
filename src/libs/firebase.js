import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_APIKEY || process.env.FIREBASE_APIKEY,
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN ||
    process.env.FIREBASE_AUTHDOMAIN,
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECTID ||
    process.env.FIREBASE_PROJECTID,
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET ||
    process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID ||
    process.env.FIREBASE_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID || process.env.FIREBASE_APPID,
  measurementId:
    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID ||
    process.env.FIREBASE_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
