import express from 'express'
import { login, register, logout, google } from '../controllers/auth.js'
import passport from 'passport';


const router = express.Router()

router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout)

//google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login' }), function (req, res) {
  res.redirect('http://localhost:3000');
})
router.get('/google/success', google)

//github
router.get('/github', passport.authenticate('github', { scope: ['profile'] }));
router.get('/github/callback', passport.authenticate('github', { failureRedirect: 'http://localhost:3000/login' }), function (req, res) {
  res.redirect('http://localhost:3000');
})

//facebook
router.get('/facebook', passport.authenticate('facebook', { scope: ['profile'] }));
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: 'http://localhost:3000/login' }), function (req, res) {
  res.redirect('http://localhost:3000');
})


export default router