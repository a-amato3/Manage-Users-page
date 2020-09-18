import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { functions } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userCollection: AngularFirestoreCollection<User>
  users: Observable<User[]>;

  constructor(private firestore: AngularFirestore, private functions: AngularFireFunctions) {}


  getUsers() {
    this.userCollection = this.firestore.collection('users', ref => {
      return ref.orderBy('name')
    })
    this.users = this.userCollection.valueChanges({ idField: 'id' });
    return this.users
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
