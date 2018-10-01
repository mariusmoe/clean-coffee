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


  const payload = {
        notification: {
          title: 'RUN!',
          body: "The coffee is ready.",
          icon: "https://placeimg.com/250/250/people"
        }
      };


   admin.firestore().collection('fcmTokens').get().then(listOfTokens => {
    console.log('------------------------------------------------')
    listOfTokens.docs.forEach(token => {
        console.log(token.data())
        console.log(token.id)
        console.log('*********************************************')
        const tokenData = token.data();
        if (tokenData && tokenData.userId) {
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
