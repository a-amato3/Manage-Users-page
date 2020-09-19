import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { User } from '../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { functions } from 'firebase';
import { map } from 'rxjs/operators';
import { rejects } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  userCollection: AngularFirestoreCollection<User>
  users: Observable<User[]>;
  fbDoc: AngularFirestoreDocument<User>;

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore, private functions: AngularFireFunctions) {

  }


  getUsers() {


    this.userCollection = this.firestore.collection('users', ref => {
      return ref.orderBy('name')
    });
    return this.users = this.firestore.collection("users").snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { id, ...data }
      });
    }));
  }





  async addUser(user: User) {
     this.firestore.collection('users').add(user)
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
