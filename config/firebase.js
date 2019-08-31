import path from 'path';
import * as admin from 'firebase-admin';

const serviceAccount = path.join(__dirname, '../serviceAccountKey.json');
const initConnection = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://auth-service-50009.firebaseio.com/'
  });

  // const db = admin.database();
  // const ref = db.ref("db/");

  // ref.once('value').then((snapshot) => {
  //   const back = snapshot.exportVal();
  //   console.log(JSON.stringify(back));
  // });
}

export default {
  initConnection,
}
