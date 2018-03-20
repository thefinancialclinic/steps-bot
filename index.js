require('dotenv').config()
const Botkit = require('botkit')
var firebase = require("firebase")

var config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "bedstuy-bdf4e.firebaseapp.com",
  databaseURL: "https://bedstuy-bdf4e.firebaseio.com",
  projectId: "bedstuy-bdf4e",
  storageBucket: "bedstuy-bdf4e.appspot.com"
}
firebase.initializeApp(config)

firebase.auth()
.signInWithEmailAndPassword(process.env.FIREBASE_EMAIL, process.env.FIREBASE_PASSWORD)
.then(initBotkit)

 function initBotkit() {
   firebaseStorage = require('botkit-storage-firebase')(config, {
     email: process.env.FIREBASE_EMAIL,
     password: process.env.FIREBASE_PASSWORD
   })
   firebaseStorage.then(function (d) {
     setupBotkit(d)
   })
 }

 function setupBotkit(storageModule) {
   const controller = Botkit.twiliosmsbot({
       account_sid: process.env.TWILIO_ACCOUNT_SID,
       auth_token: process.env.TWILIO_AUTH_TOKEN,
       twilio_number: process.env.TWILIO_NUMBER,
       debug: true,
       storage: storageModule
   })

   const bot = controller.spawn({});

   controller.setupWebserver(process.env.PORT || 3000, function (err, webserver) {
     controller.createWebhookEndpoints(controller.webserver, bot, function () {
       console.log('TwilioSMSBot is online!')
     })
     controller.storage.users.save({id: 'bagel', foo:'bar'})
   })

   controller.hears(['hi', 'hello'], 'message_received', (bot, message) => {
     bot.startConversation(message, (err, convo) => {
       convo.say('Hi, I am Bob, an SMS bot! :D')
       convo.ask('What is your name?', (res, convo) => {
         convo.say(`Nice to meet you, ${res.text}!`)
         convo.next()
       })
     })
   })

   controller.hears('.*', 'message_received', (bot, message) => {
     bot.reply(message, 'huh?')
   })
 }
