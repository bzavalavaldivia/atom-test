import * as admin from 'firebase-admin';
import serviceAccount from '../../storage/credentials/firebase.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: 'https://test-project-5e515-default-rtdb.firebaseio.com',
});

export const db = admin.firestore();
