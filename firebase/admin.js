var admin = require("firebase-admin");

var serviceAccount = require("./firebase-keys.json");

try {
  admin.initializeApp(
    {
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://twity-a8129.firebaseio.com",
    },
    "twity"
  );
} catch (e) {}

export const firestore = admin.firestore();
