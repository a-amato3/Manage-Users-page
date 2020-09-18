import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Observable, Subscription } from "rxjs";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})

export class UserFormComponent implements OnInit {

  users: User[];

  users$: Observable<User[]>;
  sub: Subscription;

  constructor(private service: UserService) { }



  ngOnInit() {
    this.sub = this.service
      .getUsers()
      .subscribe(users => (this.users= users));
  }



  }




