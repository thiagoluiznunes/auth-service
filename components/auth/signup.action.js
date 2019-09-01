import * as admin from 'firebase-admin';
import bcrypt from 'bcrypt';

const emailRegex = /\S+@\S+\.\S+/;
const passwordRegex = /.{6,12}/;

const signup = async (req, res) => {
  const name = req.body.name || '';
  const email = req.body.email || '';
  const password = req.body.password || '';
  const confirmPassword = req.body.confirm_password || '';

  if (!email.match(emailRegex)) return res.status(400).send({ errors: ['Email inválido!'] });
  if (!password.match(passwordRegex)) return res.status(400).send({ errors: ['A senha deve conter entre 6 a 12 elementos!'] });

  const salt = bcrypt.genSaltSync();
  const passwordHash = bcrypt.hashSync(password, salt);

  if (!bcrypt.compareSync(confirmPassword, passwordHash)) return res.status(400).send({ errors: ['Senhas não conferem!'] });

  const db = admin.database();
  const ref = db.ref('auth-db');

  const snap = await ref.once('value');
  const usersRef = ref.child('users');

  try {
    if (snap.exportVal() === null) {
      usersRef.push({
        name: name,
        email: email,
        password: passwordHash
      });
      return res.status(200).send({ message: 'Registro realizado com sucesso!' });
    } else {
      usersRef.orderByChild('email').equalTo(email).on('value', (snap) => {
        if (snap.val() === null) {
          usersRef.push({
            name: name,
            email: email,
            password: passwordHash
          });
          return res.status(200).send({ message: 'Registro realizado com sucesso!' });
        } else {
          return res.status(400).send({ message: 'Email já cadastrado!' });
        }
      });
    }
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

export default signup;
