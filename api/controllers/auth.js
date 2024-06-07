import db from '../db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import passport from 'passport'


const register = (req, res) => {
  const { username, email, password } = req.body

  //check if username or email exist
  const q = "SELECT * FROM users WHERE username= ? OR email= ?"
  db.query(q, [username, email], (err, data) => {
    if (err) return res.json(err)
    if (data.length) return res.status(409).json("user already exists!")

    //hash password
    const hash = bcrypt.hashSync(password, 10);

    //create user
    const q = "INSERT INTO users (username,email,password) VALUES (?,?,?)"
    const values = [username, email, hash]
    db.query(q, values, (err, data) => {
      if (err) return res.status(200).json(err)
      res.json('user create succesfully')
    })

  })
}

const login = (req, res) => {
  const { username, password } = req.body
  //check user
  const q = "SELECT * FROM users WHERE username= ?"
  db.query(q, [username], (err, data) => {
    if (err) return res.json(err)
    if (data.length === 0) return res.status(404).json("user not found")

    //check password
    const isPasswordMatch = bcrypt.compareSync(req.body.password, data[0].password)
    if (!isPasswordMatch) return res.status(400).json('wrong username or password')

    //jwt
    const token = jwt.sign({ id: data[0].id }, 'secret')
    const { password, ...other } = data[0]

    res.cookie('access_token', token, { httpOnly: true }).status(200).json(other)

  })

}

const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json('Failed to log out user')
    }
  });
  res.clearCookie('access_token', { sameSite: 'none', secure: true }).status(200).json('user logout')
}

const google = (req, res) => {
  if (!req.user) {
    return res.status(401).json('cant found user')
  }
  const profile = req.user;

  const provider = profile.provider;
  const providerId = profile.id;
  const username = profile.displayName;
  const img = profile.photos[0].value;

  // Check user by google_id
  const q = `SELECT * FROM users WHERE ${provider}_id = ?`;
  db.query(q, [providerId], (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (data.length > 0) {
      const token = jwt.sign({ id: data[0].id }, 'secret');
      return res.cookie('access_token', token, { httpOnly: true }).status(200).json(data[0]);
    }

    // If no google_id, insert user
    const qInsert = `INSERT INTO users (username, ${provider}_id, img) VALUES (?, ?, ?)`;
    const values = [username, providerId, img];
    db.query(qInsert, values, (err, result) => {
      if (err) {
        console.error('Error inserting new user:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      // Fetch the newly created user
      const newUserQuery = "SELECT * FROM users WHERE id = ?";
      db.query(newUserQuery, [result.insertId], (err, data) => {
        if (err) {
          console.error('Error fetching new user:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }

        const token = jwt.sign({ id: data[0].id }, 'secret');
        res.cookie('access_token', token, { httpOnly: true }).status(200).json(data[0]);
      });
    });
  });
};


export { login, register, logout, google }