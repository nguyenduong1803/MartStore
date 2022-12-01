const admin = require("firebase-admin");

const serviceAccount = require("./mhduongtest2-firebase-adminsdk-figsf-6979777f1f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mhduongtest2-default-rtdb.firebaseio.com"
});
export default admin