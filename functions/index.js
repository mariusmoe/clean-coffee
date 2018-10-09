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

    const timeNow = admin.firestore.Timestamp.now()
    admin.firestore().collection('sendTime').doc('a4').get().then(function(sendTimeA4) {
        if (!sendTimeA4.exists) {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            admin.firestore().collection("sendTime").doc("a4").set({ 
                timestamp: admin.firestore.Timestamp.now() 
            })
            .then(function() {
                console.log("Document successfully written!");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });

            // Create one! and move on
        }
        // Check time! and decide if it is too soon
        let z = false;
       
        console.log("Document data:", sendTimeA4.data());
        if((timeNow.seconds - admin.firestore.Timestamp.fromDate(sendTimeA4.data().timestamp).seconds) < 1800 && z) {
            console.log("TOO SOON");
            return res.send({'Status: ': 'TOO SOON'});
        } else {
            admin.firestore().collection("sendTime").doc("a4").set({
                timestamp: admin.firestore.Timestamp.now() 
            })
            .then(function() {
                console.log("Document successfully written!");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
        
    





            const payload = {
                    notification: {
                    title: 'RUN!',
                    body: "The coffee is ready.",
                    icon: `https://raw.githubusercontent.com/dotkom/notifier/master/meme/${getRandomInt(1,30)}.png`
                    }
                };

                console.log(payload);
                


            admin.firestore().collection('fcmTokens').get().then(listOfTokens => {
                
                listOfTokens.docs.forEach(token => {       
                    const tokenData = token.data();
                    console.log('*********************************************')     
                    
                
                    const timeRegistered = token.createTime
                    let diff = timeNow.seconds - timeRegistered.seconds
                    console.log(diff);
                    console.log(token.createTime);
                    
                    // If it is more than two months since they approved the notification -> delete them!
                    if (diff > 15778463){
                        // Delete the user entry
                        admin.firestore().collection('fcmTokens').doc(token.id).delete().then(function() {
                            console.log("Document successfully deleted!");
                        }).catch(function(error) {
                            console.error("Error removing document: ", error);
                        });
                        return;
                    }
                    
                    
                    
                    
                    console.log('------------------------------------------------')
                    

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
                console.error(err);
            })
    }
    
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });

});
