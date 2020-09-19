import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Observable, Subscription } from "rxjs";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})

export class UserFormComponent implements OnInit, OnDestroy {

  user: User[];
  sub: Subscription;
  searchText: string = "";

  constructor(private service: UserService, private afs: AngularFirestore) { }

  ngOnInit() {
    this.sub = this.service
      .getUsers()
      .subscribe(
        user => (this.user = user))
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  filterCondition(user) {
    return user.name.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
  }

  deleteUser(event, user) {
    this.service.deleteUser(user);
  }
}




