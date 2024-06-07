import 'dotenv/config'
import express from 'express'
import './db.js'
import usersRoute from './routes/users.js'
import authRoute from './routes/auth.js'
import postsRoute from './routes/posts.js'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import './passport.js'
import session from 'express-session'
import cors from 'cors'
import multer from 'multer'




const app = express()


app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE'
  })
)

//session setup
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    sameSite: 'lax'
  }
}))



//passport setup
app.use(passport.initialize());
app.use(passport.session());

// multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/upload')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, Date.now() + file.originalname)
  }
})

const upload = multer({ storage })

app.post('/api/upload', upload.single('file'), function (req, res) {
  const file = req.file
  res.status(200).json(file.filename)
});


//route
app.use('/api/users', usersRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postsRoute);


app.listen(5000, () => {
  console.log('app listen on port 5000')
})