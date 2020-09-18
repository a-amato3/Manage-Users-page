import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});



// exports.deleteUser = functions.firestore
export const deleteUser = functions.firestore
      .document('users/{userID}')
      .onDelete((snap, context) => {
        // Get an object representing the document prior to deletion
        // e.g. {'name': 'Marie', 'age': 66}
        const deletedValue = snap.data();

        // perform desired operations ...
  });




  /* admin.auth().deleteUser(uid)
  .then(function() {
    console.log('Successfully deleted user');
  })
  .catch(function(error) {
    console.log('Error deleting user:', error);
  }); */
