import * as admin from 'firebase-admin';
import serviceAccount from '../storage/credentials/firebase.json'; // Esto solo es para proposito de pruebas

admin.initializeApp({
  // credential: admin.credential.applicationDefault(),
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount), // Esto solo es para proposito de pruebas
  // databaseURL: process.env.FIREBASE_DATABASE_URL,
  databaseURL: 'https://test-project-5e515-default-rtdb.firebaseio.com', // Esto solo es para proposito de pruebas
});

export const db = admin.firestore();
