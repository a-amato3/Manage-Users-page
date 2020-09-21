import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { User } from '../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { functions } from 'firebase';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userCollection: AngularFirestoreCollection<User>
  users: Observable<User[]>;
  fbDoc: AngularFirestoreDocument<User>;

  constructor(private firestore: AngularFirestore, private functions: AngularFireFunctions) { }


  getUsers() {
    return this.users = this.firestore.collection("users", ref => ref.orderBy('name', 'asc')).snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { id, ...data }
      });
    }));
  }

  async addUser(user: User) {
    this.firestore.collection('users').add({
      ...user,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

  }

  deleteUser(user: User) {
    this.fbDoc = this.firestore.doc(`users/${user.id}`);
    this.fbDoc.delete();
    this.fbDoc.delete();
    //Firebase Function Call
    /*     return this.afAuth.currentUser.then(() => {

      const test = this.functions.httpsCallable('https://us-central1-user-management-8e94b.cloudfunctions.net/httpDelete');
      test(null).subscribe((response) => {
        debugger;
      }, (error) => {
      });
    }).catch((error) => {
      console.log(error.message, 'error-snackbar');
    }); */
  }


  updateUser(user: User) {
    this.fbDoc = this.firestore.doc(`users/${user.id}`);
    this.fbDoc.update(user);
  }


  disableUser(user: User){
    this.fbDoc = this.firestore.doc(`users/${user.id}`);
    this.fbDoc.update(user);
  }
}
