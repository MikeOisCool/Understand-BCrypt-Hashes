'use strict';
const express     = require('express');
const bcrypt = require('bcrypt');
const bodyParser  = require('body-parser');
const fccTesting  = require('./freeCodeCamp/fcctesting.js');
const app         = express();
fccTesting(app);
const saltRounds = 12;
const myPlaintextPassword = 'sUperpassw0rd!';
const someOtherPlaintextPassword = 'pass123';

// Middleware für body parsing
app.use(bodyParser.urlencoded({ extended: false }));
//START_ASYNC -do not remove notes, place code between correct pair of notes.
// Beispiel: Asynchrone Methode, um ein Passwort zu hashen
app.post('/hash-password', async (req, res) => {
    try {
      // Passwort mit bcrypt hashen
      const hashedPassword = await bcrypt.hash(myPlaintextPassword, saltRounds);
      console.log('Hashed Password:', hashedPassword);
      res.json({ hashedPassword });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error hashing password');
    }
  });
  
  // Beispiel: Asynchrone Methode, um ein Passwort zu vergleichen
  app.post('/compare-password', async (req, res) => {
    try {
      // Vergleich des Klartextpassworts mit dem gehashten Passwort
      const match = await bcrypt.compare(someOtherPlaintextPassword, myPlaintextPassword);
      console.log('Do the passwords match?', match);
      res.json({ match });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error comparing password');
    }
  });


//END_ASYNC

//START_SYNC

// Beispiel: Passwort synchron hashen
const hashedPasswordSync = bcrypt.hashSync(myPlaintextPassword, saltRounds);
console.log('Synchronous hashed password:', hashedPasswordSync);

// Beispiel: Passwort synchron vergleichen
const isMatchSync = bcrypt.compareSync(someOtherPlaintextPassword, myPlaintextPassword);
console.log('Do the passwords match? (Sync)', isMatchSync);

//END_SYNC





























const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Listening on port:", PORT)
});
