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

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore, private functions: AngularFireFunctions) { }


  getUsers() {
    /*     this.userCollection = this.firestore.collection('users', ref => {
          return ref.orderBy('role', 'asc')
        }); */

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
  }


  //  TODO FIREBASE FUNCTION
  /*
  this.functions.httpsCallable('MYFUNCTION')
  ({ text: 'Some Request Data' })
    .pipe(first())
    .subscribe(resp => {
      console.log({ resp });
    }, err => {
      console.error({ err });
    });
   */
}
