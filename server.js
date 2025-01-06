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
app.use(bodyParser.json())
//START_ASYNC -do not remove notes, place code between correct pair of notes.
// Beispiel: Asynchrone Methode, um ein Passwort zu hashen
app.post('/async-hash', async (req, res) => {
  try {
    //Passwort hashen
    const hashedPassword = await bcrypt.hash(myPlaintextPassword, saltRounds);
    console.log('Asynchronous Hashed Password:', hashedPassword);

    //Vergleich des korrekten Password
    const matchCorrect = await bcrypt.compare(myPlaintextPassword, hashedPassword);
    console.log('Does the correct password match? (Async):', matchCorrect); // true

    // Vergleich des falschen Passworts
    const matchIncorrect = await bcrypt.compare(someOtherPlaintextPassword, hashedPassword);
    console.log('Does the incorrect password match? (Async):', matchIncorrect); // false

    // Antwort an den Client senden
    res.json({
      hashedPassword,
      matchCorrect,
      matchIncorrect
    });
  } catch (err) {
    console.error('Error during async operations:', err);
    res.status(500).send('Error during async hasing or comparison');
  }
})
//END_ASYNC

//START_SYNC
app.post('/sync-hash', (req, res) => {
  try {
    // Passwort sysnchron hashen
      const hashedPassword = bcrypt.hashSync(myPlaintextPassword, saltRounds);
      console.log('Synchronous Hashed Password:', hashedPassword)

      //Vergleich des korrekten Passworts
      const matchCorrect = bcrypt.compareSync(myPlaintextPassword, hashedPassword);
      console.log('Does the incorrect password match? (Sync', matchCorrect); // true

      // Vergleich des falschen Passworts
      const matchIncorrect = bcrypt.compareSync(someOtherPlaintextPassword);
      console.log('Does the incorrect password match? (Sync):', matchIncorrect);

      // Antwort an den Client senden
      res.json({
        hashedPassword,
        matchCorrect,
        matchIncorrect
       }); 
  
      
  
  } catch (err) { 
    console.log('Error during sync operation:', err);
    res.status(500).send('Error during sync hashing or comparison');
  }
});


//END_SYNC





























const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Listening on port:", PORT)
});
