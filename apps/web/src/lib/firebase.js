import { getAnalytics, isSupported } from 'firebase/analytics';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyBPPfixm_ROaJj5j0Yp3Myin5qP0U-4NjE',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'bravevest-9cced.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'bravevest-9cced',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'bravevest-9cced.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '619206615071',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:619206615071:web:434ee82a57b5b7e12bf52a',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-R65NZFLVSS',
};

export const firebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const firebaseAuth = auth;


export const analyticsPromise =
  typeof window === 'undefined'
    ? Promise.resolve(null)
    : isSupported().then((supported) => (supported ? getAnalytics(firebaseApp) : null));
