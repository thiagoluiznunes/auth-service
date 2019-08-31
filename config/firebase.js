import path from 'path';
import * as admin from 'firebase-admin';

const serviceAccount = path.join(__dirname, '../serviceAccountKey.json');
const initConnection = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://auth-service-50009.firebaseio.com/'
  });
}

export default {
  initConnection,
}
