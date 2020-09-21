import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
const cors = require('cors')({origin: true});


export const httpDelete = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    return functions.auth.user().onDelete((user: admin.auth.UserRecord) => {
      return res.status(200).send(user.uid);
    });
  });
});
