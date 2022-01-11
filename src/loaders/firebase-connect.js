import admin from "firebase-admin";
//  acessing Cloud Firestore using the admin SDK locally

import serviceAccount from "../config/firebase.config.js";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
export default db;
