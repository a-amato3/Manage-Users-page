import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { User } from '../models/user';
import { Observable, pipe } from 'rxjs';
import { functions } from 'firebase';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  userCollection: AngularFirestoreCollection<User>
  users: Observable<User[]>;

  constructor(private firestore: AngularFirestore, private functions: AngularFireFunctions) { }


  getUsers() {
    this.userCollection = this.firestore.collection('users', ref => {
    return ref.orderBy('name')
    });
    this.users = this.userCollection.valueChanges({ idField: 'id' });
    return this.users

    /*     this.userCollection = this.firestore.collection('users', ref => {
          return ref.orderBy('name')
        });
        this.users = this.firestore.collection('users').snapshotChanges().map(changes => {
          return changes.map(a => {
            const data = a.payload.doc.data() as User;
            data.id = a.payload.doc.ud;
            return data;
          });
        }); */
  }



  //  TODO
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
