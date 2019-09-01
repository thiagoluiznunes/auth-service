import * as admin from 'firebase-admin';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { AUTH_SECRET } from 'babel-dotenv';
import hp from '../helper';

const login = async (req, res) => {
  const email = req.body.email || '';
  const password = req.body.password || '';

  const db = admin.database();
  const ref = db.ref('auth-db');

  const snap = await ref.once('value');
  const usersRef = ref.child('users');

  try {
    if (snap.exportVal() === null) {
      return res.status(400).send({ message: 'Usuário/Senha inválidos' });
    } else {
      usersRef.orderByChild('email').equalTo(email).once('value', async (snap) => {
        const user = await hp.snapshotToObject(snap);
        if (snap.val() === null) {
          return res.status(400).send({ message: 'Usuário/Senha inválidos' });
        }
        else if (user && bcrypt.compareSync(password, user.password)) {
          const payload = { id: user.id, email: user.email };
          const options = { algorithm: 'HS256', expiresIn: '1 day' };
          const token = jwt.sign(payload, AUTH_SECRET, options);
          const { name, email } = user;
          res.json({ name, email, token });
        } else {
          return res.status(400).send({ errors: 'Usuário/Senha inválidos' });
        }
      });
    }
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

export default login;
