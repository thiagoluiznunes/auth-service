import * as admin from 'firebase-admin';
import path from 'path';
import { FIREBASE_URL } from 'babel-dotenv';

const serviceAccount = path.join(__dirname, '../serviceAccountKey.json');
const initConnection = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: FIREBASE_URL
  });
}

export default {
  initConnection,
}
