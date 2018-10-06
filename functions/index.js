const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const admin = require("firebase-admin");
admin.initializeApp();

// exports.fcmSend = functions.database.ref('/messages/{userId}/{messageId}').onCreate(event => {
exports.ready = functions.https.onRequest((req, res) => {

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

  const payload = {
        notification: {
          title: 'RUN!',
          body: "The coffee is ready.",
          icon: `https://raw.githubusercontent.com/dotkom/notifier/master/meme/${getRandomInt(1,30)}.png`
        }
      };


   admin.firestore().collection('fcmTokens').get().then(listOfTokens => {
    console.log('------------------------------------------------')
    listOfTokens.docs.forEach(token => {
        // console.log(token.data())
        // console.log(token.id)
        console.log('*********************************************')
        const tokenData = token.data();
        
        // TODO: timestamp is not evaluated and still is { '.sv': 'timestamp' }
        // use an alternative method? Too old stuff (more than two months?) should be deleted.
        console.log(tokenData.timestamp);

        // TODO: restrict how often this message can go out by creating an additional collection with one doc
        // that contain a timestamp. Check this field and restrict to only send a message once 20 min or so?
        
        
        if (tokenData && tokenData.userId  ) {
            admin.messaging().sendToDevice(tokenData.userId, payload)
        }  
    })
    return res.send({'Status: ': 'ALL GOOD'});
   }).then( () => {
    return console.log("Sent Successfully")
   })
   .catch(err => {
       console.log(err);
   })


});
