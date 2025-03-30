// backend/config/firebase.js
const admin = require("firebase-admin");
const serviceAccount = require("./firebase-service-account.json");

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Export Firestore and Auth
const db = admin.firestore();
const auth = admin.auth();

module.exports = { db, auth };